import { motion, type Variants } from "framer-motion";
import { Sparkles, Star } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
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

const testimonials = [
  {
    name: "Alex Chen",
    role: "Computer Science Student",
    quote:
      "StudyMint transformed the way I prepare for exams. What used to take hours now takes minutes, and my notes are far more organized.",
  },
  {
    name: "Sophia Patel",
    role: "Medical Student",
    quote:
      "The AI summaries are remarkably accurate. I can review complex topics faster and focus on understanding instead of formatting notes.",
  },
  {
    name: "Marcus Johnson",
    role: "Engineering Student",
    quote:
      "Uploading lecture slides and instantly getting structured notes feels like magic. This has become part of my daily workflow.",
  },
  {
    name: "Emily Rodriguez",
    role: "Graduate Researcher",
    quote:
      "StudyMint helps me process large research papers quickly. The organization and clarity are genuinely impressive.",
  },
  {
    name: "Noah Williams",
    role: "Business Student",
    quote:
      "The quality of the generated notes is exceptional. It's like having a personal study assistant available anytime.",
  },
  {
    name: "Olivia Brown",
    role: "Law Student",
    quote:
      "Clean, intuitive, and incredibly useful. StudyMint has completely changed how I approach reading-heavy courses.",
  },
];

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) => {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.6,
      }}
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
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 5 + index,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-gold text-gold"
            />
          ))}
        </div>
      </motion.div>

      <p className="relative mt-6 text-sm leading-relaxed text-text-secondary">
        "{testimonial.quote}"
      </p>

      <div className="relative mt-8 flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-soft to-gold-soft border border-border font-display font-semibold text-text-primary">
          {testimonial.name
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>

        <div>
          <h4 className="font-medium text-text-primary">
            {testimonial.name}
          </h4>

          <p className="text-xs text-text-tertiary">
            {testimonial.role}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 ink-grid opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent)]" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full bg-accent/5 blur-[160px]" />

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
                Trusted by students everywhere
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
              <span className="block text-text-primary">
                Loved by learners.
              </span>

              <span className="mt-2 text-gradient-accent">
                Built for better studying.
              </span>
            </h2>

            <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-text-secondary">
              Thousands of students use StudyMint to capture ideas, organize
              knowledge, and spend more time learning instead of managing notes.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;