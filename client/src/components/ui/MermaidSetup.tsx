import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { GitBranch } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

const cleanMermaidChart = (diagram: string) => {
  if (!diagram) return "";

  let clean = diagram.replace(/\r\n/g, "\n").trim();

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

const autoFixNodes = (diagram: string) => {
  let index = 0;
  const used = new Map<string, string>();

  return diagram.replace(/\[(.*?)\]/g, (_, label) => {
    const key = label.trim();

    if (used.has(key)) {
      return used.get(key)!;
    }

    index++;

    const id = `N${index}`;
    const node = `${id}["${key}"]`;

    used.set(key, node);

    return node;
  });
};

type MermaidSetupProps = {
  diagram: string;
};

function MermaidSetup({ diagram }: MermaidSetupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setIsRendering(true);

        containerRef.current!.innerHTML = "";

        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        const safeChart = autoFixNodes(
          cleanMermaidChart(diagram)
        );

        const { svg } = await mermaid.render(
          uniqueId,
          safeChart
        );

        containerRef.current!.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed:", error);

        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div style="padding:16px;text-align:center;">
              Failed to render diagram
            </div>
          `;
        }
      } finally {
        setIsRendering(false);
      }
    };

    renderDiagram();
  }, [diagram]);

  if (!diagram) {
    return (
      <div
        className="
          rounded-3xl
          border
          border-border
          bg-surface
          p-10
          text-center
        "
      >
        <GitBranch className="w-10 h-10 mx-auto text-text-tertiary mb-3" />

        <p className="text-text-secondary">
          No diagram available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-surface
        shadow-soft
      "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

      <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 p-6 md:p-8">
        {isRendering && (
          <div
            className="
              flex
              items-center
              justify-center
              py-12
            "
          >
            <div
              className="
                h-8
                w-8
                rounded-full
                border-2
                border-accent/20
                border-t-accent
                animate-spin
              "
            />
          </div>
        )}

        <div
          ref={containerRef}
          className="
            overflow-x-auto
            [&>svg]:mx-auto
            [&>svg]:max-w-full
            [&>svg]:h-auto
          "
        />
      </div>
    </div>
  );
}

export default MermaidSetup;