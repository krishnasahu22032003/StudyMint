import { useDispatch, useSelector } from 'react-redux';
import DashboardHeader from '../components/ui/DashboardHeader'
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../redux/store';
import signOutUser from "../lib/handleSignOut";
import TopicForm from '../components/ui/TopicForm';
import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { motion } from "framer-motion";
import Sidebar from '../components/ui/SideBar';
import FinalResult from '../components/ui/FinalResutl';

type Props = {}

const NotesPage = (props: Props) => {

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [error, setError] = useState("")
    const { userData } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good morning"
            : hour < 17
                ? "Good afternoon"
                : "Good evening";

    const handleSignOut = async () => {
        await signOutUser(dispatch, navigate);
    };

    const handleHistory = () => {
        navigate("/history")
    };

    const handleBuyCredits = () => {
        navigate("/pricing");
    }

    if (!userData) return null;

    const firstName = userData.name?.split(" ")[0] ?? "there";

    return (
        <div className="min-h-screen bg-bg">
            <DashboardHeader
                userName={userData.name}
                credits={userData.credits}
                onSignOut={handleSignOut}
                onBuyCredits={handleBuyCredits}
                onHistory={handleHistory}
            />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-22 pb-20">

            

                <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError} />

                {loading && (
  <motion.div
    animate={{
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut",
    }}
    className="
      mb-6
      flex
      items-center
      justify-center
      gap-2
      text-accent
      font-medium
    "
  >
    <div className="h-2 w-2 rounded-full bg-accent" />
    <span>Generating exam-focused notes...</span>
  </motion.div>
)}

{error && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="
      mb-6
      rounded-2xl
      border
      border-red-500/20
      bg-red-500/10
      px-4
      py-3
      text-center
      text-sm
      font-medium
      text-red-500
    "
  >
    {error}
  </motion.div>
)}

{!result && (
  <motion.div
    whileHover={{
      y: -4,
    }}
    transition={{
      type: "spring",
      stiffness: 250,
      damping: 22,
    }}
    className="
      relative
      overflow-hidden
      h-72
      rounded-3xl
      border
      border-border
      bg-surface
      shadow-soft
      flex
      flex-col
      items-center
      justify-center
      text-center
      p-8
    "
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

    <div className="absolute -top-16 right-0 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />

    <div className="relative z-10">
      <div
        className="
          mx-auto
          mb-5
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-accent-soft
        "
      >
         <BookOpen className="h-8 w-8 text-accent" />
      </div>

      <h3 className="text-lg font-semibold text-text-primary">
        Ready to Generate Notes
      </h3>

      <p className="mt-2 max-w-md text-sm text-text-secondary leading-relaxed">
        Enter your topic and preferences to generate
        exam-focused notes, summaries, diagrams and
        revision-ready study material.
      </p>
    </div>
  </motion.div>
)}

{result && (
  <motion.div
    initial={{
      opacity: 0,
      y: 40,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      flex
      flex-col
      lg:grid
      lg:grid-cols-4
      gap-6
    "
  >
    <div className="lg:col-span-1">
      <div
        className="
          sticky
          top-24
          rounded-3xl
          border
          border-border
          bg-surface
          shadow-soft
          overflow-hidden
        "
      >
        <Sidebar result={result} />
      </div>
    </div>

    <div
      className="
        lg:col-span-3
        rounded-3xl
        border
        border-border
        bg-surface
        shadow-soft
        overflow-hidden
      "
    >
      <div className="absolute inset-0 pointer-events-none" />

      <div className="p-6 md:p-8">
        <FinalResult result={result} />
      </div>
    </div>
  </motion.div>
)}
            </main>
        </div>
    )
}

export default NotesPage