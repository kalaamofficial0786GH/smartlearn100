import { useState, useRef, useEffect } from "react";
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

/* ───────── OTP input ───────── */
const OTPInput = ({
  length = 6,
  value,
  onChange,
  error,
}: {
  length?: number;
  value: string;
  onChange: (v: string) => void;
  error: boolean;
}) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const arr = value.split("");
    arr[i] = char;
    const next = arr.join("").slice(0, length);
    onChange(next);
    if (char && i < length - 1) refs.current[i + 1]?.focus();
  };

  const handleKey = (i: number, key: string) => {
    if (key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <motion.div
      className="flex gap-3 justify-center"
      animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e.key)}
          className={`w-12 h-14 text-center text-xl font-display rounded-lg bg-muted/40 border-2 outline-none transition-all duration-300 ${
            error
              ? "border-destructive glow-text-violet"
              : "border-border focus:border-primary focus:shadow-[0_0_15px_hsl(var(--neon-blue)/0.4)]"
          }`}
        />
      ))}
    </motion.div>
  );
};

/* ───────── main page ───────── */
const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState<"form" | "sending" | "otp" | "verifying" | "success">("form");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [formError, setFormError] = useState("");

  /* countdown timer */
  useEffect(() => {
    if (step !== "otp") return;
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [step, countdown]);

  const handleSendOtp = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setFormError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters");
      return;
    }
    setFormError("");
    setStep("sending");
    setTimeout(() => {
      setStep("otp");
      setCountdown(60);
    }, 2000);
  };

  const handleVerify = () => {
    if (otp.length < 6) return;
    if (otp === "123456") {
      setOtpError(false);
      setStep("verifying");
      setTimeout(() => setStep("success"), 1800);
      setTimeout(() => navigate("/"), 4000);
    } else {
      setOtpError(true);
      setTimeout(() => setOtpError(false), 1200);
    }
  };

  const resendOtp = () => {
    if (countdown > 0) return;
    setCountdown(60);
    setOtp("");
  };

  return (
    <div className="relative min-h-screen bg-background grid-floor overflow-hidden flex items-center justify-center">
      <ParticleField />
      <FloatingCodeLines />
      <MouseGlow />
      <AiLightSweep />

      <div className="relative z-10 w-full max-w-md px-4">
        <AnimatePresence mode="wait">
          {/* ── form / sending / otp ── */}
          {(step === "form" || step === "sending" || step === "otp") && (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-strong rounded-2xl p-8 neon-border"
              style={{ perspective: 800 }}
            >
              {/* heading */}
              <h1 className="text-2xl font-display text-gradient text-center mb-1">
                Join SmartLearn
              </h1>
              <p className="text-muted-foreground text-center text-sm mb-6">
                100% Free Coding Universe
              </p>

              {/* inputs */}
              <div className="space-y-5">
                <NeonInput label="Full Name" value={name} onChange={setName} />
                <NeonInput label="Email Address" type="email" value={email} onChange={setEmail} />
                <NeonInput label="Password" type="password" value={password} onChange={setPassword} />
                <NeonInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                />
              </div>

              {formError && (
                <p className="text-destructive text-xs mt-3 text-center">{formError}</p>
              )}

              {/* send otp button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSendOtp}
                disabled={step === "sending"}
                className="mt-6 w-full py-3 rounded-xl font-display text-sm bg-primary text-primary-foreground glow-blue transition-all duration-400 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {step === "sending" ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="inline-block w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                    Sending OTP…
                  </>
                ) : (
                  "Send OTP"
                )}
              </motion.button>

              {/* otp panel */}
              <AnimatePresence>
                {step === "otp" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-border space-y-4">
                      <p className="text-center text-sm text-foreground">
                        Enter the 6-digit code sent to{" "}
                        <span className="text-primary">{email}</span>
                      </p>

                      <OTPInput value={otp} onChange={setOtp} error={otpError} />

                      {otpError && (
                        <p className="text-destructive text-xs text-center">
                          Invalid OTP – Please try again
                        </p>
                      )}

                      <div className="text-center text-xs text-muted-foreground">
                        {countdown > 0 ? (
                          <span>Resend in {countdown}s</span>
                        ) : (
                          <button onClick={resendOtp} className="text-primary hover:underline">
                            Resend OTP
                          </button>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleVerify}
                        className="w-full py-3 rounded-xl font-display text-sm bg-secondary text-secondary-foreground glow-violet transition-all duration-300"
                      >
                        Verify &amp; Create Account
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* footer link */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
              </p>
            </motion.div>
          )}

          {/* ── verifying spinner ── */}
          {step === "verifying" && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.div
                className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
              <p className="text-primary font-display text-lg glow-text-blue">Verifying…</p>
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
                className="text-6xl"
              >
                ✅
              </motion.div>
              <h2 className="text-2xl font-display text-gradient">Email Verified Successfully</h2>
              <p className="text-muted-foreground text-sm">
                Welcome to SmartLearn Free Coding Universe
              </p>
              <p className="text-xs text-muted-foreground animate-pulse">
                Entering universe…
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignUp;
