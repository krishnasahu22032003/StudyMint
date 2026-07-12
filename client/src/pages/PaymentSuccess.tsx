import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Home, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getUserDetails from "../lib/getuserdetails";

const easeOut = [0.22, 1, 0.36, 1] as const;

function PaymentSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
  let attempts = 0;

  const interval = setInterval(async () => {
    await getUserDetails(dispatch);

    attempts++;

    if (attempts >= 5) {
      clearInterval(interval);

      navigate("/dashboard");
    }
  }, 1000);

  return () => clearInterval(interval);
}, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-elevated">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-accent/10" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                ease: easeOut,
              }}
              className="mb-6"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-secondary px-3 py-1.5 mb-4"
            >
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-medium text-text-secondary">
                Finalizing Your Credits
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-text-primary"
            >
              Payment Successful 🎉
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-3 text-sm leading-relaxed text-text-secondary"
            >
              Your payment has been verified successfully. We're securely finalizing your credits. This usually takes just a few seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 rounded-xl border border-border bg-surface-secondary px-4 py-3 text-xs text-text-tertiary"
            >
              Redirecting to dashboard in 5 seconds...
            </motion.div>

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-8 w-full cursor-pointer rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
            >
              <span className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Go To Dashboard
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;