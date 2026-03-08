import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { soilRecommendations, locationRecommendations, seasonRecommendations, soilTypes } from "@/data/recommendations";
import { translateCropName, translateStateName } from "@/data/dataTranslations";
import {
  translateSoilType, translateSoilDescription, translateRegionName,
  translateRegionClimate, translateSeasonName, translateSeasonMonths,
  translateReason, translateTips,
} from "@/data/recommendationsTranslations";
import { Layers, MapPin, Sun } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function Recommendations() {
  const { t, lang } = useLanguage();
  const [tab, setTab] = useState<"soil" | "location" | "season">("soil");
  const [selectedSoil, setSelectedSoil] = useState(soilTypes[0]);
  const [selectedRegion, setSelectedRegion] = useState(locationRecommendations[0].region);

  const currentMonth = new Date().getMonth();
  const defaultSeason = currentMonth >= 5 && currentMonth <= 9 ? "Kharif" : currentMonth >= 10 || currentMonth <= 2 ? "Rabi" : "Zaid";
  const [selectedSeason, setSelectedSeason] = useState(defaultSeason);

  const soilData = soilRecommendations.find(s => s.soilType === selectedSoil);
  const locationData = locationRecommendations.find(l => l.region === selectedRegion);
  const seasonData = seasonRecommendations.find(s => s.season === selectedSeason);

  const tabs = [
    { id: "soil" as const, label: t.recommendations.soilBased, icon: Layers },
    { id: "location" as const, label: t.recommendations.locationBased, icon: MapPin },
    { id: "season" as const, label: t.recommendations.seasonBased, icon: Sun },
  ];

  // Build a composite key for translation lookup to avoid ID conflicts
  const getReasonKey = (section: string, id: string) => {
    // For IDs that conflict (s1-s4), use section prefix
    if (section === "soil" && id.startsWith("s")) return `soil-${id}`;
    if (section === "location" && id.startsWith("s")) return `loc-${id}`;
    return id;
  };

  const RecCard = ({ r, i, section }: { r: any; i: number; section: string }) => {
    const tKey = getReasonKey(section, r.id);
    const translatedReason = translateReason(tKey, lang, r.reason);
    const translatedTips = translateTips(tKey, lang, r.tips);

    return (
      <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5">
        <h3 className="font-display font-bold text-foreground text-lg mb-1">🌱 {translateCropName(r.crop, lang)}</h3>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{translatedReason}</p>
        <div className="bg-secondary/50 rounded-xl p-3 mb-2">
          <h4 className="text-xs font-semibold text-primary mb-1">{t.recommendations.expertTips}</h4>
          <ul className="text-xs text-foreground space-y-1">{translatedTips.map((tip: string) => <li key={tip}>• {tip}</li>)}</ul>
        </div>
        <p className="text-[10px] text-muted-foreground">{t.recommendations.source}: {r.expertSource}</p>
      </motion.div>
    );
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.recommendations.title}</h1>
        <div className="flex gap-2 mb-6">
          {tabs.map(tb => (
            <button key={tb.id} onClick={() => setTab(tb.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === tb.id ? "text-primary-foreground" : "text-secondary-foreground hover:bg-muted"}`}>
              <span className="relative z-10 flex items-center gap-2"><tb.icon size={16}/>{tb.label}</span>
              {tab === tb.id && <motion.div layoutId="rec-tab" className="absolute inset-0 bg-primary rounded-xl" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            </button>
          ))}
        </div>

        {tab === "soil" && (
          <motion.div key="soil" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
              {soilTypes.map(s => (
                <button key={s} onClick={() => setSelectedSoil(s)}
                  className={`relative whitespace-nowrap px-3 py-1.5 rounded-xl text-sm transition-all ${selectedSoil === s ? "text-primary-foreground font-medium" : "text-secondary-foreground hover:bg-muted"}`}>
                  <span className="relative z-10">{translateSoilType(s, lang)}</span>
                  {selectedSoil === s && <motion.div layoutId="soil-pill" className="absolute inset-0 bg-primary rounded-xl" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                </button>
              ))}
            </div>
            {soilData && (
              <div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {translateSoilDescription(soilData.soilType, lang) || soilData.description}
                </p>
                <div className="space-y-4">{soilData.recommendations.map((r, i) => <RecCard key={r.id} r={r} i={i} section="soil" />)}</div>
              </div>
            )}
          </motion.div>
        )}

        {tab === "location" && (
          <motion.div key="location" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
              {locationRecommendations.map(l => (
                <button key={l.region} onClick={() => setSelectedRegion(l.region)}
                  className={`relative whitespace-nowrap px-3 py-1.5 rounded-xl text-sm transition-all ${selectedRegion === l.region ? "text-primary-foreground font-medium" : "text-secondary-foreground hover:bg-muted"}`}>
                  <span className="relative z-10">{translateRegionName(l.region, lang)}</span>
                  {selectedRegion === l.region && <motion.div layoutId="loc-pill" className="absolute inset-0 bg-primary rounded-xl" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                </button>
              ))}
            </div>
            {locationData && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">{t.recommendations.climate}: {translateRegionClimate(locationData.climate, lang)}</p>
                <p className="text-xs text-muted-foreground mb-4">{t.recommendations.states}: {locationData.states.map(s => translateStateName(s, lang)).join(", ")}</p>
                <div className="space-y-4">{locationData.recommendations.map((r, i) => <RecCard key={r.id} r={r} i={i} section="location" />)}</div>
              </div>
            )}
          </motion.div>
        )}

        {tab === "season" && (
          <motion.div key="season" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex gap-2 mb-4">
              {seasonRecommendations.map(s => (
                <button key={s.season} onClick={() => setSelectedSeason(s.season)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all ${s.season === selectedSeason ? "text-primary-foreground" : "text-secondary-foreground hover:bg-muted"}`}>
                  <span className="relative z-10">{translateSeasonName(s.season, lang)} ({translateSeasonMonths(s.months, lang)})</span>
                  {s.season === selectedSeason && <motion.div layoutId="season-pill" className="absolute inset-0 bg-primary rounded-xl" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                </button>
              ))}
            </div>
            {seasonData && (
              <div className="space-y-4">
                <p className="text-sm text-primary font-semibold">📅 {t.recommendations.currentSeason}: {translateSeasonName(seasonData.season, lang)} — {translateSeasonMonths(seasonData.months, lang)}</p>
                {seasonData.recommendations.map((r, i) => <RecCard key={r.id} r={r} i={i} section="season" />)}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
