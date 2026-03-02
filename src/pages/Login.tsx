import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import ParticleField from "@/components/ParticleField";
import FloatingCodeLines from "@/components/FloatingCodeLines";
import MouseGlow from "@/components/MouseGlow";
import AiLightSweep from "@/components/AiLightSweep";

/* ───────── floating-label input ───────── */
const NeonInput = ({
  label,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative w-full group">
      <label
        className={`absolute left-3 transition-all duration-300 pointer-events-none font-body ${
          active
            ? "top-1 text-[10px] text-primary"
            : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pt-5 pb-2 px-3 text-foreground text-sm outline-none border-b-2 border-border focus:border-primary transition-colors duration-400"
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-primary"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ originX: 0 }}
      />
    </div>
  );
};

/* ───────── main page ───────── */
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [step, setStep] = useState<"form" | "auth" | "success" | "error">("form");
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password) return;

    setStep("auth");

    /* mock: accept any non-empty credentials */
    setTimeout(() => {
      if (password.length >= 4) {
        setStep("success");
        setTimeout(() => navigate("/"), 2200);
      } else {
        setStep("error");
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setStep("form");
        }, 1800);
      }
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-background grid-floor overflow-hidden flex items-center justify-center">
      <ParticleField />
      <FloatingCodeLines />
      <MouseGlow />
      <AiLightSweep />

      <div className="relative z-10 w-full max-w-md px-4">
        <AnimatePresence mode="wait">
          {/* ── form ── */}
          {(step === "form" || step === "error") && (
            <motion.div
              key="login-card"
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={
                shake
                  ? { opacity: 1, y: 0, rotateX: 0, x: [0, -8, 8, -6, 6, 0] }
                  : { opacity: 1, y: 0, rotateX: 0 }
              }
              exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-strong rounded-2xl p-8 neon-border"
              style={{ perspective: 800 }}
            >
              <h1 className="text-2xl font-display text-gradient text-center mb-1">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-center text-sm mb-6">
                Enter your SmartLearn credentials
              </p>

              <div className="space-y-5">
                <NeonInput label="Email Address" type="email" value={email} onChange={setEmail} />
                <NeonInput label="Password" type="password" value={password} onChange={setPassword} />
              </div>

              {/* remember + forgot */}
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                  <span
                    onClick={() => setRemember(!remember)}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors duration-300 ${
                      remember ? "bg-primary border-primary" : "border-border"
                    }`}
                  >
                    {remember && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground" />
                      </svg>
                    )}
                  </span>
                  Remember me
                </label>
                <button className="text-xs text-primary hover:underline">Forgot Password?</button>
              </div>

              {step === "error" && (
                <p className="text-destructive text-xs mt-3 text-center">
                  Invalid credentials – Please try again
                </p>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogin}
                className="mt-6 w-full py-3 rounded-xl font-display text-sm bg-primary text-primary-foreground glow-blue transition-all duration-400"
              >
                Login
              </motion.button>

              <p className="text-center text-xs text-muted-foreground mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign Up Free
                </Link>
              </p>
            </motion.div>
          )}

          {/* ── authenticating ── */}
          {step === "auth" && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              {/* light sweep bar */}
              <div className="relative w-48 h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 w-1/3 bg-primary rounded-full"
                  animate={{ x: ["0%", "200%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
              </div>
              <p className="text-primary font-display text-lg glow-text-blue">Authenticating…</p>
            </motion.div>
          )}

          {/* ── success ── */}
          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center glow-blue"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-primary">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-display text-gradient">Access Granted</h2>
              <p className="text-muted-foreground text-sm">Entering SmartLearn Universe…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
