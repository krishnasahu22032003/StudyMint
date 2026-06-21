import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, LogOut, Plus, Gem, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface DashboardHeaderProps {
  userName: string;
  credits: number;
  onSignOut: () => void;
  onBuyCredits?: () => void;
}

const Logo = () => (
  <a href="/" className="relative flex items-center gap-3 group shrink-0">
    <span className="absolute -left-3 -top-3 w-14 h-14 rounded-full bg-gold/20 blur-2xl opacity-0 scale-75 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110" />
    <span className="relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 rounded-2xl bg-surface border border-border/80 backdrop-blur-xl shadow-soft overflow-hidden transition-all duration-500 group-hover:scale-105 group-hover:border-accent/40">
      <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6 lg:w-7 lg:h-7 transition-transform duration-700 group-hover:rotate-6">
        <defs>
          <linearGradient id="studymintDashGradient" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
        <path
          d="M28.5 8C24 8 20 10.8 20 15C20 19.2 24 20.5 28 22C31.5 23.3 34 24.5 34 28.2C34 32 30.5 34 25.5 34C21.5 34 18 32.5 15.5 29.5"
          stroke="url(#studymintDashGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M11.5 32C16 32 20 29.2 20 25C20 20.8 16 19.5 12 18C8.5 16.7 6 15.5 6 11.8C6 8 9.5 6 14.5 6C18.5 6 22 7.5 24.5 10.5"
          stroke="url(#studymintDashGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="14" cy="8" r="2" fill="var(--gold)" className="transition-all duration-500 group-hover:scale-125" />
        <circle cx="26" cy="32" r="2" fill="var(--accent)" className="transition-all duration-500 group-hover:scale-125" />
      </svg>
    </span>
    <div className="hidden sm:flex items-baseline">
      <span className="font-display text-[20px] lg:text-[22px] font-bold tracking-tight text-text-primary">Study</span>
      <span className="font-display text-[20px] lg:text-[22px] font-bold tracking-tight bg-gradient-to-r from-[var(--accent)] to-[var(--gold)] bg-clip-text text-transparent">
        Mint
      </span>
    </div>
  </a>
);

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={[
        "relative cursor-pointer w-10 h-10 rounded-full border border-border/80 bg-surface shadow-soft flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors duration-200 overflow-hidden",
        className,
      ].join(" ")}
    >
      <Sun
        className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === "dark" ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
        }`}
      />
    </button>
  );
};

const CreditsPill = ({ credits, onBuyCredits }: { credits: number; onBuyCredits?: () => void }) => (
  <motion.button
    onClick={onBuyCredits}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    className="relative flex items-center gap-2.5 pl-3.5 pr-2 py-2 rounded-full bg-surface border border-border/80 shadow-soft cursor-pointer overflow-hidden group transition-colors duration-300 hover:border-gold/50"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <Gem className="relative w-4 h-4 text-gold transition-transform duration-500 group-hover:rotate-12" strokeWidth={2} />
    <span className="relative font-mono text-[13px] font-semibold text-text-primary tabular-nums">
      {credits.toLocaleString()}
    </span>
    <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--gold)] transition-transform duration-300 group-hover:rotate-90">
      <Plus className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
    </span>
  </motion.button>
);

const SignOutControl = ({ userName, onSignOut }: { userName: string; onSignOut: () => void }) => {
  const initial = userName?.trim()?.charAt(0)?.toUpperCase() || "U";
  return (
    <button
      onClick={onSignOut}
      className="relative flex items-center h-10 pl-1 pr-1 rounded-full bg-surface border border-border/80 shadow-soft cursor-pointer overflow-hidden group transition-all duration-300 hover:border-red-400/40 hover:pr-3.5"
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)]/80 to-[var(--gold)]/80 text-white text-[13px] font-semibold font-display shrink-0">
        {initial}
      </span>
      <span className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
        <span className="overflow-hidden flex items-center">
          <span className="flex items-center gap-1.5 pl-2 text-[13px] font-medium text-text-secondary group-hover:text-red-500 whitespace-nowrap transition-colors duration-300">
            <LogOut className="w-3.5 h-3.5" strokeWidth={2} />
            Sign out
          </span>
        </span>
      </span>
    </button>
  );
};

const DashboardHeader = ({ userName, credits, onSignOut, onBuyCredits }: DashboardHeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const initial = userName?.trim()?.charAt(0)?.toUpperCase() || "U";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open ? "glass border-b border-border shadow-soft" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          <div className="hidden md:flex items-center gap-3">
            <CreditsPill credits={credits} onBuyCredits={onBuyCredits} />
            <ThemeToggle />
            <SignOutControl userName={userName} onSignOut={onSignOut} />
          </div>

          <div className="md:hidden" ref={menuRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="relative flex items-center gap-2 pl-1.5 pr-3 h-10 rounded-full bg-surface border border-border/80 shadow-soft text-text-primary transition-colors duration-200 hover:border-accent/40"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--gold)] text-white text-[12px] font-semibold font-display">
                {initial}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-text-secondary transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="absolute right-5 sm:right-6 top-[4.25rem] w-72 rounded-2xl bg-surface border border-border/80 shadow-soft backdrop-blur-2xl overflow-hidden"
                >
                  <motion.div variants={itemVariants} className="flex items-center gap-3 px-5 py-4 border-b border-border/70">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--gold)] text-white text-[14px] font-semibold font-display">
                      {initial}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-display text-[15px] font-semibold text-text-primary leading-tight">
                        {userName}
                      </span>
                      <span className="text-[12px] text-text-secondary">Signed in</span>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="px-5 py-4 border-b border-border/70">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[12px] font-medium uppercase tracking-wide text-text-secondary">
                        Credits
                      </span>
                      <span className="flex items-center gap-1.5 font-mono text-[14px] font-semibold text-text-primary tabular-nums">
                        <Gem className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
                        {credits.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setOpen(false);
                        onBuyCredits?.();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--gold)] text-white text-[13px] font-semibold transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                      Buy more credits
                    </button>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between px-5 py-4 border-b border-border/70"
                  >
                    <span className="text-[13px] font-medium text-text-primary">Theme</span>
                    <button
                      onClick={toggleTheme}
                      aria-label="Toggle theme"
                      className="relative w-9 h-9 rounded-full border border-border/80 bg-background flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors duration-200 overflow-hidden"
                    >
                      <Sun
                        className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                          theme === "dark" ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                        }`}
                      />
                      <Moon
                        className={`absolute w-4 h-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                          theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
                        }`}
                      />
                    </button>
                  </motion.div>

                  <motion.button
                    variants={itemVariants}
                    onClick={() => {
                      setOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2.5 px-5 py-4 text-[13px] font-medium text-red-500 transition-colors duration-200 hover:bg-red-500/5"
                  >
                    <LogOut className="w-4 h-4" strokeWidth={2} />
                    Sign out
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;