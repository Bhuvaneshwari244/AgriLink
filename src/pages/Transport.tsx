import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, MessageCircle, Truck } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

export default function Transport() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ cropType: "", quantity: "", pickup: "", destination: "" });

  const transportMessage = `🚛 Transport Request\n\nCrop: ${form.cropType || "N/A"}\nQuantity: ${form.quantity || "N/A"} Quintals\nPickup: ${form.pickup || "N/A"}\nDestination: ${form.destination || "N/A"}`;

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.transport.title}</h1>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/15 rounded-2xl flex items-center justify-center"><Truck size={24} className="text-primary"/></div>
            <div>
              <h2 className="font-display font-semibold text-foreground">Request Pickup</h2>
              <p className="text-sm text-muted-foreground">Fill details and send via WhatsApp</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { key: "cropType", label: t.transport.cropType, placeholder: "e.g., Rice, Wheat, Cotton" },
              { key: "quantity", label: t.transport.quantity, placeholder: "e.g., 50" },
              { key: "pickup", label: t.transport.pickup, placeholder: "Village/Town name" },
              { key: "destination", label: t.transport.destination, placeholder: "Market/City name" },
            ].map(field => (
              <div key={field.key}>
                <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
                <input value={(form as any)[field.key]} onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder} className="w-full bg-secondary text-foreground px-4 py-3 rounded-2xl border border-border/50 outline-none focus:ring-2 focus:ring-primary transition-all" />
              </div>
            ))}
            <motion.a whileTap={{ scale: 0.98 }}
              href={buildWhatsAppLink(transportMessage)} target="_blank" rel="noopener noreferrer"
              className="w-full bg-success hover:bg-success/90 text-success-foreground py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors">
              <MessageCircle size={20}/>{t.transport.submit}
            </motion.a>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          <motion.a whileHover={{ y: -2 }} href={buildWhatsAppLink("")} target="_blank" rel="noopener noreferrer"
            className="glass-card-hover p-5 text-center">
            <MessageCircle size={28} className="text-success mx-auto mb-2"/>
            <p className="font-display font-semibold text-foreground">{t.transport.whatsapp}</p>
            <p className="text-xs text-muted-foreground mt-1">9701473371</p>
          </motion.a>
          <motion.a whileHover={{ y: -2 }} href="tel:+919701473371" className="glass-card-hover p-5 text-center">
            <Phone size={28} className="text-primary mx-auto mb-2"/>
            <p className="font-display font-semibold text-foreground">{t.transport.call}</p>
            <p className="text-xs text-muted-foreground mt-1">9701473371</p>
          </motion.a>
        </div>
      </div>
    </PageTransition>
  );
}
