import { BookOpen, CircleHelp, Flame, Pin } from "lucide-react";

type SidebarProps = {
  result: any;
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
    <div
      className="
        rounded-3xl
        border
        border-border
        bg-surface
        shadow-soft
        overflow-hidden
      "
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-accent-soft
            "
          >
            <Pin className="h-5 w-5 text-accent" />
          </div>

          <div>
            <h3 className="font-semibold text-text-primary">
              Quick Exam View
            </h3>

            <p className="text-xs text-text-secondary">
              Important topics and questions
            </p>
          </div>
        </div>

        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent" />

            <p className="text-sm font-semibold text-text-primary">
              Priority Topics
            </p>
          </div>

          {Object.entries(result.subTopics).map(
            ([star, topics]) => (
              <div
                key={star}
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-bg
                  p-4
                "
              >
                <p className="text-sm font-semibold text-accent mb-3">
                  {star} Priority
                </p>

                <ul className="space-y-2">
                  {(topics as string[]).map((topic, index) => (
                    <li
                      key={index}
                      className="
                        text-sm
                        text-text-secondary
                        leading-relaxed
                        flex
                        items-start
                        gap-2
                      "
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />

                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </section>

        <section
          className="
            mt-6
            rounded-2xl
            border
            border-border
            bg-bg
            p-4
          "
        >
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-accent" />

            <p className="text-sm font-semibold text-text-primary">
              Exam Importance
            </p>
          </div>

          <div
            className="
              inline-flex
              items-center
              rounded-full
              bg-accent-soft
              px-3
              py-1
              text-sm
              font-medium
              text-accent
            "
          >
            {result.importance}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <CircleHelp className="w-4 h-4 text-accent" />

            <p className="text-sm font-semibold text-text-primary">
              Important Questions
            </p>
          </div>

          <div className="space-y-4">
            <div
              className="
                rounded-2xl
                border
                border-border
                bg-bg
                p-4
              "
            >
              <p className="font-medium text-text-primary mb-3">
                Short Questions
              </p>

              <ul className="space-y-2">
                {result.questions.short.map(
                  (question: string, index: number) => (
                    <li
                      key={index}
                      className="
                        text-sm
                        text-text-secondary
                        leading-relaxed
                        flex
                        items-start
                        gap-2
                      "
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />

                      <span>{question}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-border
                bg-bg
                p-4
              "
            >
              <p className="font-medium text-text-primary mb-3">
                Long Questions
              </p>

              <ul className="space-y-2">
                {result.questions.long.map(
                  (question: string, index: number) => (
                    <li
                      key={index}
                      className="
                        text-sm
                        text-text-secondary
                        leading-relaxed
                        flex
                        items-start
                        gap-2
                      "
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />

                      <span>{question}</span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {result.questions.diagram && (
              <div
                className="
                  rounded-2xl
                  border
                  border-border
                  bg-bg
                  p-4
                "
              >
                <p className="font-medium text-text-primary mb-3">
                  Diagram Question
                </p>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {result.questions.diagram}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Sidebar;