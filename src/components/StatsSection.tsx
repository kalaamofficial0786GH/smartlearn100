import { motion } from "framer-motion";
import { Sparkles, BookOpen, Users, Trophy } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Courses", value: "200+" },
  { icon: Users, label: "Students", value: "50K+" },
  { icon: Trophy, label: "Certificates", value: "30K+" },
  { icon: Sparkles, label: "5-Star Reviews", value: "12K+" },
];

const StatsSection = () => {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass rounded-2xl p-6 text-center glow-blue animate-float"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
