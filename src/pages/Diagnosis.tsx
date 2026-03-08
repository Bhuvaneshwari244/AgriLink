import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translatePlantPart } from "@/data/dataTranslations";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Camera, Loader2, AlertTriangle, CheckCircle, Sparkles, Leaf, Bug, Pill, Droplets, Mountain, FlaskConical, Sprout, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { AnimatedLabel } from "@/components/AnimatedLabel";

export default function Diagnosis() {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [plantPart, setPlantPart] = useState("Leaf");
  const [mode, setMode] = useState<"disease" | "soil">("disease");
  const fileRef = useRef<HTMLInputElement>(null);

  const compressImage = (file: File, maxWidth = 1024, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) { reject(new Error("Canvas not supported")); return; }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = ev.target?.result as string;
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: t.diagnosis.fileTooLarge, description: t.diagnosis.fileTooLargeDesc, variant: "destructive" });
      return;
    }
    try {
      const compressed = await compressImage(file);
      setImage(compressed);
      setResult(null);
    } catch {
      toast({ title: t.diagnosis.analysisFailed, description: "Could not process image. Please try another.", variant: "destructive" });
    }
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("diagnose-crop", {
        body: { imageBase64: image, plantPart, language: lang, mode },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      console.error("Diagnosis error:", err);
      toast({ title: t.diagnosis.analysisFailed, description: err.message || "Could not analyze image. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const plantParts = [
    { name: "Leaf", icon: "🍃" }, { name: "Stem", icon: "🌿" }, { name: "Root", icon: "🌱" }, { name: "Fruit", icon: "🍎" },
    { name: "Pod/Seed", icon: "🫘" }, { name: "Flower", icon: "🌸" }, { name: "Insect", icon: "🐛" }, { name: "Full Plant", icon: "🌳" },
  ];

  const isSoilResult = result?._mode === "soil";

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-12 h-12 bg-primary/15 rounded-2xl flex items-center justify-center">
            <Sparkles size={24} className="text-primary" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{t.diagnosis.title}</h1>
            <p className="text-sm text-muted-foreground">{t.diagnosis.poweredBy}</p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => { setMode("disease"); setResult(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all ${
              mode === "disease" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}>
            <Bug size={18} /> 🌿 Plant Disease
          </button>
          <button onClick={() => { setMode("soil"); setResult(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all ${
              mode === "soil" ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}>
            <Mountain size={18} /> 🪨 Soil Detection
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
          <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleUpload} className="hidden" />
          <AnimatePresence mode="wait">
            {!image ? (
              <motion.button key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-border/50 rounded-2xl p-10 text-center hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {mode === "soil" ? <Mountain size={32} className="text-primary" /> : <Camera size={32} className="text-primary" />}
                </div>
                <p className="text-foreground font-semibold text-lg">
                  {mode === "soil" ? "Upload Soil Photo" : t.diagnosis.upload}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === "soil" ? "Take a clear photo of your soil sample" : t.diagnosis.photoHint}
                </p>
              </motion.button>
            ) : (
              <motion.div key="preview" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="relative">
                  <img src={image} alt="Uploaded" className="w-full max-h-64 object-contain rounded-2xl" />
                  <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setImage(null); setResult(null); }}
                    className="absolute top-2 right-2 bg-destructive/90 text-destructive-foreground text-xs px-3 py-1.5 rounded-xl font-medium">
                    {t.diagnosis.remove}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {image && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
              {/* Plant part selector only for disease mode */}
              {mode === "disease" && (
                <>
                  <label className="text-sm font-medium text-foreground mb-2 block">🌿 {t.diagnosis.affectedPart}</label>
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    {plantParts.map(part => (
                      <motion.button key={part.name} whileTap={{ scale: 0.95 }} onClick={() => setPlantPart(part.name)}
                        className={`relative flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs transition-all ${plantPart === part.name ? "text-primary-foreground font-medium shadow-lg" : "text-secondary-foreground hover:bg-muted"}`}>
                        <span className="relative z-10 text-lg">{part.icon}</span>
                        <span className="relative z-10">{translatePlantPart(part.name, lang)}</span>
                        {plantPart === part.name && <motion.div layoutId="plant-part" className="absolute inset-0 bg-primary rounded-xl" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              <motion.button whileTap={{ scale: 0.98 }} onClick={analyze} disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-all animate-pulse-glow">
                {loading ? (
                  <><Loader2 size={20} className="animate-spin" />{t.diagnosis.analyzing}</>
                ) : (
                  <><Sparkles size={20} />{mode === "soil" ? "Analyze Soil" : t.diagnosis.analyze}</>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && !isSoilResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                <CheckCircle size={24} className="text-primary" />{t.diagnosis.result}
              </h2>
              <div className="bg-secondary/50 rounded-2xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-foreground text-lg">{result.disease}</h3>
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold ${
                    result.severity === "Critical" ? "bg-destructive/30 text-destructive" :
                    result.severity === "High" ? "bg-destructive/20 text-destructive" :
                    result.severity === "Medium" ? "bg-warning/20 text-warning" :
                    "bg-success/20 text-success"
                  }`}>{result.severity} {t.diagnosis.severity}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t.diagnosis.affected}: {result.affectedPart} • {t.diagnosis.confidence}: {result.confidence}%</p>
                {result.cause && <p className="text-sm text-muted-foreground mt-1">{t.diagnosis.cause}: {result.cause}</p>}
              </div>
              {result.symptoms && (
                <div className="bg-warning/10 rounded-2xl p-4 border border-warning/20">
                  <h4 className="font-semibold text-warning mb-2 flex items-center gap-2"><Bug size={16} /> {t.diagnosis.symptoms}</h4>
                  <p className="text-sm text-foreground">{result.symptoms}</p>
                </div>
              )}
              <div className="space-y-3">
                <div className="bg-success/10 rounded-2xl p-4 border border-success/20">
                  <h4 className="font-semibold text-success mb-2 flex items-center gap-2"><Pill size={16} /> {t.diagnosis.treatment}</h4>
                  <p className="text-sm text-foreground">{result.treatment}</p>
                </div>
                {result.organicTreatment && (
                  <div className="bg-success/5 rounded-2xl p-4 border border-success/10">
                    <h4 className="font-semibold text-success mb-2 flex items-center gap-2"><Leaf size={16} /> {t.diagnosis.organicTreatment}</h4>
                    <p className="text-sm text-foreground">{result.organicTreatment}</p>
                  </div>
                )}
                <div className="bg-info/10 rounded-2xl p-4 border border-info/20">
                  <h4 className="font-semibold text-info mb-2">🛡️ {t.diagnosis.prevention}</h4>
                  <p className="text-sm text-foreground">{result.prevention}</p>
                </div>
                {/* Soil care section for disease results */}
                {result.soilCare && (
                  <div className="bg-accent/10 rounded-2xl p-4 border border-accent/20">
                    <h4 className="font-semibold text-accent mb-2 flex items-center gap-2"><Mountain size={16} /> 🪨 Soil Maintenance</h4>
                    <p className="text-sm text-foreground">{result.soilCare}</p>
                  </div>
                )}
              </div>
              <motion.a whileTap={{ scale: 0.98 }}
                href={buildWhatsAppLink(`🔬 AI Disease Diagnosis:\n\nDisease: ${result.disease}\nSeverity: ${result.severity}\nPart: ${result.affectedPart}\nConfidence: ${result.confidence}%\n\nPlease advise on treatment.`)}
                target="_blank" rel="noopener noreferrer"
                className="w-full bg-success hover:bg-success/90 text-success-foreground py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors">
                💬 {t.diagnosis.askExpert}
              </motion.a>
            </motion.div>
          )}

          {/* Soil Detection Results */}
          {result && isSoilResult && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="glass-card p-6 space-y-4">
              <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                <CheckCircle size={24} className="text-primary" /> Soil Analysis Report
              </h2>

              {/* Soil Type & Overview */}
              <div className="bg-secondary/50 rounded-2xl p-4">
                <h3 className="font-bold text-foreground text-lg mb-1">🪨 {result.soilType}</h3>
                <p className="text-sm text-muted-foreground">{result.color}</p>
                <p className="text-sm text-muted-foreground mt-1">Texture: {result.texture}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "💧 Moisture", value: result.moistureLevel, color: result.moistureLevel === "High" ? "text-info" : result.moistureLevel === "Low" ? "text-warning" : "text-foreground" },
                  { label: "🧪 pH Estimate", value: result.phEstimate, color: "text-foreground" },
                  { label: "🌱 Organic Matter", value: result.organicMatter, color: result.organicMatter === "High" ? "text-success" : result.organicMatter === "Low" ? "text-destructive" : "text-warning" },
                  { label: "⭐ Fertility", value: result.fertility, color: result.fertility === "High" || result.fertility === "Very High" ? "text-success" : result.fertility === "Low" ? "text-destructive" : "text-warning" },
                  { label: "💦 Water Retention", value: result.waterRetention, color: "text-foreground" },
                  { label: "🚰 Drainage", value: result.drainage, color: "text-foreground" },
                ].map(stat => (
                  <div key={stat.label} className="bg-card border border-border/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className={`font-bold text-sm mt-0.5 ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Fertility Tips */}
              <div className="bg-success/10 rounded-2xl p-4 border border-success/20">
                <h4 className="font-semibold text-success mb-2 flex items-center gap-2"><Sprout size={16} /> Fertility Maintenance</h4>
                <p className="text-sm text-foreground">{result.fertilityTips}</p>
              </div>

              {/* Soil Maintenance */}
              <div className="bg-primary/10 rounded-2xl p-4 border border-primary/20">
                <h4 className="font-semibold text-primary mb-2 flex items-center gap-2"><Mountain size={16} /> Soil Maintenance</h4>
                <p className="text-sm text-foreground">{result.soilMaintenance}</p>
              </div>

              {/* Suitable Crops */}
              <div className="bg-info/10 rounded-2xl p-4 border border-info/20">
                <h4 className="font-semibold text-info mb-2 flex items-center gap-2"><Leaf size={16} /> Suitable Crops</h4>
                <p className="text-sm text-foreground">{result.suitableCrops}</p>
              </div>

              {/* Improvements */}
              <div className="bg-accent/10 rounded-2xl p-4 border border-accent/20">
                <h4 className="font-semibold text-accent mb-2 flex items-center gap-2"><FlaskConical size={16} /> Recommended Improvements</h4>
                <p className="text-sm text-foreground">{result.improvements}</p>
              </div>

              {/* Warnings */}
              {result.warnings && result.warnings !== "None" && result.warnings !== "None detected" && (
                <div className="bg-warning/10 rounded-2xl p-4 border border-warning/20">
                  <h4 className="font-semibold text-warning mb-2 flex items-center gap-2"><ShieldAlert size={16} /> ⚠️ Warnings</h4>
                  <p className="text-sm text-foreground">{result.warnings}</p>
                </div>
              )}

              <motion.a whileTap={{ scale: 0.98 }}
                href={buildWhatsAppLink(`🪨 AI Soil Analysis:\n\nSoil Type: ${result.soilType}\nFertility: ${result.fertility}\npH: ${result.phEstimate}\nOrganic Matter: ${result.organicMatter}\n\nPlease advise on soil improvement.`)}
                target="_blank" rel="noopener noreferrer"
                className="w-full bg-success hover:bg-success/90 text-success-foreground py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors">
                💬 {t.diagnosis.askExpert}
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
