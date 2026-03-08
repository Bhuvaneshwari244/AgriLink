import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mandiRates, states, MandiRate } from "@/data/mandiRates";
import { translateCropName, translateStateName, translatePlaceName } from "@/data/dataTranslations";
import { Search, MapPin, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

interface MarketGroup {
  market: string;
  district: string;
  state: string;
  lat?: number;
  lng?: number;
  items: MandiRate[];
}

const PriceChange = ({ current, previous, label }: { current: number; previous?: number; label: string }) => {
  if (!previous) return null;
  const diff = current - previous;
  const percent = ((diff / previous) * 100).toFixed(1);
  const isUp = diff > 0;
  const isDown = diff < 0;
  
  return (
    <div className="flex items-center gap-1 text-[10px]">
      <span className="text-muted-foreground">{label}:</span>
      {isUp && <TrendingUp size={10} className="text-green-600" />}
      {isDown && <TrendingDown size={10} className="text-red-500" />}
      {!isUp && !isDown && <Minus size={10} className="text-muted-foreground" />}
      <span className={isUp ? "text-green-600 font-medium" : isDown ? "text-red-500 font-medium" : "text-muted-foreground"}>
        {isUp ? "+" : ""}{percent}%
      </span>
    </div>
  );
};

export default function MandiRates() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [commodityFilter, setCommodityFilter] = useState("All");
  const [nearbyResults, setNearbyResults] = useState<MandiRate[]>([]);
  const [showNearby, setShowNearby] = useState(false);
  const [expandedMarkets, setExpandedMarkets] = useState<Set<string>>(new Set());

  const commodities = ["All", ...Array.from(new Set(mandiRates.map(r => r.commodity))).sort()];

  const filtered = mandiRates.filter(r =>
    (stateFilter === "All" || r.state === stateFilter) &&
    (commodityFilter === "All" || r.commodity === commodityFilter) &&
    (search === "" || r.market.toLowerCase().includes(search.toLowerCase()) || r.district.toLowerCase().includes(search.toLowerCase()) || r.state.toLowerCase().includes(search.toLowerCase()) || r.commodity.toLowerCase().includes(search.toLowerCase()))
  );

  const findNearby = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      const withDist = mandiRates.filter(r => r.lat && r.lng).map(r => ({
        ...r,
        dist: Math.sqrt(Math.pow((r.lat! - latitude) * 111, 2) + Math.pow((r.lng! - longitude) * 111 * Math.cos(latitude * Math.PI / 180), 2))
      })).sort((a, b) => a.dist - b.dist);
      setNearbyResults(withDist.slice(0, 40));
      setShowNearby(true);
    }, () => alert("Location access denied. Please enable location."));
  };

  const displayData = showNearby ? nearbyResults : filtered;

  const grouped = useMemo(() => {
    const map = new Map<string, MarketGroup>();
    displayData.forEach(r => {
      const key = `${r.market}-${r.district}-${r.state}`;
      if (!map.has(key)) {
        map.set(key, { market: r.market, district: r.district, state: r.state, lat: r.lat, lng: r.lng, items: [] });
      }
      map.get(key)!.items.push(r);
    });
    return Array.from(map.values());
  }, [displayData]);

  const toggleMarket = (key: string) => {
    setExpandedMarkets(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.mandi.title}</h1>
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={e => { setSearch(e.target.value); setShowNearby(false); }} placeholder={t.mandi.search}
              className="w-full bg-secondary text-foreground pl-10 pr-4 py-3 rounded-2xl border border-border/50 outline-none focus:ring-2 focus:ring-primary transition-all" />
          </div>
          <motion.button whileTap={{ scale: 0.97 }} onClick={findNearby} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-3 rounded-2xl font-semibold transition-colors">
            <MapPin size={18}/>{t.mandi.nearby}
          </motion.button>
        </div>
        <div className="flex gap-3 mb-4 flex-wrap">
          <select value={stateFilter} onChange={e => { setStateFilter(e.target.value); setShowNearby(false); }}
            className="bg-secondary text-secondary-foreground text-sm rounded-xl px-3 py-2.5 border border-border/50">
            <option value="All">{t.mandi.state}: {t.mandi.all}</option>
            {states.map(s => <option key={s} value={s}>{translateStateName(s, lang)}</option>)}
          </select>
          <select value={commodityFilter} onChange={e => { setCommodityFilter(e.target.value); setShowNearby(false); }}
            className="bg-secondary text-secondary-foreground text-sm rounded-xl px-3 py-2.5 border border-border/50">
            {commodities.map(c => <option key={c} value={c}>{c === "All" ? `${t.mandi.commodity}: ${t.mandi.all}` : translateCropName(c, lang)}</option>)}
          </select>
        </div>
        {showNearby && <p className="text-sm text-primary mb-3 font-medium">📍 {t.mandi.showingNearby} ({grouped.length})</p>}
        <p className="text-sm text-muted-foreground mb-4">{grouped.length} {t.mandi.markets} • {displayData.length} {t.mandi.rates}</p>
        <div className="space-y-3">
          {grouped.map((group, i) => {
            const key = `${group.market}-${group.district}-${group.state}`;
            const isExpanded = expandedMarkets.has(key);
            const hasMultiple = group.items.length > 1;
            const previewItems = isExpanded ? group.items : group.items.slice(0, 1);

            return (
              <motion.div key={key} className="glass-card overflow-hidden"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.03, 0.3) }}>
                <div
                  className={`flex justify-between items-center p-5 pb-3 ${hasMultiple ? "cursor-pointer" : ""}`}
                  onClick={() => hasMultiple && toggleMarket(key)}
                >
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg">🏪 {translatePlaceName(group.market, lang)}</h3>
                    <p className="text-sm text-muted-foreground">{translatePlaceName(group.district, lang)}, {translateStateName(group.state, lang)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-accent/15 text-accent text-xs px-2.5 py-1 rounded-xl font-medium">
                      {group.items.length} {group.items.length === 1 ? t.mandi.crop : t.mandi.crops}
                    </span>
                    {hasMultiple && (
                      isExpanded ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />
                    )}
                  </div>
                </div>

                <div className="px-5 pb-4 space-y-3">
                  <AnimatePresence initial={false}>
                    {previewItems.map(r => (
                      <motion.div key={r.id}
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="bg-secondary/40 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-foreground text-sm">🌾 {translateCropName(r.commodity, lang)}</span>
                          <span className="text-xs text-muted-foreground">{r.variety} • Per {r.unit}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-background/50 rounded-lg p-2 text-center">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.mandi.minPrice}</p>
                            <p className="text-sm font-bold text-foreground mt-0.5">₹{r.minPrice.toLocaleString()}</p>
                          </div>
                          <div className="bg-primary/10 rounded-lg p-2 text-center border border-primary/20">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.mandi.modalPrice}</p>
                            <p className="text-sm font-bold text-primary mt-0.5">₹{r.modalPrice.toLocaleString()}</p>
                          </div>
                          <div className="bg-background/50 rounded-lg p-2 text-center">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.mandi.maxPrice}</p>
                            <p className="text-sm font-bold text-foreground mt-0.5">₹{r.maxPrice.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        {/* Price History Section */}
                        <div className="bg-background/30 rounded-lg p-2.5 border border-border/30">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-3">
                              {r.yesterdayPrice && (
                                <div className="text-[10px]">
                                  <span className="text-muted-foreground">{t.mandi.yesterday || "Yesterday"}:</span>
                                  <span className="font-medium text-foreground ml-1">₹{r.yesterdayPrice.toLocaleString()}</span>
                                </div>
                              )}
                              {r.previousPrice && (
                                <div className="text-[10px]">
                                  <span className="text-muted-foreground">{t.mandi.before || "Before"}:</span>
                                  <span className="font-medium text-foreground ml-1">₹{r.previousPrice.toLocaleString()}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <PriceChange current={r.modalPrice} previous={r.yesterdayPrice} label={t.mandi.vsYesterday || "vs Yesterday"} />
                              <PriceChange current={r.modalPrice} previous={r.previousPrice} label={t.mandi.vsBefore || "vs Before"} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {hasMultiple && !isExpanded && (
                    <button onClick={() => toggleMarket(key)} className="w-full text-center text-xs text-primary font-medium py-1 hover:underline">
                      + {group.items.length - 1} {t.mandi.tapExpand}
                    </button>
                  )}
                </div>
                <div className="px-5 pb-3">
                  <p className="text-[10px] text-muted-foreground">{group.items[0].date}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}