import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  Mic,
  ScanText,
  FileText,
} from "lucide-react";
import Button from "../ui/Button";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.22, delayChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: easeOut } },
};

const lineUp: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.3, ease: easeOut } },
};

type FloatCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
  floatDuration?: number;
  parallaxX?: ReturnType<typeof useSpring>;
  parallaxY?: ReturnType<typeof useSpring>;
};

const FloatCard = ({
  children,
  className = "",
  delay = 0,
  rotate = 0,
  floatDuration = 6,
  parallaxX,
  parallaxY,
}: FloatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 60, rotate: rotate * 2 }}
    whileInView={{ opacity: 1, y: 0, rotate }}
    viewport={{ once: true }}
    transition={{ duration: 1.5, delay, ease: easeOut }}
    style={{ x: parallaxX, y: parallaxY }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const spring = { stiffness: 40, damping: 20, mass: 0.6 };

  const card1X = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), spring);
  const card2X = useSpring(useTransform(mx, [-0.5, 0.5], [16, -16]), spring);
  const card3X = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), spring);
  const card4X = useSpring(useTransform(mx, [-0.5, 0.5], [12, -12]), spring);
  const orbX = useSpring(useTransform(mx, [-0.5, 0.5], [-30, 30]), spring);
  const orbY = useSpring(useTransform(my, [-0.5, 0.5], [-30, 30]), spring);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-bg pt-32 pb-24 lg:pt-40"
    >
      <div className="absolute inset-0 ink-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_30%,black,transparent)]" />

      <motion.div
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute -top-32 left-1/4 w-[32rem] h-[32rem] rounded-full bg-accent/10 blur-[120px]"
      />
      <motion.div
        style={{ x: useTransform(orbX, (v) => -v), y: useTransform(orbY, (v) => -v) }}
        className="pointer-events-none absolute top-20 right-1/4 w-[28rem] h-[28rem] rounded-full bg-gold/10 blur-[120px]"
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 mb-8 shadow-soft"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs font-medium text-text-secondary">
              AI-powered note intelligence
            </span>
          </motion.div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
            <span className="block ">
              <motion.span variants={lineUp} className="block text-text-primary">
                Capture everything.
              </motion.span>
            </span>
            <span className="block mt-1 lg:mt-2">
              <motion.span variants={lineUp} className=" text-gradient-accent">
                Forget nothing.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base sm:text-lg text-text-secondary leading-relaxed"
          >
            StudyMint turns lectures, PDFs, and scattered thoughts into clean,
            structured notes in seconds — so you spend your time learning,
            not organizing.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3"
          >
            <Button variant="primary" size="lg" icon={Sparkles} className="cursor-pointer">
              Generate your first note
            </Button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-5 text-xs text-text-tertiary">
          Get Started with 50 Free Credits
          </motion.p>
        </motion.div>
      </div>

      <FloatCard
        className="hidden lg:block left-10 top-28"
        rotate={-6}
        delay={0.6}
        floatDuration={7}
        parallaxX={card1X}
      >
        <div className="w-48 rounded-2xl bg-gold-soft border border-border p-4 shadow-elevated">
          <div className="w-2.5 h-2.5 rounded-full bg-danger/70 mb-3" />
          <p className="font-display text-sm leading-snug text-text-primary/90">
            Capture every lecture before it slips away.
          </p>
        </div>
      </FloatCard>

      <FloatCard
        className="hidden lg:block left-32 top-[16.5rem]"
        rotate={6}
        delay={0.85}
        floatDuration={6}
        parallaxX={card1X}
      >
        <div className="w-16 h-16 rounded-2xl bg-surface border border-border shadow-elevated flex items-center justify-center">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
        </div>
      </FloatCard>

      <FloatCard
        className="hidden lg:block right-10 top-28"
        rotate={4}
        delay={0.75}
        floatDuration={6.5}
        parallaxX={card2X}
      >
        <div className="w-56 rounded-2xl bg-surface border border-border p-4 shadow-elevated">
          <p className="text-xs font-semibold text-text-primary mb-3">
            Review queue
          </p>
          <div className="rounded-xl bg-surface-secondary p-3">
            <p className="text-xs font-medium text-text-primary">
              Cell Biology — Ch. 4
            </p>
            <p className="text-[11px] text-text-tertiary mt-0.5">
              Generated 3 flashcards
            </p>
            <span className="inline-block mt-2 text-[11px] font-medium text-accent bg-accent-soft px-2 py-0.5 rounded-full">
              Due today
            </span>
          </div>
        </div>
      </FloatCard>

      <FloatCard
        className="hidden lg:block left-10 bottom-16"
        rotate={-3}
        delay={1}
        floatDuration={7}
        parallaxX={card3X}
      >
        <div className="w-64 rounded-2xl bg-surface border border-border p-4 shadow-elevated">
          <p className="text-xs font-semibold text-text-primary mb-3">
            Today's notes
          </p>
          <div className="flex items-center gap-3 rounded-xl bg-surface-secondary p-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold-soft flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">
                Organic Chemistry — Lecture 6
              </p>
              <div className="h-1 w-full bg-border rounded-full mt-1.5 overflow-hidden">
                <div className="h-full w-3/4 bg-accent rounded-full" />
              </div>
            </div>
            <span className="text-[11px] font-mono text-text-tertiary">75%</span>
          </div>
        </div>
      </FloatCard>

      <FloatCard
        className="hidden lg:block right-10 bottom-16"
        rotate={4}
        delay={1.2}
        floatDuration={6}
        parallaxX={card4X}
      >
        <div className="w-56 rounded-2xl bg-surface border border-border p-4 shadow-elevated">
          <p className="text-xs font-semibold text-text-primary mb-3">
            Built for how you study
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[Mic, ScanText, FileText, Sparkles].map((Icon, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-surface-secondary border border-border flex items-center justify-center hover:bg-accent-soft hover:border-accent/30 transition-colors duration-300"
              >
                <Icon className="w-4 h-4 text-text-secondary" />
              </div>
            ))}
          </div>
        </div>
      </FloatCard>
    </section>
  );
};

export default Hero;
