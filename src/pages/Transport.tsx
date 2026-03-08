import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, MessageCircle, Truck, Search, Package, MapPin, CheckCircle2, Circle, Copy, Check } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useToast } from "@/hooks/use-toast";

const trackingSteps = [
  { key: "statusBooked", fallback: "Booked", icon: Package },
  { key: "statusPickedUp", fallback: "Picked Up", icon: Truck },
  { key: "statusInTransit", fallback: "In Transit", icon: MapPin },
  { key: "statusDelivered", fallback: "Delivered", icon: CheckCircle2 },
] as const;

const demoTrackingData: Record<string, { currentStep: number; eta: string; details: string[] }> = {
  "TRK-12345": { currentStep: 2, eta: "Mar 10, 2026", details: ["Booked on Mar 6", "Picked up from Warangal", "Currently near Hyderabad", ""] },
  "TRK-67890": { currentStep: 3, eta: "Delivered", details: ["Booked on Mar 3", "Picked up from Guntur", "Passed through Vijayawada", "Delivered at Secunderabad Mandi"] },
};

function generateTransportId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "TRK-";
  for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

export default function Transport() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [form, setForm] = useState({ cropType: "", quantity: "", pickup: "", destination: "", phone: "" });
  const [trackingId, setTrackingId] = useState("");
  const [activeTab, setActiveTab] = useState<"request" | "track">("request");
  const [trackedResult, setTrackedResult] = useState<typeof demoTrackingData[string] | null>(null);
  const [trackError, setTrackError] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleRequestPickup = () => {
    if (!form.cropType || !form.quantity || !form.pickup || !form.destination || !form.phone) {
      toast({ title: "Missing details", description: "Please fill all fields including phone number", variant: "destructive" });
      return;
    }
    const id = generateTransportId();
    setGeneratedId(id);

    // Also store in demo tracking so user can immediately track it
    demoTrackingData[id] = {
      currentStep: 0,
      eta: "Pending",
      details: [`Booked just now`, "", "", ""],
    };

    const message = `🚛 Transport Pickup Request\n\n📋 Tracking ID: ${id}\n🌾 Crop: ${form.cropType}\n📦 Quantity: ${form.quantity} Quintals\n📍 Pickup: ${form.pickup}\n🏁 Destination: ${form.destination}\n📱 Phone: ${form.phone}`;

    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  const handleCopyId = () => {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Copied!", description: `Tracking ID ${generatedId} copied to clipboard` });
    }
  };

  const handleTrack = () => {
    const result = demoTrackingData[trackingId.trim().toUpperCase()];
    if (result) {
      setTrackedResult(result);
      setTrackError(false);
    } else {
      setTrackedResult(null);
      setTrackError(true);
    }
  };

  const tt = t.transport;

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-3xl font-display font-bold text-foreground mb-6">{tt.title}</h1>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "request" as const, label: tt.requestPickup, icon: Truck },
            { id: "track" as const, label: tt.trackShipment || "Track Shipment", icon: Search },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all ${
                activeTab === tab.id ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}>
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "request" ? (
            <motion.div key="request" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}>
              <div className="glass-card p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/15 rounded-2xl flex items-center justify-center"><Truck size={24} className="text-primary" /></div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground">{tt.requestPickup}</h2>
                    <p className="text-sm text-muted-foreground">{tt.fillDetails}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { key: "cropType", label: tt.cropType, placeholder: tt.placeholderCrop, type: "text" },
                    { key: "quantity", label: tt.quantity, placeholder: tt.placeholderQty, type: "number" },
                    { key: "pickup", label: tt.pickup, placeholder: tt.placeholderPickup, type: "text" },
                    { key: "destination", label: tt.destination, placeholder: tt.placeholderDest, type: "text" },
                    { key: "phone", label: "Phone Number", placeholder: "e.g., 9876543210", type: "tel" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
                      <input
                        type={field.type}
                        value={(form as any)[field.key]}
                        onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full bg-secondary text-foreground px-4 py-3 rounded-2xl border border-border/50 outline-none focus:ring-2 focus:ring-primary transition-all"
                      />
                    </div>
                  ))}

                  {/* Request Pickup Button */}
                  <motion.button whileTap={{ scale: 0.98 }} onClick={handleRequestPickup}
                    className="w-full bg-success hover:bg-success/90 text-success-foreground py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors">
                    <MessageCircle size={20} /> {tt.requestPickup} — {tt.submit}
                  </motion.button>
                </div>

                {/* Generated ID Card */}
                <AnimatePresence>
                  {generatedId && (
                    <motion.div initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mt-6 bg-success/10 border border-success/30 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 size={20} className="text-success" />
                        <p className="font-semibold text-foreground text-sm">Pickup Requested!</p>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">Your tracking ID has been generated and sent via WhatsApp. Save it to track your shipment.</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-card border border-border rounded-xl px-4 py-3 font-mono text-lg font-bold text-primary tracking-wider text-center">
                          {generatedId}
                        </div>
                        <button onClick={handleCopyId}
                          className="bg-primary text-primary-foreground p-3 rounded-xl hover:bg-primary/90 transition-colors">
                          {copied ? <Check size={20} /> : <Copy size={20} />}
                        </button>
                      </div>
                      <button onClick={() => { setTrackingId(generatedId); setActiveTab("track"); }}
                        className="w-full mt-3 text-sm text-primary font-semibold hover:underline">
                        → Track this shipment
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div key="track" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              <div className="glass-card p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-info/15 rounded-2xl flex items-center justify-center"><Search size={24} className="text-info" /></div>
                  <div>
                    <h2 className="font-display font-semibold text-foreground">{tt.trackShipment || "Track Shipment"}</h2>
                    <p className="text-sm text-muted-foreground">{tt.demoNote || "Demo tracking — real tracking coming soon"}</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <input value={trackingId} onChange={e => setTrackingId(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleTrack()}
                    placeholder={tt.placeholderTrackingId || "e.g., TRK-12345"}
                    className="flex-1 bg-secondary text-foreground px-4 py-3 rounded-2xl border border-border/50 outline-none focus:ring-2 focus:ring-info transition-all" />
                  <button onClick={handleTrack}
                    className="bg-info hover:bg-info/90 text-info-foreground px-6 py-3 rounded-2xl font-semibold transition-colors">
                    {tt.track || "Track"}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground mb-4 text-center">
                  Try: <span className="font-mono bg-secondary px-2 py-0.5 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => setTrackingId("TRK-12345")}>TRK-12345</span> or{" "}
                  <span className="font-mono bg-secondary px-2 py-0.5 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => setTrackingId("TRK-67890")}>TRK-67890</span>
                </p>

                {trackError && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-destructive/10 text-destructive border border-destructive/20 rounded-2xl p-4 text-sm text-center mb-4">
                    {tt.noTracking || "No shipment found with this ID. Please check and try again."}
                  </motion.div>
                )}

                {trackedResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div className="relative">
                      {trackingSteps.map((step, i) => {
                        const isCompleted = i < trackedResult.currentStep;
                        const isCurrent = i === trackedResult.currentStep;
                        const StepIcon = step.icon;
                        return (
                          <div key={step.key} className="flex items-start gap-4 relative">
                            {i < trackingSteps.length - 1 && (
                              <div className={`absolute left-5 top-10 w-0.5 h-12 ${isCompleted ? "bg-success" : "bg-border"}`} />
                            )}
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                              isCompleted ? "bg-success text-success-foreground" :
                              isCurrent ? "bg-primary text-primary-foreground animate-pulse-glow" :
                              "bg-secondary text-muted-foreground"
                            }`}>
                              {isCompleted ? <CheckCircle2 size={20} /> : isCurrent ? <StepIcon size={20} /> : <Circle size={20} />}
                            </div>
                            <div className="pb-8">
                              <p className={`font-semibold text-sm ${isCompleted || isCurrent ? "text-foreground" : "text-muted-foreground"}`}>
                                {(tt as any)[step.key] || step.fallback}
                              </p>
                              {trackedResult.details[i] && (
                                <p className="text-xs text-muted-foreground mt-0.5">{trackedResult.details[i]}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-secondary/50 rounded-2xl p-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{tt.estimatedArrival || "Estimated Arrival"}</span>
                      <span className="text-sm font-bold text-primary">{trackedResult.eta}</span>
                    </div>
                  </motion.div>
                )}

                {!trackedResult && !trackError && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Truck size={48} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">{tt.noTracking || "Enter a tracking ID to see status"}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.a whileHover={{ y: -2 }} href={buildWhatsAppLink("")} target="_blank" rel="noopener noreferrer"
            className="glass-card-hover p-5 text-center">
            <MessageCircle size={28} className="text-success mx-auto mb-2" />
            <p className="font-display font-semibold text-foreground">{tt.whatsapp}</p>
            <p className="text-xs text-muted-foreground mt-1">9701473371</p>
          </motion.a>
          <motion.a whileHover={{ y: -2 }} href="tel:+919701473371" className="glass-card-hover p-5 text-center">
            <Phone size={28} className="text-primary mx-auto mb-2" />
            <p className="font-display font-semibold text-foreground">{tt.call}</p>
            <p className="text-xs text-muted-foreground mt-1">9701473371</p>
          </motion.a>
        </div>
      </div>
    </PageTransition>
  );
}
