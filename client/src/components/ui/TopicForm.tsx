import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import createNotes from "../../lib/createNotes";
import { useDispatch } from "react-redux";
import { updateCredits } from "../../redux/userSlice";
import type { NotesResult } from "../../types/notes";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

export type GenerateNotesParams = {
  setResult: React.Dispatch<React.SetStateAction<NotesResult | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  loading: boolean;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const TopicForm = ({ setResult, setLoading, loading, setError }: GenerateNotesParams) => {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [optionsOpen, setOptionsOpen] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit() {
   if (!topic.trim()) {
  const message = "Please enter a topic";

  setError(message);

  toast.error(message);

  return;
}
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const result = await createNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart,
      });
      console.log("FULL RESPONSE:", result);
console.log("NOTES DATA:", result.data);
      setResult(result.data);
      toast.success(
  `Notes generated successfully. ${result.creditsLeft} credits remaining`
);
      setLoading(false);
      setClassLevel("");
      setTopic("");
      setExamType("");
      setIncludeChart(false);
      setRevisionMode(false);
      setIncludeDiagram(false);
      setOptionsOpen(false);
      if (typeof result.creditsLeft === "number") {
        dispatch(updateCredits(result.creditsLeft));
      }
    } catch (error) {
      console.log(error);
      const message =error instanceof Error? error.message: "Failed to generate notes";
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 8;
      if (value >= 95) {
        value = 95;
        setProgressText("Almost done…");
        clearInterval(interval);
      } else if (value > 70) {
        setProgressText("Finalizing notes…");
      } else if (value > 40) {
        setProgressText("Processing content…");
      } else {
        setProgressText("Generating notes…");
      }
      setProgress(Math.floor(value));
    }, 700);
    return () => clearInterval(interval);
  }, [loading]);

  const inputClass = `
    w-full rounded-2xl border border-border bg-bg
    px-4 py-3.5 text-sm text-text-primary
    placeholder:text-text-tertiary
    outline-none transition-all duration-200
    focus:border-accent/50 focus:ring-4 focus:ring-accent/10
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: easeOut }}
      className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-soft mb-5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-gold/5 pointer-events-none" />
      <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Topic (e.g. Photosynthesis)"
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            disabled={loading}
            className={`${inputClass} sm:col-span-1`}
          />
          <input
            type="text"
            placeholder="Class / Level (e.g. Class 10)"
            onChange={(e) => setClassLevel(e.target.value)}
            value={classLevel}
            disabled={loading}
            className={inputClass}
          />
          <input
            type="text"
            placeholder="Exam Type (e.g. CBSE, JEE)"
            onChange={(e) => setExamType(e.target.value)}
            value={examType}
            disabled={loading}
            className={inputClass}
          />
        </div>

        <div className="rounded-2xl border border-border bg-bg overflow-hidden">
          <button
            type="button"
            onClick={() => setOptionsOpen((o) => !o)}
            disabled={loading}
            className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 disabled:opacity-50"
          >
            <span>Generation options</span>
            <motion.div
              animate={{ rotate: optionsOpen ? 180 : 0 }}
              transition={{ duration: 0.25, ease: easeOut }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {optionsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-border pt-4">
                  <ToggleCard
                    label="Exam Revision Mode"
                    description="Key points and exam-ready structure."
                    checked={revisionMode}
                    onChange={() => setRevisionMode(!revisionMode)}
                    disabled={loading}
                  />
                  <ToggleCard
                    label="Include Diagrams"
                    description="Visual diagrams for complex topics."
                    checked={includeDiagram}
                    onChange={() => setIncludeDiagram(!includeDiagram)}
                    disabled={loading}
                  />
                  <ToggleCard
                    label="Include Charts"
                    description="Data visualizations where relevant."
                    checked={includeChart}
                    onChange={() => setIncludeChart(!includeChart)}
                    disabled={loading}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileHover={!loading ? { y: -2, transition: { duration: 0.2, ease: easeOut } } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          className={`
            relative cursor-pointer w-full overflow-hidden rounded-2xl py-3.5 text-sm font-semibold
            flex items-center justify-center gap-2.5
            transition-all duration-300
            ${loading
              ? "bg-surface border border-border text-text-tertiary cursor-not-allowed"
              : "bg-accent text-white shadow-soft hover:shadow-elevated"
            }
          `}
        >
          {!loading && (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate notes</span>
            </>
          )}
          {loading && (
            <span className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 rounded-full border-2 border-text-tertiary border-t-accent"
              />
              Generating…
            </span>
          )}
        </motion.button>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: easeOut }}
              className="rounded-2xl border border-border bg-bg p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-text-primary">{progressText}</span>
                <span className="text-sm font-semibold text-accent font-mono">{progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-surface">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-accent"
                />
              </div>
              <p className="mt-4 text-center text-xs text-text-tertiary leading-relaxed">
                This may take 2–5 minutes. Please don't close or refresh the page.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

type ToggleCardProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
};

function ToggleCard({ label, description, checked, onChange, disabled }: ToggleCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onChange}
      disabled={disabled}
      whileHover={!disabled ? { y: -2, transition: { duration: 0.2 } } : {}}
      className={`
        relative rounded-2xl border p-4 text-left transition-all duration-200
        ${checked
          ? "border-accent/30 bg-accent-soft"
          : "border-border bg-surface hover:border-border-strong"
        }
        disabled:opacity-40 disabled:cursor-not-allowed
      `}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className={`text-sm font-semibold transition-colors duration-200 ${checked ? "text-accent" : "text-text-primary"}`}>
          {label}
        </span>
        <div className={`
          relative flex-shrink-0 mt-0.5 h-5 w-9 rounded-full border transition-all duration-300
          ${checked ? "border-accent/40 bg-accent-soft" : "border-border bg-surface-secondary"}
        `}>
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute top-0.5 h-3.5 w-3.5 rounded-full bg-accent shadow-sm`}
            style={{ left: checked ? "1.1rem" : "0.15rem" }}
          />
        </div>
      </div>
      <p className="text-xs text-text-tertiary leading-relaxed">{description}</p>
    </motion.button>
  );
}

export default TopicForm;