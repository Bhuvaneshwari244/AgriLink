import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { crops, cropCategories, Crop } from "@/data/crops";
import { Search, ArrowLeft, ExternalLink } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function CropLibrary() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Crop | null>(null);

  const getLiveCropImage = (name: string) => `https://source.unsplash.com/1200x800/?${encodeURIComponent(`${name} crop field agriculture`)}`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, cropName: string) => {
    const img = e.currentTarget;
    const liveFallback = getLiveCropImage(cropName);

    if (img.src.includes("source.unsplash.com")) {
      img.src = `https://placehold.co/400x200/1a1a2e/dc2626?text=${encodeURIComponent(cropName)}`;
      return;
    }

    img.src = liveFallback;
  };

  const filtered = crops.filter(c =>
    (category === "All" || c.category === category) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.scientificName.toLowerCase().includes(search.toLowerCase()))
  );

  if (selected) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-primary mb-4"><ArrowLeft size={18}/>{t.common.back}</button>
        <img src={getLiveCropImage(selected.name)} alt={selected.name} className="w-full h-56 object-cover rounded-xl mb-4" onError={e => handleImageError(e, selected.name)} />
        <h1 className="text-3xl font-display font-bold text-foreground">{selected.name}</h1>
        <p className="text-muted-foreground italic mb-4">{selected.scientificName}</p>
        <p className="text-secondary-foreground mb-6">{selected.description}</p>
        <div className="grid gap-4">
          {[
            { label: t.crops.season, value: selected.season },
            { label: t.crops.soil, value: selected.soilType },
            { label: t.crops.irrigation, value: selected.irrigation },
            { label: t.crops.fertilizer, value: selected.fertilizerSchedule },
          ].map(item => (
            <div key={item.label} className="glass-card p-4">
              <h3 className="text-sm font-semibold text-primary mb-1">{item.label}</h3>
              <p className="text-foreground text-sm">{item.value}</p>
            </div>
          ))}
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-primary mb-2">{t.crops.pests}</h3>
            <div className="flex flex-wrap gap-2">{selected.pests.map(p => <span key={p} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-lg">{p}</span>)}</div>
          </div>
          <div className="glass-card p-4">
            <h3 className="text-sm font-semibold text-primary mb-2">{t.crops.bestPractices}</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground">{selected.bestPractices.map(b => <li key={b}>{b}</li>)}</ul>
          </div>
        </div>
        <a href={buildWhatsAppLink(`I need info about ${selected.name}`)} target="_blank" rel="noopener noreferrer"
          className="mt-6 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl w-full transition-colors">
          <ExternalLink size={18}/> Ask about {selected.name} on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.crops.title}</h1>
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.crops.search}
          className="w-full bg-secondary text-foreground pl-10 pr-4 py-2.5 rounded-xl border border-border focus:ring-2 focus:ring-primary outline-none" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
        {cropCategories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm transition-colors ${category === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
            {cat}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mb-4">{filtered.length} crops found</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(crop => (
          <button key={crop.id} onClick={() => setSelected(crop)} className="glass-card overflow-hidden text-left hover:scale-[1.02] transition-transform">
            <img src={getLiveCropImage(crop.name)} alt={crop.name} className="w-full h-32 object-cover" onError={e => handleImageError(e, crop.name)} />
            <div className="p-3">
              <h3 className="font-semibold text-foreground text-sm">{crop.name}</h3>
              <p className="text-xs text-muted-foreground italic">{crop.scientificName}</p>
              <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded mt-1 inline-block">{crop.category}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

