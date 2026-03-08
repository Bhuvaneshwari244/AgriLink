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

  const getCropFallbackImage = (name: string, category: string) => {
    const paletteByCategory: Record<string, { bg1: string; bg2: string; accent: string }> = {
      Cereals: { bg1: "#4b5d3f", bg2: "#8ea46b", accent: "#f2d06b" },
      Pulses: { bg1: "#3f5d4b", bg2: "#70a18b", accent: "#f0e2a0" },
      Oilseeds: { bg1: "#5d523f", bg2: "#a29066", accent: "#f5ce5a" },
      Vegetables: { bg1: "#2f5f3c", bg2: "#63ad77", accent: "#d9f07f" },
      Fruits: { bg1: "#5e4a2f", bg2: "#b48447", accent: "#ffd28a" },
      Spices: { bg1: "#5d3f2f", bg2: "#a96f4d", accent: "#ffd099" },
      Commercial: { bg1: "#444b5f", bg2: "#6a7598", accent: "#cbd5ff" },
      Plantation: { bg1: "#2f4e5d", bg2: "#4f8aa3", accent: "#b7ecff" },
    };

    const palette = paletteByCategory[category] ?? { bg1: "#3f4e5d", bg2: "#6b88a3", accent: "#dce9f5" };
    const safeName = name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeCategory = category.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" role="img" aria-label="${safeName} crop image placeholder">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${palette.bg1}"/>
            <stop offset="100%" stop-color="${palette.bg2}"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="700" fill="url(#g)"/>
        <path d="M0 560 C180 500, 360 620, 560 560 C780 490, 950 620, 1200 540 L1200 700 L0 700 Z" fill="${palette.accent}" opacity="0.35"/>
        <text x="60" y="580" fill="white" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="64" font-weight="700">${safeName}</text>
        <text x="60" y="635" fill="white" opacity="0.9" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="34">${safeCategory} Crop</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const getWikimediaOriginalUrl = (url: string) => {
    if (!url.includes("upload.wikimedia.org/wikipedia/commons/thumb/")) return null;

    const parts = url.split("/thumb/")[1]?.split("/") ?? [];
    if (parts.length < 4) return null;

    const [folder1, folder2, fileName] = parts;
    return `https://upload.wikimedia.org/wikipedia/commons/${folder1}/${folder2}/${fileName}`;
  };

  const resolveCropImage = (image: string, name: string, cropCategory: string) => {
    if (!image || image.includes("source.unsplash.com")) return getCropFallbackImage(name, cropCategory);
    return getWikimediaOriginalUrl(image) ?? image;
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    cropName: string,
    cropCategory: string,
    originalImage: string,
  ) => {
    const img = e.currentTarget;
    const retryStep = Number(img.dataset.retryStep ?? "0");

    if (retryStep === 0) {
      const wikimediaOriginal = getWikimediaOriginalUrl(originalImage);
      if (wikimediaOriginal && img.src !== wikimediaOriginal) {
        img.dataset.retryStep = "1";
        img.src = wikimediaOriginal;
        return;
      }
    }

    if (retryStep <= 1) {
      img.dataset.retryStep = "2";
      img.src = getCropFallbackImage(cropName, cropCategory);
      return;
    }

    img.src = "/placeholder.svg";
  };

  const filtered = crops.filter(c =>
    (category === "All" || c.category === category) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.scientificName.toLowerCase().includes(search.toLowerCase()))
  );

  if (selected) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <button onClick={() => setSelected(null)} className="flex items-center gap-2 text-primary mb-4"><ArrowLeft size={18}/>{t.common.back}</button>
        <img src={resolveCropImage(selected.image, selected.name, selected.category)} alt={selected.name} className="w-full h-56 object-cover rounded-xl mb-4" onError={e => handleImageError(e, selected.name, selected.category)} />
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
            <img src={resolveCropImage(crop.image, crop.name, crop.category)} alt={crop.name} className="w-full h-32 object-cover" onError={e => handleImageError(e, crop.name, crop.category)} />
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

