import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch } from "lucide-react";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

const easeOut = [0.22, 1, 0.36, 1] as const;

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
    if (used.has(key)) return used.get(key)!;
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
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setIsRendering(true);
        setError(false);
        containerRef.current!.innerHTML = "";
        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const safeChart = autoFixNodes(cleanMermaidChart(diagram));
        const { svg } = await mermaid.render(uniqueId, safeChart);
        containerRef.current!.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid render failed:", err);
        setError(true);
      } finally {
        setIsRendering(false);
      }
    };

    renderDiagram();
  }, [diagram]);

  if (!diagram) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-secondary border border-border mb-4">
          <GitBranch className="w-5 h-5 text-text-tertiary" />
        </div>
        <p className="text-sm text-text-tertiary">No diagram available for this topic.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isRendering && (
          <motion.div
            key="spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="flex items-center justify-center gap-3 py-14"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              className="h-6 w-6 rounded-full border-2 border-border border-t-accent"
            />
            <span className="text-sm text-text-tertiary">Rendering diagram…</span>
          </motion.div>
        )}
      </AnimatePresence>

      {error && !isRendering && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 mb-4">
            <GitBranch className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-sm font-medium text-text-primary">Failed to render diagram</p>
          <p className="text-xs text-text-tertiary mt-1">The diagram syntax may be invalid.</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRendering || error ? 0 : 1 }}
        transition={{ duration: 0.5, ease: easeOut }}
        ref={containerRef}
        className="overflow-x-auto [&>svg]:mx-auto [&>svg]:max-w-full [&>svg]:h-auto"
      />
    </div>
  );
}

export default MermaidSetup;