import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { mandiRates, states } from "@/data/mandiRates";
import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

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
            <option value="All">{t.mandi.state}: All</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={commodityFilter} onChange={e => { setCommodityFilter(e.target.value); setShowNearby(false); }}
            className="bg-secondary text-secondary-foreground text-sm rounded-xl px-3 py-2.5 border border-border/50">
            {commodities.map(c => <option key={c} value={c}>{c === "All" ? `${t.mandi.commodity}: All` : c}</option>)}
          </select>
        </div>
        {showNearby && <p className="text-sm text-primary mb-3 font-medium">📍 Showing {nearbyResults.length} nearest markets based on your location</p>}
        <p className="text-sm text-muted-foreground mb-4">{displayData.length} results</p>
        <div className="space-y-3">
          {displayData.map((r, i) => (
            <motion.div key={r.id} className="glass-card p-5"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.03, 0.3) }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{r.market}</h3>
                  <p className="text-sm text-muted-foreground">{r.district}, {r.state}</p>
                </div>
                <span className="bg-primary/15 text-primary text-xs px-2.5 py-1 rounded-xl font-medium">{r.commodity} — {r.variety}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.mandi.minPrice}</p>
                  <p className="text-base font-bold text-foreground mt-1">₹{r.minPrice.toLocaleString()}</p>
                </div>
                <div className="bg-primary/10 rounded-xl p-3 text-center border border-primary/20">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.mandi.modalPrice}</p>
                  <p className="text-base font-bold text-primary mt-1">₹{r.modalPrice.toLocaleString()}</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.mandi.maxPrice}</p>
                  <p className="text-base font-bold text-foreground mt-1">₹{r.maxPrice.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Per {r.unit} • {r.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
