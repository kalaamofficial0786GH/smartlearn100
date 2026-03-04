import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, Zap, Send, CheckCircle, Loader2, X, Globe } from "lucide-react";
import { useState, useMemo } from "react";
import { courses } from "@/data/courses";

type LangFilter = "all" | "English" | "Tamil";

const CoursesTab = () => {
  const [accessCourse, setAccessCourse] = useState<typeof courses[0] | null>(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [langFilter, setLangFilter] = useState<LangFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    let list = courses;
    if (langFilter !== "all") list = list.filter(c => c.lang === langFilter);
    if (categoryFilter !== "all") list = list.filter(c => c.category === categoryFilter);
    return list;
  }, [langFilter, categoryFilter]);

  const categories = useMemo(() => [...new Set(courses.map(c => c.category))], []);

  const handleSendLink = () => {
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 2000);
  };

  const resetAccess = () => {
    setAccessCourse(null); setEmail(""); setSending(false); setSent(false); setError("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-2">Course Universe</h2>
        <p className="text-muted-foreground text-sm">All {courses.length} courses are 100% FREE — forever.</p>
      </div>

      {/* Language filter */}
      <div className="flex flex-wrap gap-3">
        {(["all", "English", "Tamil"] as LangFilter[]).map(f => (
          <button key={f} onClick={() => setLangFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-display tracking-wider transition-all cursor-pointer ${
              langFilter === f ? "bg-primary/20 text-primary border border-primary/40" : "glass text-muted-foreground hover:text-foreground"
            }`}>
            {f === "all" ? `All (${courses.length})` : `${f} (${courses.filter(c => c.lang === f).length})`}
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setCategoryFilter("all")}
          className={`px-3 py-1 rounded-full text-[10px] font-display tracking-wide transition-all cursor-pointer ${
            categoryFilter === "all" ? "bg-accent/20 text-accent border border-accent/30" : "bg-primary/10 text-primary border border-primary/20"
          }`}>All</button>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 rounded-full text-[10px] font-display tracking-wide transition-all cursor-pointer ${
              categoryFilter === cat ? "bg-accent/20 text-accent border border-accent/30" : "bg-primary/10 text-primary border border-primary/20"
            }`}>{cat}</button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course, i) => {
          const isBlue = course.color === "neon-blue";
          return (
            <motion.div key={course.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
              className={`glass rounded-xl p-5 ${isBlue ? "hover:shadow-[0_0_30px_hsl(190,100%,50%,0.15)]" : "hover:shadow-[0_0_30px_hsl(263,84%,52%,0.15)]"} transition-all duration-400 group cursor-pointer`}
              onClick={() => setAccessCourse(course)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${isBlue ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
                    {course.category}
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted/30 text-[9px] text-muted-foreground">
                    <Globe className="w-2.5 h-2.5" />{course.lang}
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30">
                  <Zap className="w-2.5 h-2.5 text-primary" />
                  <span className="text-[9px] font-display font-bold text-primary">FREE</span>
                </div>
              </div>

              <h3 className="font-display text-sm font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                {course.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-primary text-primary" />{course.rating}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students}</span>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-3">
                <span className="px-2 py-0.5 rounded-full bg-muted/20">{course.level}</span>
                <span className="px-2 py-0.5 rounded-full bg-muted/20">{course.duration}</span>
              </div>

              <button className={`w-full py-2 rounded-lg text-xs font-display tracking-wide ${isBlue ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-accent/10 text-accent hover:bg-accent/20"} transition-colors`}>
                Access Course
              </button>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">No courses found for this filter.</div>
      )}

      {/* Email Access Modal */}
      <AnimatePresence>
        {accessCourse && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm"
            onClick={resetAccess}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-strong rounded-2xl p-6 max-w-md w-full glow-blue relative" onClick={e => e.stopPropagation()}>
              <button onClick={resetAccess} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer">
                <X className="w-4 h-4" />
              </button>

              {!sent ? (
                <>
                  <h3 className="font-display text-lg font-bold text-foreground mb-1">{accessCourse.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6">Enter your registered email to access this course.</p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground font-display mb-1 block">Registered Email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(190,100%,50%,0.1)] transition-all" />
                      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
                    </div>
                    <button onClick={handleSendLink} disabled={sending}
                      className="w-full py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 font-display text-sm tracking-wide hover:bg-primary/20 transition-all cursor-pointer glow-blue disabled:opacity-50 flex items-center justify-center gap-2">
                      {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Access Link</>}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">Access Link Sent!</h3>
                  <p className="text-sm text-muted-foreground mb-1">Access link sent to your registered email.</p>
                  <p className="text-xs text-primary">Check your inbox to start learning.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesTab;
