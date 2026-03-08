import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Users, BarChart3, Truck, Stethoscope, Star, ChevronRight, Sparkles, TrendingUp, Leaf, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";
import { AnimatedLabel } from "@/components/AnimatedLabel";

export default function Index() {
  const { t } = useLanguage();

  const features = [
    { path: "/crops", icon: BookOpen, color: "from-red-600 to-orange-600", title: "crops" as const, desc: t.features.cropsDesc },
    { path: "/community", icon: Users, color: "from-blue-600 to-cyan-600", title: "community" as const, desc: t.features.communityDesc },
    { path: "/mandi", icon: BarChart3, color: "from-emerald-600 to-green-600", title: "mandi" as const, desc: t.features.mandiDesc },
    { path: "/transport", icon: Truck, color: "from-amber-600 to-yellow-600", title: "transport" as const, desc: t.features.transportDesc },
    { path: "/diagnosis", icon: Stethoscope, color: "from-violet-600 to-purple-600", title: "diagnosis" as const, desc: t.features.diagnosisDesc },
    { path: "/recommendations", icon: Star, color: "from-orange-600 to-red-600", title: "recommendations" as const, desc: t.features.recommendationsDesc },
  ];

  const stats = [
    { label: t.stats.cropsListed, value: "100+", icon: Leaf, color: "text-emerald-400" },
    { label: t.stats.languages, value: "30+", icon: Globe, color: "text-blue-400" },
    { label: t.stats.mandiMarkets, value: "500+", icon: TrendingUp, color: "text-amber-400" },
    { label: t.stats.aiPowered, value: t.stats.realtime, icon: Zap, color: "text-violet-400" },
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-6">
        {/* Hero */}
        <section className="text-center py-10 md:py-20 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-medium mb-6 border border-primary/20"
          >
            <Sparkles size={14} className="animate-pulse" /> {t.hero.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-gradient mb-4 leading-tight tracking-tight"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/crops" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3.5 rounded-2xl transition-all glow-red group">
              {t.hero.cta} <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/diagnosis" className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-muted text-foreground font-semibold px-8 py-3.5 rounded-2xl transition-colors border border-border/50 group">
              <Stethoscope size={18} /> {t.hero.aiDiagnosis}
            </Link>
          </motion.div>
        </section>

        {/* Stats Dashboard */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {stats.map((s, i) => (
            <StaggerItem key={s.label}>
              <div className="stat-card group hover:border-primary/30 transition-all duration-300">
                <s.icon size={22} className={`${s.color} mb-3 group-hover:scale-110 transition-transform`} />
                <AnimatedLabel as="p" variant="bounce" delay={i * 0.05} className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {s.value}
                </AnimatedLabel>
                <AnimatedLabel as="p" variant="fade" delay={i * 0.05 + 0.1} className="text-xs text-muted-foreground mt-1">
                  {s.label}
                </AnimatedLabel>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Problem Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass-card p-6 md:p-8 border-l-4 border-l-primary">
            <h2 className="text-xl font-display font-bold text-foreground mb-5">
              {t.hero.problemTitle}
            </h2>
            <ul className="space-y-3">
              {t.problemItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-secondary-foreground"
                >
                  <span className="text-primary mt-0.5 text-lg">▸</span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Feature Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {features.map(f => (
            <StaggerItem key={f.path}>
              <Link to={f.path} className="glass-card-hover p-5 md:p-6 block group">
                <div className={`w-12 h-12 md:w-14 md:h-14 mb-4 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}>
                  <f.icon size={24} className="text-white" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1.5">{t.nav[f.title]}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
