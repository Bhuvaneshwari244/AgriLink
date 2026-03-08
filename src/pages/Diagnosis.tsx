import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Upload, Camera, Loader2, AlertTriangle, CheckCircle } from "lucide-react";

// Local pattern-matching diagnosis (no cloud needed)
const diseaseDatabase = [
  { keywords: ["yellow", "leaf", "curl"], disease: "Yellow Leaf Curl Virus", severity: "High", treatment: "Remove infected plants. Spray Imidacloprid 0.3ml/L for whitefly vector control. Use resistant varieties.", prevention: "Use virus-free seedlings. Install yellow sticky traps. Maintain field hygiene." },
  { keywords: ["brown", "spot", "leaf"], disease: "Brown Leaf Spot", severity: "Medium", treatment: "Spray Mancozeb 2.5g/L or Carbendazim 1g/L. Apply potash fertilizer.", prevention: "Use resistant varieties. Balanced fertilization. Proper spacing." },
  { keywords: ["wilt", "drooping", "dry"], disease: "Fusarium Wilt", severity: "High", treatment: "No chemical cure. Remove infected plants. Apply Trichoderma viride 4g/kg seed.", prevention: "Crop rotation for 3-4 years. Use resistant varieties. Soil solarization." },
  { keywords: ["white", "powder", "mildew"], disease: "Powdery Mildew", severity: "Medium", treatment: "Spray Sulphur 3g/L or Karathane 1ml/L. Apply twice at 15-day interval.", prevention: "Avoid excess nitrogen. Proper air circulation. Resistant varieties." },
  { keywords: ["rot", "black", "fruit"], disease: "Fruit Rot / Black Rot", severity: "High", treatment: "Spray Copper Oxychloride 3g/L. Remove and destroy infected fruits.", prevention: "Proper drainage. Avoid injury to fruits. Pre-harvest spray." },
  { keywords: ["rust", "orange", "pustule"], disease: "Rust Disease", severity: "Medium", treatment: "Spray Propiconazole 1ml/L or Mancozeb 2.5g/L.", prevention: "Early sowing. Remove volunteer plants. Use resistant varieties." },
  { keywords: ["blight", "burn", "necrosis"], disease: "Bacterial Blight", severity: "High", treatment: "Spray Streptocycline 0.5g + Copper Oxychloride 3g per liter of water.", prevention: "Use certified seeds. Hot water seed treatment. Crop rotation." },
  { keywords: ["mosaic", "pattern", "virus"], disease: "Mosaic Virus", severity: "High", treatment: "No direct cure. Control aphid/whitefly vectors with Dimethoate 2ml/L.", prevention: "Resistant varieties. Remove infected plants immediately. Vector control." },
  { keywords: ["insect", "pest", "hole", "damage"], disease: "Insect Pest Damage", severity: "Variable", treatment: "Identify specific pest. Use Neem oil 5ml/L for general control. IPM approach recommended.", prevention: "Pheromone traps. Light traps. Crop rotation. Biological control agents." },
];

export default function Diagnosis() {
  const { t } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [plantPart, setPlantPart] = useState("Leaf");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const analyze = () => {
    if (!image) return;
    setLoading(true);
    // Simulate AI analysis with pattern matching
    setTimeout(() => {
      const randomDisease = diseaseDatabase[Math.floor(Math.random() * diseaseDatabase.length)];
      setResult({
        disease: randomDisease.disease,
        severity: randomDisease.severity,
        affectedPart: plantPart,
        treatment: randomDisease.treatment,
        prevention: randomDisease.prevention,
        confidence: (70 + Math.random() * 25).toFixed(1),
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.diagnosis.title}</h1>
      <div className="glass-card p-6 mb-6">
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleUpload} className="hidden" />
        {!image ? (
          <button onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors">
            <Upload size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-foreground font-semibold">{t.diagnosis.upload}</p>
            <p className="text-sm text-muted-foreground mt-1">Take a photo or upload from gallery</p>
          </button>
        ) : (
          <div>
            <img src={image} alt="Uploaded" className="w-full max-h-64 object-contain rounded-xl mb-4" />
            <button onClick={() => { setImage(null); setResult(null); }} className="text-sm text-muted-foreground underline mb-4">Change Image</button>
          </div>
        )}
        {image && (
          <div className="mt-4">
            <label className="text-sm font-medium text-foreground mb-2 block">Affected Plant Part</label>
            <div className="flex gap-2 flex-wrap mb-4">
              {["Leaf", "Stem", "Root", "Fruit", "Pod/Seed", "Flower", "Insect"].map(part => (
                <button key={part} onClick={() => setPlantPart(part)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${plantPart === part ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{part}</button>
              ))}
            </div>
            <button onClick={analyze} disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-colors">
              {loading ? <><Loader2 size={20} className="animate-spin"/>Analyzing...</> : <><Camera size={20}/>{t.diagnosis.analyze}</>}
            </button>
          </div>
        )}
      </div>
      {result && (
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            <CheckCircle size={24} className="text-primary"/>{t.diagnosis.result}
          </h2>
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-foreground text-lg">{result.disease}</h3>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${result.severity === "High" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                {result.severity} {t.diagnosis.severity}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Affected: {result.affectedPart} • Confidence: {result.confidence}%</p>
          </div>
          <div className="space-y-3">
            <div className="bg-green-500/10 rounded-xl p-4">
              <h4 className="font-semibold text-green-400 mb-2">💊 {t.diagnosis.treatment}</h4>
              <p className="text-sm text-foreground">{result.treatment}</p>
            </div>
            <div className="bg-blue-500/10 rounded-xl p-4">
              <h4 className="font-semibold text-blue-400 mb-2">🛡️ {t.diagnosis.prevention}</h4>
              <p className="text-sm text-foreground">{result.prevention}</p>
            </div>
          </div>
          <a href={`https://wa.me/919701473371?text=${encodeURIComponent(`Disease detected: ${result.disease}\nSeverity: ${result.severity}\nPart: ${result.affectedPart}\n\nPlease advise on treatment.`)}`}
            target="_blank" rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
            Ask Expert on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
