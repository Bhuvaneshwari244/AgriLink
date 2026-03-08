import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { soilRecommendations, locationRecommendations, seasonRecommendations, soilTypes } from "@/data/recommendations";
import { Layers, MapPin, Sun } from "lucide-react";

export default function Recommendations() {
  const { t } = useLanguage();
  const [tab, setTab] = useState<"soil" | "location" | "season">("soil");
  const [selectedSoil, setSelectedSoil] = useState(soilTypes[0]);
  const [selectedRegion, setSelectedRegion] = useState(locationRecommendations[0].region);

  const currentMonth = new Date().getMonth();
  const currentSeason = currentMonth >= 5 && currentMonth <= 9 ? "Kharif" : currentMonth >= 10 || currentMonth <= 2 ? "Rabi" : "Zaid";

  const soilData = soilRecommendations.find(s => s.soilType === selectedSoil);
  const locationData = locationRecommendations.find(l => l.region === selectedRegion);
  const seasonData = seasonRecommendations.find(s => s.season === currentSeason);

  const tabs = [
    { id: "soil" as const, label: t.recommendations.soilBased, icon: Layers },
    { id: "location" as const, label: t.recommendations.locationBased, icon: MapPin },
    { id: "season" as const, label: t.recommendations.seasonBased, icon: Sun },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.recommendations.title}</h1>
      <div className="flex gap-2 mb-6">
        {tabs.map(tb => (
          <button key={tb.id} onClick={() => setTab(tb.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${tab === tb.id ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
            <tb.icon size={16}/>{tb.label}
          </button>
        ))}
      </div>

      {tab === "soil" && (
        <div>
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
            {soilTypes.map(s => (
              <button key={s} onClick={() => setSelectedSoil(s)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm ${selectedSoil === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{s}</button>
            ))}
          </div>
          {soilData && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">{soilData.description}</p>
              <div className="space-y-4">
                {soilData.recommendations.map(r => (
                  <div key={r.id} className="glass-card p-4">
                    <h3 className="font-bold text-foreground text-lg mb-1">🌱 {r.crop}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{r.reason}</p>
                    <div className="bg-secondary/50 rounded-lg p-3 mb-2">
                      <h4 className="text-xs font-semibold text-primary mb-1">{t.recommendations.expertTips}</h4>
                      <ul className="text-xs text-foreground space-y-1">{r.tips.map(tip => <li key={tip}>• {tip}</li>)}</ul>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Source: {r.expertSource}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "location" && (
        <div>
          <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
            {locationRecommendations.map(l => (
              <button key={l.region} onClick={() => setSelectedRegion(l.region)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm ${selectedRegion === l.region ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{l.region}</button>
            ))}
          </div>
          {locationData && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Climate: {locationData.climate}</p>
              <p className="text-xs text-muted-foreground mb-4">States: {locationData.states.join(", ")}</p>
              <div className="space-y-4">
                {locationData.recommendations.map(r => (
                  <div key={r.id} className="glass-card p-4">
                    <h3 className="font-bold text-foreground text-lg mb-1">🌱 {r.crop}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{r.reason}</p>
                    <div className="bg-secondary/50 rounded-lg p-3 mb-2">
                      <h4 className="text-xs font-semibold text-primary mb-1">{t.recommendations.expertTips}</h4>
                      <ul className="text-xs text-foreground space-y-1">{r.tips.map(tip => <li key={tip}>• {tip}</li>)}</ul>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Source: {r.expertSource}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "season" && (
        <div>
          <div className="flex gap-2 mb-4">
            {seasonRecommendations.map(s => (
              <button key={s.season} onClick={() => {}}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${s.season === currentSeason ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {s.season} ({s.months})
              </button>
            ))}
          </div>
          {seasonData && (
            <div className="space-y-4">
              <p className="text-sm text-primary font-semibold">📅 {t.recommendations.currentSeason}: {seasonData.season} — {seasonData.months}</p>
              {seasonData.recommendations.map(r => (
                <div key={r.id} className="glass-card p-4">
                  <h3 className="font-bold text-foreground text-lg mb-1">🌱 {r.crop}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{r.reason}</p>
                  <div className="bg-secondary/50 rounded-lg p-3 mb-2">
                    <h4 className="text-xs font-semibold text-primary mb-1">{t.recommendations.expertTips}</h4>
                    <ul className="text-xs text-foreground space-y-1">{r.tips.map(tip => <li key={tip}>• {tip}</li>)}</ul>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Source: {r.expertSource}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
