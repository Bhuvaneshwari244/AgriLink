import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mandiRates, states } from "@/data/mandiRates";
import { Search, MapPin, Filter } from "lucide-react";

export default function MandiRates() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [commodityFilter, setCommodityFilter] = useState("All");
  const [nearbyResults, setNearbyResults] = useState<typeof mandiRates>([]);
  const [showNearby, setShowNearby] = useState(false);

  const commodities = ["All", ...Array.from(new Set(mandiRates.map(r => r.commodity)))];

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
      setNearbyResults(withDist.slice(0, 20));
      setShowNearby(true);
    }, () => alert("Location access denied. Please enable location."));
  };

  const displayData = showNearby ? nearbyResults : filtered;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.mandi.title}</h1>
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={e => { setSearch(e.target.value); setShowNearby(false); }} placeholder={t.mandi.search}
            className="w-full bg-secondary text-foreground pl-10 pr-4 py-2.5 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <button onClick={findNearby} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-xl font-semibold transition-colors">
          <MapPin size={18}/>{t.mandi.nearby}
        </button>
      </div>
      <div className="flex gap-3 mb-4 flex-wrap">
        <select value={stateFilter} onChange={e => { setStateFilter(e.target.value); setShowNearby(false); }}
          className="bg-secondary text-secondary-foreground text-sm rounded-lg px-3 py-2 border border-border">
          <option value="All">{t.mandi.state}: All</option>
          {states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={commodityFilter} onChange={e => { setCommodityFilter(e.target.value); setShowNearby(false); }}
          className="bg-secondary text-secondary-foreground text-sm rounded-lg px-3 py-2 border border-border">
          {commodities.map(c => <option key={c} value={c}>{c === "All" ? `${t.mandi.commodity}: All` : c}</option>)}
        </select>
      </div>
      {showNearby && <p className="text-sm text-primary mb-3">📍 Showing {nearbyResults.length} nearest markets based on your location</p>}
      <p className="text-sm text-muted-foreground mb-4">{displayData.length} results</p>
      <div className="space-y-3">
        {displayData.map(r => (
          <div key={r.id} className="glass-card p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{r.market}</h3>
                <p className="text-sm text-muted-foreground">{r.district}, {r.state}</p>
              </div>
              <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">{r.commodity} — {r.variety}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-muted-foreground">{t.mandi.minPrice}</p>
                <p className="text-sm font-bold text-foreground">₹{r.minPrice.toLocaleString()}</p>
              </div>
              <div className="bg-primary/10 rounded-lg p-2 text-center">
                <p className="text-[10px] text-muted-foreground">{t.mandi.modalPrice}</p>
                <p className="text-sm font-bold text-primary">₹{r.modalPrice.toLocaleString()}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-2 text-center">
                <p className="text-[10px] text-muted-foreground">{t.mandi.maxPrice}</p>
                <p className="text-sm font-bold text-foreground">₹{r.maxPrice.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Per {r.unit} • {r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
