import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  FolderOpen,
  ChartNoAxesColumn,
  FileText,
} from "lucide-react";
import DashboardHeader from "../components/ui/DashboardHeader";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import signOutUser from "../lib/handleSignOut";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
    staggerChildren: 0.18,
delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.98,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const DashboardPage = () => {
  const { userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
        ? "Good afternoon"
        : "Good evening";

  const handleSignOut = async () => {
    await signOutUser(dispatch, navigate);
  };

  const handleHistory = () => {
    navigate("/history")
  };

  const handleBuyCredits = () => {
   navigate("/pricing");
  }

  if (!userData) return null;

  const firstName = userData.name?.split(" ")[0] ?? "there";

  return (
    <div className="min-h-screen bg-bg">
      <DashboardHeader
        userName={userData.name}
        credits={userData.credits}
        onSignOut={handleSignOut}
        onBuyCredits={handleBuyCredits}
        onHistory={handleHistory}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-22 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-10 lg:space-y-12"
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-3">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-none">
              {greeting},{" "}
              <span className="text-gradient-accent">
                {firstName}.
              </span>
            </h1>

            <p className="mt-4 text-base text-text-secondary">
              You have{" "}
              <span className="font-semibold text-text-primary">
                {userData.credits}
              </span>{" "}
              credits available.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
           whileHover={{
  y: -8,
}}

transition={{
  type: "spring",
  stiffness: 220,
  damping: 22,
}}
            className="
    relative
    overflow-hidden
    rounded-[2rem]
    border
    border-border
    bg-surface
    p-8
    md:p-8
shadow-soft hover:shadow-elevated will-change-transform
  "
          >
             <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
            <div className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg px-4 py-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs text-text-secondary">
                  AI Powered
                </span>
              </div>

              <h2 className="mt-4 text-3xl md:text-5xl font-display font-semibold tracking-tight text-text-primary">
                Create AI Notes
                <br />
                That Actually Help You Study
              </h2>

              <p className="mt-4 max-w-2xl text-md text-text-secondary leading-relaxed">
                Generate exam-focused notes, project documentation,
                summaries, diagrams and revision-ready content using AI.
              </p>

              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/notes")}
                className="mt-8 cursor-pointer"
              >
                Start Creating
              </Button>
            </div>
          </motion.div>
<motion.div
  variants={fadeUp}
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
>
  <motion.button
    onClick={() => navigate("/notes")}
    whileHover={{
  y: -8,
  scale: 1.02,
}}

transition={{
  type: "spring",
  stiffness: 250,
  damping: 20,
}}
    className="
      rounded-2xl
      border
      border-border
      bg-surface
      p-6
      shadow-soft
      text-left
      cursor-pointer
      hover:border-accent/30
      hover:shadow-elevated
        will-change-transform
    "
  >
    <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
      <BookOpen className="w-5 h-5 text-accent" />
    </div>

    <h3 className="font-semibold text-text-primary">
      Exam Notes
    </h3>

    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
      High-yield exam focused notes with revision points.
    </p>
  </motion.button>

  <motion.button
    onClick={() => navigate("/notes")}
   whileHover={{
  y: -8,
  scale: 1.02,
}}

transition={{
  type: "spring",
  stiffness: 250,
  damping: 20,
}}
    className="
      rounded-2xl
      border
      border-border
      bg-surface
      p-6
      shadow-soft
      text-left
      cursor-pointer
      hover:border-accent/30
      hover:shadow-elevated
        will-change-transform
    "
  >
    <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
      <FolderOpen className="w-5 h-5 text-accent" />
    </div>

    <h3 className="font-semibold text-text-primary">
      Project Notes
    </h3>

    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
      Structured content for assignments and project work.
    </p>
  </motion.button>

  <motion.button
    onClick={() => navigate("/notes")}
 whileHover={{
  y: -8,
  scale: 1.02,
}}

transition={{
  type: "spring",
  stiffness: 250,
  damping: 20,
}}
    className="
      rounded-2xl
      border
      border-border
      bg-surface
      p-6
      shadow-soft
      text-left
      cursor-pointer
      hover:border-accent/30
      hover:shadow-elevated
        will-change-transform
    "
  >
 <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
  <FileText className="w-5 h-5 text-accent" />
</div>

<h3 className="font-semibold text-text-primary">
  AI Summaries
</h3>

<p className="mt-2 text-sm text-text-secondary leading-relaxed">
  Get concise summaries that highlight the most important concepts instantly.
</p>
  </motion.button>

  <motion.button
    onClick={() => navigate("/notes")}
  whileHover={{
  y: -8,
  scale: 1.02,
}}

transition={{
  type: "spring",
  stiffness: 250,
  damping: 20,
}}
    className="
      rounded-2xl
      border
      border-border
      bg-surface
      p-6
      shadow-soft
      text-left
      cursor-pointer
      hover:border-accent/30
      hover:shadow-elevated
        will-change-transform
    "
  >
    <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
      <ChartNoAxesColumn className="w-5 h-5 text-accent" />
    </div>

    <h3 className="font-semibold text-text-primary">
      Diagrams
    </h3>

    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
      Auto-generate visual diagrams and study flows.
    </p>
  </motion.button>
</motion.div>
          <motion.div
            variants={fadeUp}
            onClick={handleBuyCredits}
             whileHover={{
    y: -6,
  }}
  transition={{
    type: "spring",
    stiffness: 220,
    damping: 20,
  }}
            className="
              cursor-pointer
              rounded-3xl
              overflow-hidden
              p-8
              hover:shadow-2xl
               will-change-transform
            "
            style={{
              background:
                "linear-gradient(135deg,var(--color-accent),var(--color-accent-dark,var(--color-accent)))",
            }}
          >
            <Sparkles className="w-6 h-6 text-white/90 mb-4" />

            <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              Need More Credits?
            </h2>

            <p className="mt-3 text-white/80 max-w-xl leading-relaxed">
              Unlock unlimited AI notes, PDF processing,
              lecture transcription and faster generations.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="mt-6 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleBuyCredits();
              }}
            >
              Upgrade Plan
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;