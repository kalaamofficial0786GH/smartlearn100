import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type Mode = "login" | "signup";
type Stage = "form" | "sending" | "otp" | "verifying" | "success" | "authenticating";

interface AuthModalProps {
  mode: Mode;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

const AuthModal = ({ mode, onClose, onSuccess }: AuthModalProps) => {
  const [currentMode, setCurrentMode] = useState<Mode>(mode);
  const [stage, setStage] = useState<Stage>("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);

  const startOtpTimer = () => {
    setOtpTimer(60);
    const interval = setInterval(() => {
      setOtpTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const handleSignUp = () => {
    setError("");
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("All fields are required"); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format"); return;
    }
    if (password.length < 6) { setError("Password must be 6+ characters"); return; }
    if (password !== confirmPassword) { setError("Passwords don't match"); return; }

    setStage("sending");
    setTimeout(() => { setStage("otp"); startOtpTimer(); }, 2000);
  };

  const handleOtp = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
    if (newOtp.every((d) => d) && newOtp.join("") === "123456") {
      setError("");
      setStage("verifying");
      setTimeout(() => {
        setStage("success");
        setTimeout(() => onSuccess(email), 1500);
      }, 1500);
    } else if (newOtp.every((d) => d) && newOtp.join("") !== "123456") {
      setError("Invalid OTP — Please try again");
      setTimeout(() => { setOtp(["", "", "", "", "", ""]); setError(""); document.getElementById("otp-0")?.focus(); }, 1200);
    }
  };

  const handleLogin = () => {
    setError("");
    if (!email.trim() || !password) { setError("All fields are required"); return; }
    setStage("authenticating");
    setTimeout(() => {
      setStage("success");
      setTimeout(() => onSuccess(email), 1200);
    }, 2000);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_hsl(190,100%,50%,0.1)] transition-all";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-background/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-strong rounded-2xl p-8 max-w-md w-full glow-blue relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer">
          <X className="w-4 h-4" />
        </button>

        <AnimatePresence mode="wait">
          {/* FORM STAGE */}
          {stage === "form" && (
            <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <h2 className="font-display text-xl font-bold text-gradient mb-1">
                {currentMode === "signup" ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {currentMode === "signup" ? "Join SmartLearn — 100% Free Coding Academy" : "Login to your SmartLearn account"}
              </p>

              <div className="space-y-3">
                {currentMode === "signup" && (
                  <div>
                    <label className="text-xs text-muted-foreground font-display mb-1 block">Full Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputClass} />
                  </div>
                )}
                <div>
                  <label className="text-xs text-muted-foreground font-display mb-1 block">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
                </div>
                <div className="relative">
                  <label className="text-xs text-muted-foreground font-display mb-1 block">Password</label>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-muted-foreground cursor-pointer">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {currentMode === "signup" && (
                  <div>
                    <label className="text-xs text-muted-foreground font-display mb-1 block">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
                  </div>
                )}

                {error && (
                  <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-destructive">
                    {error}
                  </motion.p>
                )}

                <button
                  onClick={currentMode === "signup" ? handleSignUp : handleLogin}
                  className="w-full py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 font-display text-sm tracking-wide hover:bg-primary/20 transition-all cursor-pointer glow-blue mt-2"
                >
                  {currentMode === "signup" ? "Send OTP" : "Login"}
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-4">
                {currentMode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  onClick={() => { setCurrentMode(currentMode === "signup" ? "login" : "signup"); setError(""); }}
                  className="text-primary cursor-pointer hover:underline"
                >
                  {currentMode === "signup" ? "Login" : "Sign Up"}
                </button>
              </p>
            </motion.div>
          )}

          {/* SENDING OTP */}
          {stage === "sending" && (
            <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
              <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
              <p className="text-sm text-foreground font-display">Sending OTP to your email...</p>
              <p className="text-xs text-muted-foreground mt-1">{email}</p>
            </motion.div>
          )}

          {/* OTP INPUT */}
          {stage === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="font-display text-lg font-bold text-foreground mb-1">Verify Your Email</h2>
              <p className="text-sm text-muted-foreground mb-6">Enter the 6-digit OTP sent to {email}</p>

              <div className="flex gap-2 justify-center mb-4">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtp(i, e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Backspace" && !digit && i > 0) document.getElementById(`otp-${i - 1}`)?.focus(); }}
                    className={`w-12 h-14 text-center text-lg font-display font-bold rounded-xl bg-muted/50 border ${error ? "border-destructive/50 animate-[shake_0.3s_ease-in-out]" : "border-border focus:border-primary/50"} text-foreground focus:outline-none focus:shadow-[0_0_20px_hsl(190,100%,50%,0.15)] transition-all`}
                  />
                ))}
              </div>

              {error && <p className="text-xs text-destructive text-center mb-3">{error}</p>}

              <p className="text-xs text-muted-foreground text-center">
                {otpTimer > 0 ? `Resend in ${otpTimer}s` : (
                  <button onClick={() => { startOtpTimer(); }} className="text-primary cursor-pointer hover:underline">Resend OTP</button>
                )}
              </p>
              <p className="text-[10px] text-muted-foreground text-center mt-3">Demo OTP: 123456</p>
            </motion.div>
          )}

          {/* VERIFYING / AUTHENTICATING */}
          {(stage === "verifying" || stage === "authenticating") && (
            <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
              <div className="w-16 h-16 rounded-full border-2 border-primary/30 mx-auto mb-4 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              </div>
              <p className="text-sm text-foreground font-display">{stage === "verifying" ? "Verifying..." : "Authenticating..."}</p>
            </motion.div>
          )}

          {/* SUCCESS */}
          {stage === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" />
              </motion.div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">
                {currentMode === "signup" ? "Email Verified Successfully" : "Access Granted"}
              </h3>
              <p className="text-sm text-primary">Welcome to SmartLearn Free Coding Universe</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
