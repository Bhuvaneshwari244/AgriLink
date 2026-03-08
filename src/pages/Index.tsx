import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Users, BarChart3, Truck, Stethoscope, Star } from "lucide-react";

const features = [
  { path: "/crops", icon: BookOpen, color: "from-red-600 to-red-800", title: "crops" as const },
  { path: "/community", icon: Users, color: "from-blue-600 to-blue-800", title: "community" as const },
  { path: "/mandi", icon: BarChart3, color: "from-green-600 to-green-800", title: "mandi" as const },
  { path: "/transport", icon: Truck, color: "from-yellow-600 to-yellow-800", title: "transport" as const },
  { path: "/diagnosis", icon: Stethoscope, color: "from-purple-600 to-purple-800", title: "diagnosis" as const },
  { path: "/recommendations", icon: Star, color: "from-orange-600 to-orange-800", title: "recommendations" as const },
];

export default function Index() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-4">{t.hero.title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">{t.hero.subtitle}</p>
        <Link to="/crops" className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-xl transition-all glow-red">
          {t.hero.cta} →
        </Link>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {features.map(f => (
          <Link key={f.path} to={f.path} className={`glass-card p-6 text-center hover:scale-105 transition-transform group`}>
            <div className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center`}>
              <f.icon size={28} className="text-white" />
            </div>
            <h3 className="font-semibold text-foreground">{t.nav[f.title]}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
