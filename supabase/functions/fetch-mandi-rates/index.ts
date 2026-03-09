const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface MandiRateResponse {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  date: string;
}

// Parse HTML table rows from agmarknet commodity price page
function parseAgmarknetHtml(html: string): MandiRateResponse[] {
  const results: MandiRateResponse[] = [];
  
  // Match table rows - agmarknet uses standard HTML tables
  const rowRegex = /<tr[^>]*class="[^"]*(?:odd|even)[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi;
  const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
  
  let rowMatch;
  while ((rowMatch = rowRegex.exec(html)) !== null) {
    const cells: string[] = [];
    let cellMatch;
    const cellContent = rowMatch[1];
    const cellRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    while ((cellMatch = cellRe.exec(cellContent)) !== null) {
      // Strip HTML tags and trim
      cells.push(cellMatch[1].replace(/<[^>]*>/g, '').trim());
    }
    
    // Expected columns: SlNo, State, District, Market, Commodity, Variety, Grade, MinPrice, MaxPrice, ModalPrice, Date
    if (cells.length >= 10) {
      const minPrice = parseInt(cells[7]) || 0;
      const maxPrice = parseInt(cells[8]) || 0;
      const modalPrice = parseInt(cells[9]) || 0;
      
      if (modalPrice > 0) {
        results.push({
          state: cells[1],
          district: cells[2],
          market: cells[3],
          commodity: cells[4],
          variety: cells[5],
          minPrice,
          maxPrice,
          modalPrice,
          unit: "Quintal",
          date: cells[10] || new Date().toISOString().split('T')[0],
        });
      }
    }
  }
  
  return results;
}

// Parse eNAM trade data response
function parseEnamData(data: any): MandiRateResponse[] {
  const results: MandiRateResponse[] = [];
  
  if (!data || !Array.isArray(data)) return results;
  
  for (const item of data) {
    const modalPrice = parseFloat(item.modal_price || item.modalPrice || item.Modal_Price || 0);
    if (modalPrice <= 0) continue;
    
    results.push({
      state: item.state || item.State || item.state_name || '',
      district: item.district || item.District || item.district_name || '',
      market: item.market || item.Market || item.market_name || item.apmc || '',
      commodity: item.commodity || item.Commodity || item.commodity_name || '',
      variety: item.variety || item.Variety || item.variety_name || 'Local',
      minPrice: parseFloat(item.min_price || item.minPrice || item.Min_Price || 0),
      maxPrice: parseFloat(item.max_price || item.maxPrice || item.Max_Price || 0),
      modalPrice,
      unit: item.unit || "Quintal",
      date: item.arrival_date || item.date || new Date().toISOString().split('T')[0],
    });
  }
  
  return results;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { state, commodity, market } = body as { state?: string; commodity?: string; market?: string };
    
    let results: MandiRateResponse[] = [];
    let source = 'none';
    
    // Attempt 1: Try eNAM public trade data API
    try {
      console.log('Attempting eNAM API...');
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      const enamUrl = `https://enam.gov.in/web/Ajax/trade_data_list`;
      const formData = new URLSearchParams();
      formData.append('language', 'en');
      formData.append('stateName', state || '');
      formData.append('apmcName', '');
      formData.append('commodityName', commodity || '');
      formData.append('fromDate', yesterday);
      formData.append('toDate', today);
      
      const enamResponse = await fetch(enamUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json, text/html, */*',
          'Referer': 'https://enam.gov.in/web/dashboard/trade-data',
        },
        body: formData.toString(),
      });
      
      if (enamResponse.ok) {
        const contentType = enamResponse.headers.get('content-type') || '';
        const responseText = await enamResponse.text();
        
        if (contentType.includes('json') || responseText.startsWith('[') || responseText.startsWith('{')) {
          const jsonData = JSON.parse(responseText);
          const parsed = parseEnamData(Array.isArray(jsonData) ? jsonData : jsonData.data || jsonData.records || []);
          if (parsed.length > 0) {
            results = parsed;
            source = 'enam';
            console.log(`eNAM returned ${results.length} records`);
          }
        }
      }
    } catch (e) {
      console.log('eNAM attempt failed:', e instanceof Error ? e.message : e);
    }
    
    // Attempt 2: Try Agmarknet daily price bulletin 
    if (results.length === 0) {
      try {
        console.log('Attempting Agmarknet...');
        const agmarkUrl = 'https://agmarknet.gov.in/SearchCmmMkt.aspx';
        
        // First get the page to extract ViewState
        const pageResponse = await fetch(agmarkUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
        });
        
        if (pageResponse.ok) {
          const pageHtml = await pageResponse.text();
          
          // Extract ViewState and EventValidation
          const viewStateMatch = pageHtml.match(/id="__VIEWSTATE"[^>]*value="([^"]*)"/);
          const eventValidationMatch = pageHtml.match(/id="__EVENTVALIDATION"[^>]*value="([^"]*)"/);
          const viewStateGenMatch = pageHtml.match(/id="__VIEWSTATEGENERATOR"[^>]*value="([^"]*)"/);
          
          if (viewStateMatch) {
            const formParams = new URLSearchParams();
            formParams.append('__VIEWSTATE', viewStateMatch[1]);
            if (eventValidationMatch) formParams.append('__EVENTVALIDATION', eventValidationMatch[1]);
            if (viewStateGenMatch) formParams.append('__VIEWSTATEGENERATOR', viewStateGenMatch[1]);
            formParams.append('ctl00$ddlLanguage', 'en');
            formParams.append('ctl00$cphBody$Loaddta', '');
            formParams.append('ctl00$cphBody$ddlCommodity', commodity || '');
            formParams.append('ctl00$cphBody$ddlState', state || '');
            formParams.append('ctl00$cphBody$btnGo', 'Submit');
            
            const dataResponse = await fetch(agmarkUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': agmarkUrl,
              },
              body: formParams.toString(),
            });
            
            if (dataResponse.ok) {
              const dataHtml = await dataResponse.text();
              const parsed = parseAgmarknetHtml(dataHtml);
              if (parsed.length > 0) {
                results = parsed;
                source = 'agmarknet';
                console.log(`Agmarknet returned ${results.length} records`);
              }
            }
          }
        }
      } catch (e) {
        console.log('Agmarknet attempt failed:', e instanceof Error ? e.message : e);
      }
    }

    // Attempt 3: Try vegetablemarketprice.com (backup)
    if (results.length === 0) {
      try {
        console.log('Attempting vegetablemarketprice.com...');
        const vmpUrl = 'https://vegetablemarketprice.com/mandi/all/today';
        const vmpResponse = await fetch(vmpUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml',
          },
        });
        
        if (vmpResponse.ok) {
          const html = await vmpResponse.text();
          // Parse the simple table structure
          const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
          let rm;
          while ((rm = rowRe.exec(html)) !== null) {
            const cells: string[] = [];
            const cr = /<td[^>]*>([\s\S]*?)<\/td>/gi;
            let cm;
            while ((cm = cr.exec(rm[1])) !== null) {
              cells.push(cm[1].replace(/<[^>]*>/g, '').trim());
            }
            if (cells.length >= 5) {
              const price = parseFloat(cells[3]?.replace(/[^\d.]/g, '')) || 0;
              if (price > 0 && cells[0] && cells[1]) {
                results.push({
                  state: cells[2] || 'India',
                  district: cells[1],
                  market: cells[1],
                  commodity: cells[0],
                  variety: 'Local',
                  minPrice: price * 0.85,
                  maxPrice: price * 1.15,
                  modalPrice: price,
                  unit: 'Quintal',
                  date: new Date().toISOString().split('T')[0],
                });
              }
            }
          }
          if (results.length > 0) {
            source = 'vegetablemarketprice';
            console.log(`VMP returned ${results.length} records`);
          }
        }
      } catch (e) {
        console.log('VMP attempt failed:', e instanceof Error ? e.message : e);
      }
    }

    // Apply filters
    if (results.length > 0) {
      if (state) results = results.filter(r => r.state.toLowerCase().includes(state.toLowerCase()));
      if (commodity) results = results.filter(r => r.commodity.toLowerCase().includes(commodity.toLowerCase()));
      if (market) results = results.filter(r => r.market.toLowerCase().includes(market.toLowerCase()));
    }

    console.log(`Returning ${results.length} results from source: ${source}`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: results, 
        source,
        count: results.length,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching mandi rates:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch mandi rates',
        data: [],
        source: 'error',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
