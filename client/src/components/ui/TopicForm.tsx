import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import createNotes from "../../lib/createNotes";
import { useDispatch } from 'react-redux';
import { updateCredits } from "../../redux/userSlice";

export type GenerateNotesParams = {
  setResult: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  loading: boolean;
};

const TopicForm = ({ setResult, setLoading, loading, setError, }: GenerateNotesParams) => {

  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
    const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
   const dispatch = useDispatch()

  async function handleSubmit() {

    if (!topic.trim()) {
      setError("Please enter the topic")
      return;
    }
    setError("")
    setLoading(true)
    setResult(null)
    try {

      const result = await createNotes({topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart})
        setResult(result.data)
        setLoading(false)
        setClassLevel("")
        setTopic("")
        setExamType("")
        setIncludeChart(false)
        setRevisionMode(false)
        setIncludeDiagram(false)

        if(typeof result.creditsLeft === "number"){
          dispatch(updateCredits(result.creditsLeft));

        }


    } catch (error) {
   console.log(error)
   setError("Failed to fetch notes from server");
      setLoading(false)
    }
  };

  useEffect(()=>{
  if(!loading){
    setProgress(0);
    setProgressText("")
    return;
  }
  let value = 0;

  const interval = setInterval(()=>{
    value += Math.random() * 8

     if (value >= 95) {
      value = 95;
      setProgressText("Almost done…");
      clearInterval(interval);
    } else if (value > 70) {
      setProgressText("Finalizing notes…");
    } else if (value > 40) {
      setProgressText("Processing content…");
    } else {
      setProgressText("Generating notes…");
    }

    setProgress(Math.floor(value))

  },700)

  return () => clearInterval(interval);


  },[loading]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
    relative
    overflow-hidden
    rounded-[2rem]
    border
    border-border
    bg-surface
    p-6
    sm:p-8
    shadow-soft
  "
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

      <div className="absolute -top-20 right-0 h-52 w-52 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10 space-y-5">
        <input
          type="text"
          placeholder="Enter topic (e.g. Web Development)"
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
          className="
        w-full
        rounded-2xl
        border
        border-border
        bg-bg
        px-4
        py-3.5
        text-text-primary
        placeholder:text-text-tertiary
        outline-none
        transition-all
        duration-200
        focus:border-accent/40
        focus:ring-4
        focus:ring-accent/10
      "
        />

        <input
          type="text"
          placeholder="Class / Level (e.g. Class 10)"
          onChange={(e) => setClassLevel(e.target.value)}
          value={classLevel}
          className="
        w-full
        rounded-2xl
        border
        border-border
        bg-bg
        px-4
        py-3.5
        text-text-primary
        placeholder:text-text-tertiary
        outline-none
        transition-all
        duration-200
        focus:border-accent/40
        focus:ring-4
        focus:ring-accent/10
      "
        />

        <input
          type="text"
          placeholder="Exam Type (e.g. CBSE, JEE, NEET)"
          onChange={(e) => setExamType(e.target.value)}
          value={examType}
          className="
        w-full
        rounded-2xl
        border
        border-border
        bg-bg
        px-4
        py-3.5
        text-text-primary
        placeholder:text-text-tertiary
        outline-none
        transition-all
        duration-200
        focus:border-accent/40
        focus:ring-4
        focus:ring-accent/10
      "
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
    relative
    overflow-hidden
    rounded-3xl
    border
    border-border
    bg-surface
    p-6
    shadow-soft
  "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

          <div className="relative z-10">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-text-primary">
                Generation Options
              </h3>

              <p className="mt-1 text-sm text-text-secondary">
                Customize how StudyMint generates your notes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="
          rounded-2xl
          border
          border-border
          bg-bg
          p-4
        "
              >
                <Toggle
                  label="Exam Revision Mode"
                  checked={revisionMode}
                  onChange={() =>
                    setRevisionMode(!revisionMode)
                  }
                />

                <p className="mt-3 text-xs text-text-secondary">
                  Focus on important concepts, key points and exam-ready material.
                </p>
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
                <Toggle
                  label="Include Diagrams"
                  checked={includeDiagram}
                  onChange={() =>
                    setIncludeDiagram(!includeDiagram)
                  }
                />

                <p className="mt-3 text-xs text-text-secondary">
                  Generate visual diagrams to simplify complex topics.
                </p>
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
                <Toggle
                  label="Include Charts"
                  checked={includeChart}
                  onChange={() =>
                    setIncludeChart(!includeChart)
                  }
                />

                <p className="mt-3 text-xs text-text-secondary">
                  Add charts and data visualizations where relevant.
                </p>
              </div>
            </div>
          </div>
          <motion.div className="mt-6">
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              whileHover={!loading ? { y: -2 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 22,
              }}
              className={`
      relative
      w-full
      overflow-hidden
      rounded-2xl
      py-3.5
      font-medium
      flex
      items-center
      justify-center
      gap-3
      transition-all
      duration-300
      ${loading
                  ? "bg-surface border border-border text-text-secondary cursor-not-allowed"
                  : "bg-accent text-white shadow-soft hover:shadow-elevated"
                }
    `}
            >
              {!loading && (
                <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
                  <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[120%] group-hover:translate-x-[420%] transition-transform duration-700" />
                </span>
              )}

              <span className="relative z-10">
                {loading ? "Generating Notes..." : "Generate Notes"}
              </span>
            </motion.button>

            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
        mt-6
        rounded-2xl
        border
        border-border
        bg-bg
        p-5
      "
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">
                    {progressText}
                  </span>

                  <span className="text-sm font-semibold text-accent">
                    {progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-surface">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                    className="
            h-full
            rounded-full
            bg-accent
          "
                  />
                </div>

                <p className="mt-4 text-center text-xs leading-relaxed text-text-secondary">
                  This may take up to 2–5 minutes. Please don't close or refresh the page.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
};


type ToggleProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

function Toggle({
  label,
  checked,
  onChange,
}: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="
        group
        flex
        items-center
        gap-4
        cursor-pointer
        select-none
        text-left
      "
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "var(--color-accent-soft)"
            : "transparent",
        }}
        transition={{
          duration: 0.25,
        }}
        className="
          relative
          h-7
          w-14
          rounded-full
          border
          border-border
          bg-surface
          shadow-soft
        "
      >
        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="
            absolute
            top-0.5
            h-5.5
            w-5.5
            rounded-full
            bg-accent
            shadow-md
          "
          style={{
            left: checked ? "1.75rem" : "0.25rem",
          }}
        />
      </motion.div>

      <span
        className={`
          text-sm
          font-medium
          transition-colors
          duration-200
          ${checked
            ? "text-text-primary"
            : "text-text-secondary"
          }
        `}
      >
        {label}
      </span>
    </button>
  );
}

export default TopicForm