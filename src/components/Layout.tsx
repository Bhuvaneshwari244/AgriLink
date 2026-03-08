import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { languages } from "@/data/translations";
import { Home, BookOpen, Users, BarChart3, Truck, Stethoscope, Star, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const navItems = [
  { path: "/", icon: Home, key: "home" as const },
  { path: "/crops", icon: BookOpen, key: "crops" as const },
  { path: "/community", icon: Users, key: "community" as const },
  { path: "/mandi", icon: BarChart3, key: "mandi" as const },
  { path: "/transport", icon: Truck, key: "transport" as const },
  { path: "/diagnosis", icon: Stethoscope, key: "diagnosis" as const },
  { path: "/recommendations", icon: Star, key: "recommendations" as const },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-display font-bold text-gradient">🌾 AgriLink</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link key={item.path} to={item.path}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${location.pathname === item.path ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {t.nav[item.key]}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <select value={lang} onChange={e => setLang(e.target.value)}
              className="bg-secondary text-secondary-foreground text-xs rounded-lg px-2 py-1.5 border border-border">
              {languages.map(l => <option key={l.code} value={l.code}>{l.native}</option>)}
            </select>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-foreground">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border p-4 space-y-2">
            {navItems.map(item => (
              <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg ${location.pathname === item.path ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                <item.icon size={18} /> {t.nav[item.key]}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">{children}</main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur border-t border-border">
        <div className="flex justify-around py-2">
          {navItems.slice(0, 5).map(item => (
            <Link key={item.path} to={item.path}
              className={`flex flex-col items-center gap-0.5 text-[10px] p-1 ${location.pathname === item.path ? "text-primary" : "text-muted-foreground"}`}>
              <item.icon size={18} />
              {t.nav[item.key]}
            </Link>
          ))}
        </div>
      </nav>

      {/* WhatsApp Floating Button */}
      <a href={buildWhatsAppLink("Hi AgriLink, I need help with farming")}
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-3.5 shadow-lg transition-transform hover:scale-110">
        <MessageCircle size={24} />
      </a>
    </div>
  );
}

