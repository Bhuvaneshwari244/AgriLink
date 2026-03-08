import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Camera, Loader2, AlertTriangle, CheckCircle, Sparkles, Leaf, Bug, Pill } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export default function Diagnosis() {
  const { t, lang } = useLanguage();
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [plantPart, setPlantPart] = useState("Leaf");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload an image under 10MB", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => setImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("diagnose-crop", {
        body: { imageBase64: image, plantPart, language: lang },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      console.error("Diagnosis error:", err);
      toast({
        title: "Analysis Failed",
        description: err.message || "Could not analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const plantParts = [
    { name: "Leaf", icon: "🍃" },
    { name: "Stem", icon: "🌿" },
    { name: "Root", icon: "🌱" },
    { name: "Fruit", icon: "🍎" },
    { name: "Pod/Seed", icon: "🫘" },
    { name: "Flower", icon: "🌸" },
    { name: "Insect", icon: "🐛" },
    { name: "Full Plant", icon: "🌳" },
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
          <Sparkles size={24} className="text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">{t.diagnosis.title}</h1>
          <p className="text-sm text-muted-foreground">Powered by AI Vision Analysis</p>
        </div>
      </div>

      <div className="glass-card p-6 mb-6">
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleUpload} className="hidden" />
        {!image ? (
          <button onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary hover:bg-primary/5 transition-all group">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera size={32} className="text-primary" />
            </div>
            <p className="text-foreground font-semibold text-lg">{t.diagnosis.upload}</p>
            <p className="text-sm text-muted-foreground mt-1">Take a photo or upload from gallery (max 10MB)</p>
          </button>
        ) : (
          <div>
            <div className="relative">
              <img src={image} alt="Uploaded" className="w-full max-h-64 object-contain rounded-xl" />
              <button onClick={() => { setImage(null); setResult(null); }}
                className="absolute top-2 right-2 bg-destructive/90 text-destructive-foreground text-xs px-3 py-1 rounded-lg">
                Remove
              </button>
            </div>
          </div>
        )}
        {image && (
          <div className="mt-5">
            <label className="text-sm font-medium text-foreground mb-2 block">🌿 Affected Plant Part</label>
            <div className="grid grid-cols-4 gap-2 mb-5">
              {plantParts.map(part => (
                <button key={part.name} onClick={() => setPlantPart(part.name)}
                  className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-xs transition-all ${plantPart === part.name ? "bg-primary text-primary-foreground shadow-lg scale-105" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}>
                  <span className="text-lg">{part.icon}</span>
                  {part.name}
                </button>
              ))}
            </div>
            <button onClick={analyze} disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-all glow-red">
              {loading ? (
                <><Loader2 size={20} className="animate-spin" />Analyzing with AI...</>
              ) : (
                <><Sparkles size={20} />{t.diagnosis.analyze}</>
              )}
            </button>
          </div>
        )}
      </div>

      {result && (
        <div className="glass-card p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
            <CheckCircle size={24} className="text-primary" />{t.diagnosis.result}
          </h2>
          
          <div className="bg-secondary/50 rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-foreground text-lg">{result.disease}</h3>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                result.severity === "Critical" ? "bg-red-600/30 text-red-300" :
                result.severity === "High" ? "bg-red-500/20 text-red-400" :
                result.severity === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                "bg-green-500/20 text-green-400"
              }`}>
                {result.severity} {t.diagnosis.severity}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Affected: {result.affectedPart} • Confidence: {result.confidence}%
            </p>
            {result.cause && (
              <p className="text-sm text-muted-foreground mt-1">Cause: {result.cause}</p>
            )}
          </div>

          {result.symptoms && (
            <div className="bg-orange-500/10 rounded-xl p-4">
              <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2"><Bug size={16} /> Symptoms</h4>
              <p className="text-sm text-foreground">{result.symptoms}</p>
            </div>
          )}

          <div className="space-y-3">
            <div className="bg-green-500/10 rounded-xl p-4">
              <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2"><Pill size={16} /> {t.diagnosis.treatment}</h4>
              <p className="text-sm text-foreground">{result.treatment}</p>
            </div>
            {result.organicTreatment && (
              <div className="bg-emerald-500/10 rounded-xl p-4">
                <h4 className="font-semibold text-emerald-400 mb-2 flex items-center gap-2"><Leaf size={16} /> Organic Treatment</h4>
                <p className="text-sm text-foreground">{result.organicTreatment}</p>
              </div>
            )}
            <div className="bg-blue-500/10 rounded-xl p-4">
              <h4 className="font-semibold text-blue-400 mb-2">🛡️ {t.diagnosis.prevention}</h4>
              <p className="text-sm text-foreground">{result.prevention}</p>
            </div>
          </div>

          <a href={buildWhatsAppLink(`🔬 AI Disease Diagnosis:\n\nDisease: ${result.disease}\nSeverity: ${result.severity}\nPart: ${result.affectedPart}\nConfidence: ${result.confidence}%\n\nPlease advise on treatment.`)}
            target="_blank" rel="noopener noreferrer"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
            💬 Ask Expert on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

