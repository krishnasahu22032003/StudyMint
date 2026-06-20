import { motion, type Variants } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import handleGoogleAuth from "../../utils/handlegoogleauth";

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
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easeOut,
    },
  },
};

const CTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 ink-grid opacity-50 [mask-image:radial-gradient(circle_at_center,black,transparent)]" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-accent/5 blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
        >
          <motion.div
            variants={fadeUp}
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-border
              bg-surface
              shadow-elevated
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-gold/[0.04]" />

            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

            <div className="relative px-8 py-14 sm:px-12 sm:py-16 lg:px-16 lg:py-18 text-center">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-secondary px-4 py-1.5 shadow-soft"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="text-xs font-medium text-text-secondary">
                  Start learning smarter
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="
                  mt-6
                  font-display
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-semibold
                  tracking-tight
                  leading-tight
                "
              >
                <span className="block text-text-primary">
                  Let AI handle your notes.
                </span>

                <span className="block mt-2 text-gradient-accent">
                  Focus on learning.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="
                  mt-5
                  max-w-xl
                  mx-auto
                  text-sm
                  sm:text-base
                  leading-relaxed
                  text-text-secondary
                "
              >
                Generate structured notes from lectures, PDFs, and study
                materials in seconds with StudyMint.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex justify-center"
              >
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  className="min-w-[220px] cursor-pointer"
                  onClick={handleGoogleAuth}
                >
                  Get Started Free
                </Button>
              </motion.div>
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;