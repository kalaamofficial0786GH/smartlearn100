import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

const ContactTab = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-2">Get in Touch</h2>
        <p className="text-muted-foreground text-sm">We'd love to hear from you. Reach out anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-xl p-6">
          {!sent ? (
            <div className="space-y-4">
              {[
                { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-muted-foreground font-display mb-1 block">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(190,100%,50%,0.1)] transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-muted-foreground font-display mb-1 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write your message..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(190,100%,50%,0.1)] transition-all resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={sending}
                className="w-full py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 font-display text-sm tracking-wide hover:bg-primary/20 transition-all cursor-pointer glow-blue disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground mb-1">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">We'll get back to you shortly.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
          {[
            { icon: <MapPin className="w-5 h-5" />, label: "Address", value: "Al-Ameen Polytechnic College,Erode,TamilNadu," },
            { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+91 90256 93512" },
            { icon: <Mail className="w-5 h-5" />, label: "Email", value: "kalaamofficial0786@gmail.com" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="glass rounded-xl p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-display mb-0.5">{item.label}</p>
                <p className="text-sm text-foreground">{item.value}</p>
              </div>
            </motion.div>
          ))}

          {/* Map placeholder */}
          <div className="glass rounded-xl p-1 overflow-hidden h-48">
            <div className="w-full h-full rounded-xl bg-muted/30 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Al-Ameen Polytechnic College</p>
                <p className="text-[10px] text-muted-foreground">Erode,TamilNadu</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactTab;
