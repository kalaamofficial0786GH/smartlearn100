import { motion } from "framer-motion";
import { BookOpen, Trophy, Zap, Bell, Award, Clock } from "lucide-react";

const stats = [
  { label: "Enrolled Courses", value: "4", icon: <BookOpen className="w-5 h-5" />, color: "primary" },
  { label: "XP Points", value: "2,450", icon: <Zap className="w-5 h-5" />, color: "primary" },
  { label: "Certificates", value: "2", icon: <Award className="w-5 h-5" />, color: "accent" },
  { label: "Achievements", value: "8", icon: <Trophy className="w-5 h-5" />, color: "accent" },
];

const enrolledCourses = [
  { name: "Full Stack Web Development", progress: 72 },
  { name: "React JS Complete Course", progress: 45 },
  { name: "Python Masterclass", progress: 88 },
  { name: "Data Structures & Algorithms", progress: 30 },
];

const recentActivity = [
  { text: "Completed Module 5 — React Hooks", time: "2 hours ago" },
  { text: "Earned 'Python Pro' Badge", time: "Yesterday" },
  { text: "Submitted DSA Assignment #3", time: "2 days ago" },
  { text: "Started Flutter App Development", time: "3 days ago" },
];

const DashboardTab = ({ userEmail }: { userEmail?: string }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-gradient mb-1">
          Welcome back{userEmail ? `, ${userEmail.split("@")[0]}` : ""}!
        </h2>
        <p className="text-muted-foreground text-sm">Your learning journey at a glance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`glass rounded-xl p-4 text-center ${stat.color === "primary" ? "glow-blue" : "glow-violet"}`}
          >
            <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 ${stat.color === "primary" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"}`}>
              {stat.icon}
            </div>
            <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground font-display tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Enrolled Courses */}
      <div className="glass rounded-xl p-5">
        <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" /> Enrolled Courses
        </h3>
        <div className="space-y-4">
          {enrolledCourses.map((course, i) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-foreground font-medium">{course.name}</span>
                <span className="text-xs text-primary font-display font-bold">{course.progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="glass rounded-xl p-5">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs text-foreground">{item.text}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="glass rounded-xl p-5">
          <h3 className="font-display text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-accent" /> Notifications
          </h3>
          <div className="space-y-3">
            {[
              "New course 'AI Fundamentals' launching soon!",
              "Certificate ready for Python Masterclass",
              "Weekly coding challenge starts Monday",
            ].map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                <p className="text-xs text-foreground">{note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
