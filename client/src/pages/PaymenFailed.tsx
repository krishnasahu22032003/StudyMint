import { useEffect } from "react";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getUserDetails from "../lib/getuserdetails";

const easeOut = [0.22, 1, 0.36, 1] as const;

function PaymentFailed() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails(dispatch);

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
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
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/10" />

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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                <XCircle className="h-10 w-10 text-red-500" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-text-primary"
            >
              Payment Failed
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-3 text-sm leading-relaxed text-text-secondary"
            >
              We couldn't process your payment. No amount has been charged.
              Please try again or choose another payment method.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 rounded-xl border border-border bg-surface-secondary px-4 py-3 text-xs text-text-tertiary"
            >
              Redirecting to home in 5 seconds...
            </motion.div>

            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
              <button
                onClick={() => navigate("/pricing")}
                className="flex-1 cursor-pointer rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
              >
                <span className="flex items-center justify-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </span>
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 cursor-pointer rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent/30"
              >
                <span className="flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Go Home
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentFailed;