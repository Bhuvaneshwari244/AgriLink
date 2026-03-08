import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, MessageCircle, Truck } from "lucide-react";

export default function Transport() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ cropType: "", quantity: "", pickup: "", destination: "" });

  const sendWhatsApp = () => {
    const msg = `🚛 Transport Request\n\nCrop: ${form.cropType}\nQuantity: ${form.quantity} Quintals\nPickup: ${form.pickup}\nDestination: ${form.destination}`;
    window.open(`https://api.whatsapp.com/send?phone=919701473371&text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.transport.title}</h1>
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center"><Truck size={24} className="text-primary"/></div>
          <div>
            <h2 className="font-semibold text-foreground">Request Pickup</h2>
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
              <label className="text-sm font-medium text-foreground mb-1 block">{field.label}</label>
              <input value={(form as any)[field.key]} onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                placeholder={field.placeholder} className="w-full bg-secondary text-foreground px-4 py-2.5 rounded-xl border border-border outline-none focus:ring-2 focus:ring-primary" />
            </div>
          ))}
          <button onClick={sendWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
            <MessageCircle size={20}/>{t.transport.submit}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <a href="https://wa.me/919701473371" target="_blank" rel="noopener noreferrer"
          className="glass-card p-4 text-center hover:scale-105 transition-transform">
          <MessageCircle size={28} className="text-green-500 mx-auto mb-2"/>
          <p className="font-semibold text-foreground">{t.transport.whatsapp}</p>
          <p className="text-xs text-muted-foreground">9701473371</p>
        </a>
        <a href="tel:+919701473371" className="glass-card p-4 text-center hover:scale-105 transition-transform">
          <Phone size={28} className="text-primary mx-auto mb-2"/>
          <p className="font-semibold text-foreground">{t.transport.call}</p>
          <p className="text-xs text-muted-foreground">9701473371</p>
        </a>
      </div>
    </div>
  );
}
