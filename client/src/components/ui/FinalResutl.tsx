import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  Zap,
  Download,
  GitBranch,
  ChartColumn,
  CircleHelp,
  X,
} from "lucide-react";
import Button from "./Button";
import MermaidSetup from "./MermaidSetup";
import RechartSetUp from "./RechartSetUp";
import { downloadPdf } from "../../lib/downloadPdf";

const easeOut = [0.22, 1, 0.36, 1] as const;

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

type SubTopics = {
  "⭐": string[];
  "⭐⭐": string[];
  "⭐⭐⭐": string[];
};

type Questions = {
  short: string[];
  long: string[];
  diagram: string;
};

type ChartData = { name: string; value: number };
type Chart = { type: "bar" | "line" | "pie"; title: string; data: ChartData[] };

type NotesResult = {
  subTopics: SubTopics;
  importance: string;
  notes: string;
  revisionPoints: string[];
  questions: Questions;
  diagram: { type: string; data: string };
  charts: Chart[];
};

type FinalResultProps = { result: NotesResult };

const priorityMeta: Record<string, { color: string; bg: string; label: string }> = {
  "⭐": { color: "text-text-secondary", bg: "bg-surface-secondary", label: "Low" },
  "⭐⭐": { color: "text-gold", bg: "bg-gold-soft", label: "Medium" },
  "⭐⭐⭐": { color: "text-accent", bg: "bg-accent-soft", label: "High" },
};

const markdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="font-display text-2xl font-semibold text-text-primary mt-8 mb-4 first:mt-0">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="font-display text-xl font-semibold text-text-primary mt-7 mb-3">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-base font-semibold text-text-primary mt-5 mb-2">{children}</h3>
  ),
  p: ({ children }: any) => (
    <p className="text-sm text-text-secondary leading-7 mb-4">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="space-y-2 ml-1 mb-4">{children}</ul>
  ),
  li: ({ children }: any) => (
    <li className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  code: ({ children }: any) => (
    <code className="font-mono text-xs bg-surface-secondary border border-border rounded px-1.5 py-0.5 text-accent">
      {children}
    </code>
  ),
};

function SectionHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft flex-shrink-0">
        <Icon className="h-4 w-4 text-accent" />
      </div>
      <h2 className="text-base font-semibold text-text-primary">{title}</h2>
    </div>
  );
}

function QuestionList({ questions }: { questions: string[] }) {
  return (
    <ul className="space-y-2.5">
      {questions.map((q, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" />
          <span>{q}</span>
        </li>
      ))}
    </ul>
  );
}

function FinalResult({ result }: FinalResultProps) {
  const [quickRevision, setQuickRevision] = useState(false);

  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long ||
    !result.revisionPoints
  ) {
    return null;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary tracking-tight">
            Generated Notes
          </h2>
          <p className="mt-1.5 text-sm text-text-tertiary">
            Review, revise, and export your AI-generated study material.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
          <motion.button
            whileHover={{ y: -1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setQuickRevision(!quickRevision)}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              quickRevision
                ? "bg-accent text-white shadow-soft"
                : "bg-surface border border-border text-text-secondary hover:text-text-primary hover:border-accent/30"
            }`}
          >
            {quickRevision ? <X className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
            {quickRevision ? "Exit revision" : "Quick revision"}
          </motion.button>
          <motion.button
            whileHover={{ y: -1, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97 }}
            onClick={() => downloadPdf(result)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-accent/90 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {quickRevision ? (
          <motion.section
            key="revision"
            variants={sectionAnim}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
            className="rounded-3xl border border-accent/20 bg-accent-soft p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Quick Revision</h3>
                <p className="text-[11px] text-text-secondary mt-0.5">Key exam points at a glance</p>
              </div>
            </div>
            <ul className="space-y-3">
              {result.revisionPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04, ease: easeOut }}
                  className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        ) : (
          <motion.div
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="space-y-10"
          >
            <motion.section variants={sectionAnim} initial="hidden" animate="show">
              <SectionHeader icon={BookOpen} title="Sub Topics" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(result.subTopics).map(([star, topics]) => {
                  const meta = priorityMeta[star] ?? { color: "text-accent", bg: "bg-accent-soft", label: star };
                  return (
                    <div key={star} className="rounded-2xl border border-border bg-surface p-4 shadow-soft">
                      <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3 ${meta.color} ${meta.bg}`}>
                        {meta.label} priority
                      </span>
                      <ul className="space-y-2">
                        {(topics as string[]).map((topic, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-accent/50 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            <motion.section variants={sectionAnim} initial="hidden" animate="show">
              <SectionHeader icon={FileText} title="Detailed Notes" />
              <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-soft">
                <ReactMarkdown components={markdownComponents}>{result.notes}</ReactMarkdown>
              </div>
            </motion.section>

            {result.diagram?.data && (
              <motion.section variants={sectionAnim} initial="hidden" animate="show">
                <SectionHeader icon={GitBranch} title="Diagram" />
                <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft overflow-x-auto">
                  <MermaidSetup diagram={result.diagram.data} />
                </div>
                <p className="mt-3 text-xs text-text-tertiary">Save this diagram for exam revision.</p>
              </motion.section>
            )}

            {result.charts?.length > 0 && (
              <motion.section variants={sectionAnim} initial="hidden" animate="show">
                <SectionHeader icon={ChartColumn} title="Visual Charts" />
                <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft">
                  <RechartSetUp charts={result.charts} />
                </div>
                <p className="mt-3 text-xs text-text-tertiary">Visual breakdown of key data points.</p>
              </motion.section>
            )}

            <motion.section variants={sectionAnim} initial="hidden" animate="show">
              <SectionHeader icon={CircleHelp} title="Important Questions" />
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary mb-4">Short Answer</p>
                  <QuestionList questions={result.questions.short} />
                </div>
                <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary mb-4">Long Answer</p>
                  <QuestionList questions={result.questions.long} />
                </div>
                {result.questions.diagram && (
                  <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary mb-4">Diagram Question</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{result.questions.diagram}</p>
                  </div>
                )}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FinalResult;