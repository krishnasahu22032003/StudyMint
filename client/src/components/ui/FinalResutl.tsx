import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  BookOpen,
  FileText,
  Zap,
  Download,
  GitBranch,
  ChartColumn,
  CircleHelp,
} from "lucide-react";
import Button from "./Button";
import MermaidSetup from "./MermaidSetup";
import RechartSetUp from "./RechartSetUp";
import { downloadPdf } from "../../lib/downloadPdf";

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

type ChartData = {
  name: string;
  value: number;
};

type Chart = {
  type: "bar" | "line" | "pie";
  title: string;
  data: ChartData[];
};

type NotesResult = {
  subTopics: SubTopics;
  importance: string;
  notes: string;
  revisionPoints: string[];
  questions: Questions;
  diagram: {
    type: string;
    data: string;
  };
  charts: Chart[];
};

type FinalResultProps = {
  result: NotesResult;
};

const markDownComponent = {
  h1: ({ children }: any) => (
    <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4">
      {children}
    </h1>
  ),

  h2: ({ children }: any) => (
    <h2 className="text-2xl font-semibold text-text-primary mt-6 mb-3">
      {children}
    </h2>
  ),

  h3: ({ children }: any) => (
    <h3 className="text-xl font-semibold text-text-primary mt-5 mb-2">
      {children}
    </h3>
  ),

  p: ({ children }: any) => (
    <p className="text-text-secondary leading-relaxed mb-4">
      {children}
    </p>
  ),

  ul: ({ children }: any) => (
    <ul className="list-disc ml-6 space-y-2 text-text-secondary">
      {children}
    </ul>
  ),

  li: ({ children }: any) => (
    <li>{children}</li>
  ),
};

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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">
            Generated Notes
          </h2>

          <p className="mt-2 text-text-secondary">
            Review, revise and export your AI-generated study material.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant={quickRevision ? "primary" : "secondary"}
            size="md"
            icon={Zap}
            onClick={() => setQuickRevision(!quickRevision)}
          >
            {quickRevision
              ? "Exit Revision Mode"
              : "Quick Revision (5 min)"}
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={Download}
            onClick={() => downloadPdf(result)}
          >
            Download PDF
          </Button>
        </div>
      </div>

      {!quickRevision && (
        <section>
          <SectionHeader
            icon={BookOpen}
            title="Sub Topics"
          />

          <div className="space-y-4">
            {Object.entries(result.subTopics).map(
              ([star, topics]) => (
                <div
                  key={star}
                  className="
                    rounded-2xl
                    border
                    border-border
                    bg-surface
                    p-5
                    shadow-soft
                  "
                >
                  <p className="font-semibold text-accent mb-3">
                    {star} Priority
                  </p>

                  <ul className="space-y-2">
                    {topics.map((topic, index) => (
                      <li
                        key={index}
                        className="
                          flex
                          items-start
                          gap-2
                          text-sm
                          text-text-secondary
                        "
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {!quickRevision && (
        <section>
          <SectionHeader
            icon={FileText}
            title="Detailed Notes"
          />

          <div
            className="
              rounded-3xl
              border
              border-border
              bg-surface
              p-6 md:p-8
              shadow-soft
            "
          >
            <ReactMarkdown components={markDownComponent}>
              {result.notes}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {quickRevision && (
        <section
          className="
            rounded-3xl
            border
            border-border
            bg-accent-soft
            p-6
          "
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-5 w-5 text-accent" />

            <h3 className="font-semibold text-text-primary">
              Exam Quick Revision Points
            </h3>
          </div>

          <ul className="space-y-2">
            {result.revisionPoints.map((point, index) => (
              <li
                key={index}
                className="
                  flex
                  items-start
                  gap-2
                  text-text-secondary
                "
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {result.diagram?.data && (
        <section>
          <SectionHeader
            icon={GitBranch}
            title="Diagram"
          />

          <div
            className="
              rounded-3xl
              border
              border-border
              bg-surface
              p-6
              shadow-soft
            "
          >
            <MermaidSetup diagram={result.diagram.data} />
          </div>

          <p className="mt-3 text-sm text-text-secondary">
            Save this diagram for future revision and exam preparation.
          </p>
        </section>
      )}

      {result.charts?.length > 0 && (
        <section>
          <SectionHeader
            icon={ChartColumn}
            title="Visual Charts"
          />

          <div
            className="
              rounded-3xl
              border
              border-border
              bg-surface
              p-6
              shadow-soft
            "
          >
            <RechartSetUp charts={result.charts} />
          </div>

          <p className="mt-3 text-sm text-text-secondary">
            Save these charts for quick visual revision.
          </p>
        </section>
      )}

      {result.charts?.length === 0 && (
        <div
          className="
            rounded-2xl
            border
            border-border
            bg-surface
            p-4
            text-sm
            text-text-secondary
          "
        >
          No charts available for this topic.
        </div>
      )}

      <section>
        <SectionHeader
          icon={CircleHelp}
          title="Important Questions"
        />

        <div className="space-y-5">
          <div
            className="
              rounded-2xl
              border
              border-border
              bg-surface
              p-5
              shadow-soft
            "
          >
            <h3 className="font-semibold text-text-primary mb-3">
              Short Questions
            </h3>

            <ul className="space-y-2">
              {result.questions.short.map((question, index) => (
                <li
                  key={index}
                  className="
                    flex
                    items-start
                    gap-2
                    text-sm
                    text-text-secondary
                  "
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-border
              bg-surface
              p-5
              shadow-soft
            "
          >
            <h3 className="font-semibold text-text-primary mb-3">
              Long Questions
            </h3>

            <ul className="space-y-2">
              {result.questions.long.map((question, index) => (
                <li
                  key={index}
                  className="
                    flex
                    items-start
                    gap-2
                    text-sm
                    text-text-secondary
                  "
                >
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>

          {result.questions.diagram && (
            <div
              className="
                rounded-2xl
                border
                border-border
                bg-surface
                p-5
                shadow-soft
              "
            >
              <h3 className="font-semibold text-text-primary mb-3">
                Diagram Question
              </h3>

              <p className="text-text-secondary leading-relaxed">
                {result.questions.diagram}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: any;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft">
        <Icon className="h-5 w-5 text-accent" />
      </div>

      <h2 className="text-xl font-semibold text-text-primary">
        {title}
      </h2>
    </div>
  );
};

export default FinalResult ;