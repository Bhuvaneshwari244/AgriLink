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
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }} 
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="w-12 h-12 bg-primary/15 rounded-2xl flex items-center justify-center"
          >
            <Sparkles size={24} className="text-primary" />
          </motion.div>
          <div>
            <motion.h1 
              className="text-2xl font-display font-bold text-foreground"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
              transition={{ type: "spring", stiffness: 300, y: { repeat: 2, duration: 0.3 } }}
            >
              {t.diagnosis.title}
            </motion.h1>
            <motion.p 
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {t.diagnosis.poweredBy}
            </motion.p>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "disease" as const, label: "🌿 Plant Disease", icon: Bug },
            { id: "soil" as const, label: "🪨 Soil Detection", icon: Mountain },
          ].map((m, i) => (
            <motion.button 
              key={m.id}
              onClick={() => { setMode(m.id); setResult(null); }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all ${
                mode === m.id ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <motion.span
                animate={mode === m.id ? { y: [0, -3, 0], rotate: [0, 10, -10, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <m.icon size={18} />
              </motion.span>
              <motion.span
                animate={mode === m.id ? { y: [0, -2, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }}
              >
                {m.label}
              </motion.span>
            </motion.button>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ type: "spring", stiffness: 300 }}
          whileHover={{ y: -3 }}
          className="glass-card p-6 mb-6"
        >
          <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleUpload} className="hidden" />
          <AnimatePresence mode="wait">
            {!image ? (
              <motion.button 
                key="upload" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => fileRef.current?.click()}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border-2 border-dashed border-border/50 rounded-2xl p-10 text-center hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center"
                  animate={{ y: [0, -6, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {mode === "soil" ? <Mountain size={32} className="text-primary" /> : <Camera size={32} className="text-primary" />}
                </motion.div>
                <motion.p 
                  className="text-foreground font-semibold text-lg"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                >
                  {mode === "soil" ? "Upload Soil Photo" : t.diagnosis.upload}
                </motion.p>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === "soil" ? "Take a clear photo of your soil sample" : t.diagnosis.photoHint}
                </p>
              </motion.button>
            ) : (
              <motion.div key="preview" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="relative">
                  <motion.img 
                    src={image} 
                    alt="Uploaded" 
                    className="w-full max-h-64 object-contain rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <motion.button 
                    whileTap={{ scale: 0.9 }} 
                    whileHover={{ scale: 1.1 }}
                    onClick={() => { setImage(null); setResult(null); }}
                    className="absolute top-2 right-2 bg-destructive/90 text-destructive-foreground text-xs px-3 py-1.5 rounded-xl font-medium"
                  >
                    {t.diagnosis.remove}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {image && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
              {/* Plant part selector only for disease mode */}
              {mode === "disease" && (
                <>
                  <motion.label 
                    className="text-sm font-medium text-foreground mb-2 block"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    🌿 {t.diagnosis.affectedPart}
                  </motion.label>
                  <div className="grid grid-cols-4 gap-2 mb-5">
                    {plantParts.map((part, i) => (
                      <motion.button 
                        key={part.name} 
                        whileTap={{ scale: 0.9 }} 
                        whileHover={{ y: -4, scale: 1.08 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, delay: i * 0.04 }}
                        onClick={() => setPlantPart(part.name)}
                        className={`relative flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs transition-all ${plantPart === part.name ? "text-primary-foreground font-medium shadow-lg" : "text-secondary-foreground hover:bg-muted"}`}
                      >
                        <motion.span 
                          className="relative z-10 text-lg"
                          animate={plantPart === part.name ? { y: [0, -3, 0], scale: [1, 1.2, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                        >
                          {part.icon}
                        </motion.span>
                        <motion.span 
                          className="relative z-10"
                          animate={plantPart === part.name ? { y: [0, -2, 0] } : {}}
                          transition={{ repeat: Infinity, duration: 1.2, delay: 0.1 }}
                        >
                          {translatePlantPart(part.name, lang)}
                        </motion.span>
                        {plantPart === part.name && <motion.div layoutId="plant-part" className="absolute inset-0 bg-primary rounded-xl" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}

              <motion.button 
                whileTap={{ scale: 0.97 }} 
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={analyze} 
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <><Loader2 size={20} className="animate-spin" />{t.diagnosis.analyzing}</>
                ) : (
                  <>
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Sparkles size={20} />
                    </motion.span>
                    {mode === "soil" ? "Analyze Soil" : t.diagnosis.analyze}
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
