import { motion } from "framer-motion";
import { BookOpen, CircleHelp, Flame, Pin } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut, delay: i * 0.06 },
  }),
};

type SidebarProps = {
  result: any;
};

const priorityMeta: Record<string, { label: string; color: string; bg: string }> = {
  "⭐": { label: "Low", color: "text-text-secondary", bg: "bg-surface-secondary" },
  "⭐⭐": { label: "Medium", color: "text-gold", bg: "bg-gold-soft" },
  "⭐⭐⭐": { label: "High", color: "text-accent", bg: "bg-accent-soft" },
};

function Sidebar({ result }: SidebarProps) {
  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  ) {
    return null;
  }

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft flex-shrink-0">
          <Pin className="h-4 w-4 text-accent" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Quick Exam View</h3>
          <p className="text-[11px] text-text-tertiary mt-0.5">Key topics & questions</p>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-accent" />
          <p className="text-xs font-semibold text-text-primary uppercase tracking-wider">Priority Topics</p>
        </div>
        {Object.entries(result.subTopics).map(([star, topics], sectionIndex) => {
          const meta = priorityMeta[star] ?? { label: star, color: "text-accent", bg: "bg-accent-soft" };
          return (
            <motion.div
              key={star}
              custom={sectionIndex}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="rounded-2xl border border-border bg-bg p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${meta.color} ${meta.bg}`}>
                  {meta.label} priority
                </span>
              </div>
              <ul className="space-y-2">
                {(topics as string[]).map((topic, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </section>

      <motion.section
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="rounded-2xl border border-gold/20 bg-gold-soft p-4"
      >
        <div className="flex items-center gap-2 mb-2.5">
          <Flame className="w-3.5 h-3.5 text-gold" />
          <p className="text-xs font-semibold text-text-primary">Exam Importance</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-surface border border-gold/20 px-3 py-1 text-xs font-semibold text-gold">
          {result.importance}
        </span>
      </motion.section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <CircleHelp className="w-3.5 h-3.5 text-accent" />
          <p className="text-xs font-semibold text-text-primary uppercase tracking-wider">Important Questions</p>
        </div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="rounded-2xl border border-border bg-bg p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary mb-3">Short Answer</p>
          <ul className="space-y-2.5">
            {result.questions.short.map((q: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 shrink-0" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="rounded-2xl border border-border bg-bg p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary mb-3">Long Answer</p>
          <ul className="space-y-2.5">
            {result.questions.long.map((q: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/60 shrink-0" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {result.questions.diagram && (
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="rounded-2xl border border-border bg-bg p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary mb-3">Diagram Question</p>
            <p className="text-xs text-text-secondary leading-relaxed">{result.questions.diagram}</p>
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default Sidebar;