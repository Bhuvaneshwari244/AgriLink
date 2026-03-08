import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Users, BarChart3, Truck, Stethoscope, Star, ChevronRight, Sparkles } from "lucide-react";

const features = [
  { path: "/crops", icon: BookOpen, color: "from-red-600 to-red-800", title: "crops" as const, desc: "Seasonality, soil, irrigation, pests, fertilizer schedules" },
  { path: "/community", icon: Users, color: "from-blue-600 to-blue-800", title: "community" as const, desc: "Q&A, local language support, expert answers" },
  { path: "/mandi", icon: BarChart3, color: "from-green-600 to-green-800", title: "mandi" as const, desc: "Live rates by district/market + nearby search" },
  { path: "/transport", icon: Truck, color: "from-yellow-600 to-yellow-800", title: "transport" as const, desc: "Connect to logistics, request pickup flow" },
  { path: "/diagnosis", icon: Stethoscope, color: "from-purple-600 to-purple-800", title: "diagnosis" as const, desc: "AI-powered disease detection from photos" },
  { path: "/recommendations", icon: Star, color: "from-orange-600 to-orange-800", title: "recommendations" as const, desc: "Soil, location & season based crop advice" },
];

export default function Index() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hero */}
      <section className="text-center py-10 md:py-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles size={14} /> AI-Powered Farming Intelligence
        </div>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-gradient mb-3 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/crops" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-all glow-red">
            {t.hero.cta} <ChevronRight size={18} />
          </Link>
          <Link to="/diagnosis" className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-muted text-foreground font-semibold px-8 py-3 rounded-xl transition-colors border border-border">
            <Stethoscope size={18} /> AI Diagnosis
          </Link>
        </div>
      </section>

      {/* Problem Statement Features */}
      <section className="max-w-4xl mx-auto mb-10">
        <div className="glass-card p-6 border-l-4 border-l-primary">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">
            Web Track: Farmer Crop Intelligence + Community Platform
          </h2>
          <ul className="space-y-3">
            {[
              "Crop library: seasonality, soil, irrigation, pests, fertilizer schedules.",
              "Community: Q&A, local language support, expert answers.",
              "Live mandi rates by district/market + price trends.",
              "Transportation: connect to logistics providers or request pickup flow.",
              "AI Disease Detection: upload photo, get instant diagnosis & treatment.",
              "Recommendations: soil, location & season based expert crop advice.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-secondary-foreground">
                <span className="text-primary mt-1">▸</span>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Feature Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {features.map(f => (
          <Link key={f.path} to={f.path} className="glass-card p-5 hover:scale-[1.03] transition-all group">
            <div className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center group-hover:shadow-lg transition-shadow`}>
              <f.icon size={24} className="text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{t.nav[f.title]}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
