import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  ScanText,
  FileText,
  Brain,
  Layers3,
  Wand2,
} from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
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

const features = [
  {
    icon: ScanText,
    title: "Lecture Capture",
    description:
      "Convert spoken lectures into structured notes without losing context or important details.",
  },
  {
    icon: FileText,
    title: "PDF Intelligence",
    description:
      "Upload lengthy documents and instantly generate concise, organized summaries.",
  },
  {
    icon: Brain,
    title: "Smart Understanding",
    description:
      "AI identifies key concepts, relationships, and important takeaways automatically.",
  },
  {
    icon: Layers3,
    title: "Structured Notes",
    description:
      "Transform scattered information into clean sections, headings, and study-ready formats.",
  },
  {
    icon: Wand2,
    title: "Instant Refinement",
    description:
      "Rewrite, simplify, expand, or improve notes with intelligent editing tools.",
  },
  {
    icon: Sparkles,
    title: "Study Faster",
    description:
      "Reduce review time and focus on learning instead of organizing information.",
  },
];

const FeatureCard = ({
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
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-700
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            h-40
            w-40
            -translate-x-1/2
            rounded-full
            bg-accent/10
            blur-3xl
          "
        />

        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-gold/[0.04]" />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div
          className="
            flex
            items-center
            justify-center
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-br
            from-accent-soft
            to-gold-soft
            border
            border-border
          "
        >
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

const Features = () => {
  return (
<section id="features" className="relative py-32 overflow-hidden">
  <div className="absolute inset-0 ink-grid opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent)]" />

  <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-[140px]" />

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
            Everything you need to study smarter
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
          <span className="block text-text-primary">
            Designed for focus.
          </span>

          <span className="mt-2 text-gradient-accent">
            Powered by intelligence.
          </span>
        </h2>

        <p className="mt-7 text-base sm:text-lg leading-relaxed text-text-secondary">
          StudyMint transforms lectures, PDFs, recordings, and ideas into
          beautifully organized knowledge so you can spend more time learning
          and less time managing information.
        </p>
      </motion.div>

      <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            {...feature}
          />
        ))}
      </div>
    </motion.div>
  </div>
</section>
  );
};

export default Features;