import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "../components/ui/DashboardHeader";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../redux/store";
import signOutUser from "../lib/handleSignOut";
import TopicForm from "../components/ui/TopicForm";
import { useState } from "react";
import { BookOpen, Sparkles, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/ui/SideBar";
import FinalResult from "../components/ui/FinalResutl";
import type { NotesResult } from "../types/notes";

const easeOut = [0.22, 1, 0.36, 1] as const;

const NotesPage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<NotesResult | null>(null);
  const [error, setError] = useState("");
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser(dispatch, navigate);
  };

  const handleHistory = () => {
    navigate("/history");
  };

  const handleBuyCredits = () => {
    navigate("/pricing");
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-bg">
      <DashboardHeader
        userName={userData.name}
        credits={userData.credits}
        onSignOut={handleSignOut}
        onBuyCredits={handleBuyCredits}
        onHistory={handleHistory}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 mb-4 shadow-soft">
            <Wand2 className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-medium text-text-secondary">AI Note Generator</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">
            Generate your <span className="text-gradient-accent">study notes.</span>
          </h1>
          <p className="mt-2 text-sm text-text-secondary max-w-lg leading-relaxed">
            Enter a topic and customize your preferences — StudyMint will produce exam-ready notes in seconds.
          </p>
        </motion.div>

        <TopicForm
          loading={loading}
          setResult={setResult}
          setLoading={setLoading}
          setError={setError}
        />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: easeOut }}
              className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/8 px-5 py-3.5 flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              <p className="text-sm font-medium text-red-500">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!result && !loading && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
              className="mt-5"
            >
              <motion.div
                whileHover={{ y: -3, transition: { duration: 0.25, ease: easeOut } }}
                className="relative overflow-hidden h-64 rounded-3xl border border-border bg-surface shadow-soft flex flex-col items-center justify-center text-center p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-gold/5" />
                <div className="absolute -top-20 right-0 h-48 w-48 rounded-full bg-accent/8 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-gold/8 blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft">
                    <BookOpen className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">Ready to generate</h3>
                  <p className="mt-2 max-w-xs text-sm text-text-tertiary leading-relaxed">
                    Fill in your topic above and hit generate — your notes will appear here.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: easeOut }}
              className="mt-6 flex flex-col lg:grid lg:grid-cols-4 gap-6"
            >
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-3xl border border-border bg-surface shadow-soft overflow-hidden">
                  <Sidebar result={result} />
                </div>
              </div>
              <div className="lg:col-span-3 rounded-3xl border border-border bg-surface shadow-soft overflow-hidden">
                <div className="p-6 md:p-8">
                  <FinalResult result={result} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default NotesPage;