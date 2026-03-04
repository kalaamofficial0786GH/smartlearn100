import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, Zap, Send, CheckCircle, Loader2, X } from "lucide-react";
import { useState } from "react";
import { courses } from "@/components/CourseUniverse";

const CoursesTab = () => {
  const [accessCourse, setAccessCourse] = useState<typeof courses[0] | null>(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendLink = () => {
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 2000);
  };

  const resetAccess = () => {
    setAccessCourse(null);
    setEmail("");
    setSending(false);
    setSent(false);
    setError("");
  };

  const categories = [...new Set(courses.map((c) => c.category))];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-2">Course Universe</h2>
        <p className="text-muted-foreground text-sm">All courses are 100% FREE — forever.</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span key={cat} className="px-3 py-1 rounded-full text-[10px] font-display tracking-wide bg-primary/10 text-primary border border-primary/20">
            {cat}
          </span>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, i) => {
          const isBlue = course.color === "neon-blue";
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className={`glass rounded-xl p-5 ${isBlue ? "hover:shadow-[0_0_30px_hsl(190,100%,50%,0.15)]" : "hover:shadow-[0_0_30px_hsl(263,84%,52%,0.15)]"} transition-all duration-400 group cursor-pointer`}
              onClick={() => setAccessCourse(course)}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${isBlue ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
                  {course.category}
                </span>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 border border-primary/30">
                  <Zap className="w-2.5 h-2.5 text-primary" />
                  <span className="text-[9px] font-display font-bold text-primary">FREE</span>
                </div>
              </div>

              <h3 className="font-display text-sm font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                {course.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-primary text-primary" />
                  {course.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {course.students}
                </span>
              </div>

              <button className={`mt-4 w-full py-2 rounded-lg text-xs font-display tracking-wide ${isBlue ? "bg-primary/10 text-primary hover:bg-primary/20" : "bg-accent/10 text-accent hover:bg-accent/20"} transition-colors`}>
                Access Course
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Email Access Modal */}
      <AnimatePresence>
        {accessCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm"
            onClick={resetAccess}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-strong rounded-2xl p-6 max-w-md w-full glow-blue relative"
              onClick={(e) => e.stopPropagation()}
            >
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
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(190,100%,50%,0.1)] transition-all"
                      />
                      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
                    </div>

                    <button
                      onClick={handleSendLink}
                      disabled={sending}
                      className="w-full py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 font-display text-sm tracking-wide hover:bg-primary/20 transition-all cursor-pointer glow-blue disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {sending ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Access Link</>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
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
