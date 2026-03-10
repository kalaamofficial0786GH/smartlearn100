import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BookOpen, LayoutDashboard, Info, Phone, GraduationCap, LogOut, User, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type TabId = "courses" | "dashboard" | "about" | "contact" | "college" | null;

interface NavbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onSignUp: () => void;
  onLogin: () => void;
  user: { email: string } | null;
  onLogout: () => void;
}

const navItems: { id: TabId; label: string; icon: React.ReactNode; tooltip: string }[] = [
  { id: "courses", label: "Courses", icon: <BookOpen className="w-4 h-4" />, tooltip: "Explore free coding courses" },
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, tooltip: "Track your learning journey" },
  { id: "about", label: "About", icon: <Info className="w-4 h-4" />, tooltip: "Discover SmartLearn mission" },
  { id: "contact", label: "Contact", icon: <Phone className="w-4 h-4" />, tooltip: "Connect with our team" },
  { id: "college", label: "Al-Ameen Polytechnic", icon: <GraduationCap className="w-4 h-4" />, tooltip: "Our partner institution" },
];

const Navbar = ({ activeTab, onTabChange, onSignUp, onLogin, user, onLogout }: NavbarProps) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="max-w-7xl mx-auto glass-strong rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between gap-2">
        {/* Logo */}
        <button
          onClick={() => onTabChange(null)}
          className="font-display text-sm md:text-base font-bold text-gradient shrink-0 cursor-pointer"
        >
          SmartLearn
        </button>

        {/* Nav Items */}
        <TooltipProvider delayDuration={200}>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onTabChange(activeTab === item.id ? null : item.id)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer ${
                      activeTab === item.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.icon}
                    <span className="font-display tracking-wide">{item.label}</span>
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                        style={{ zIndex: -1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="glass-strong border-primary/20 text-xs font-body text-muted-foreground tracking-wide px-4 py-2"
                  style={{
                    boxShadow: "0 0 15px hsl(var(--neon-blue) / 0.2), 0 4px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  {item.tooltip}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        {/* Mobile menu */}
        <div className="flex lg:hidden items-center gap-1 overflow-x-auto scrollbar-none">
          {navItems.slice(0, 3).map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(activeTab === item.id ? null : item.id)}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeTab === item.id ? "text-primary bg-primary/10" : "text-muted-foreground"
              }`}
            >
              {item.icon}
              <span className="font-display">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => onTabChange(activeTab === "contact" ? null : "contact")}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${activeTab === "contact" ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => onTabChange(activeTab === "college" ? null : "college")}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${activeTab === "college" ? "text-primary bg-primary/10" : "text-muted-foreground"}`}
          >
            <GraduationCap className="w-4 h-4" />
          </button>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-2 shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass text-xs cursor-pointer hover:border-primary/30 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <User className="w-3 h-3 text-primary" />
                </div>
                <span className="hidden md:inline text-muted-foreground font-body text-[11px] max-w-[120px] truncate">
                  {user.email}
                </span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 glass-strong rounded-xl p-2 min-w-[180px]"
                  >
                    <p className="text-[10px] text-muted-foreground px-3 py-1 font-body truncate">{user.email}</p>
                    <button
                      onClick={() => { onLogout(); setProfileOpen(false); }}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="px-4 py-2 rounded-xl text-xs font-display tracking-wide text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={onSignUp}
                className="px-4 py-2 rounded-xl text-xs font-display tracking-wide bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer glow-blue"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
