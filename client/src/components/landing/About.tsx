import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  Brain,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: easeOut,
    },
  },
};

const values = [
  {
    icon: Brain,
    title: "Knowledge First",
    description:
      "We believe learning should focus on understanding concepts, not spending hours formatting notes.",
  },
  {
    icon: Clock3,
    title: "Save Time",
    description:
      "StudyMint removes repetitive work so students can dedicate more energy to learning and retention.",
  },
  {
    icon: ShieldCheck,
    title: "Built for Reliability",
    description:
      "Every workflow is designed to create consistent, structured, and trustworthy study material.",
  },
];

const AboutCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.6 }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-surface
        p-7
        shadow-soft
        transition-all
        duration-700
        hover:shadow-elevated
      "
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-gold/[0.04]" />

        <div className="absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-soft to-gold-soft border border-border">
          <Icon className="w-5 h-5 text-accent" />
        </div>
      </motion.div>

      <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-text-primary">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 ink-grid opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent)]" />

      <div className="absolute right-0 top-1/2 w-[38rem] h-[38rem] rounded-full bg-gold/5 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div
            variants={fadeUp}
            className="flex justify-center mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-medium text-text-secondary">
                Why StudyMint exists
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              <span className="block text-text-primary">
                Built to remove friction
              </span>

              <span className="mt-2 text-gradient-accent">
                from the learning process.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-text-secondary">
              Students spend countless hours organizing notes, revisiting
              lectures, and extracting key concepts. StudyMint automates that
              process with AI, transforming information into structured
              knowledge that is easier to understand, review, and remember.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-20 rounded-[2rem] border border-border bg-surface shadow-elevated overflow-hidden"
          >
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
              <div className="p-10 text-center">
                <div className="font-display text-5xl font-semibold text-gradient-accent">
                  10×
                </div>

                <p className="mt-3 text-sm text-text-secondary">
                  Faster note creation
                </p>
              </div>

              <div className="p-10 text-center">
                <div className="font-display text-5xl font-semibold text-gradient-accent">
                  AI
                </div>

                <p className="mt-3 text-sm text-text-secondary">
                  Powered organization
                </p>
              </div>

              <div className="p-10 text-center">
                <div className="font-display text-5xl font-semibold text-gradient-accent">
                  24/7
                </div>

                <p className="mt-3 text-sm text-text-secondary">
                  Always ready to learn
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <AboutCard
                key={value.title}
                {...value}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;