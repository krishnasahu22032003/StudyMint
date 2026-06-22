import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    BookOpen,
    Plus,
    Zap,
    BarChart2,
    GitBranch,
    Clock,
    ChevronRight,
    PanelLeftClose,
    PanelLeftOpen,
    Search,
    FileText,
} from "lucide-react";
import DashboardHeader from "../components/ui/DashboardHeader";
import FinalResult from "../components/ui/FinalResutl";
import getNotes from "../lib/getAllUserNotes";
import getNoteById from "../lib/getNotebyId";
import signOutUser from "../lib/handleSignOut";
import type { AppDispatch, RootState } from "../redux/store";
import type { NoteHistoryItem, SingleNote } from "../types/notes";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const HistoryPage = () => {
    const [topics, setTopics] = useState<NoteHistoryItem[]>([]);
    const [selectedNote, setSelectedNote] = useState<SingleNote | null>(null);
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [loadingNote, setLoadingNote] = useState(false);
    const [loadingList, setLoadingList] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(
  typeof window !== "undefined"
    ? window.innerWidth >= 1024
    : true
);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { userData } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }, []);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await getNotes();
                setTopics(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingList(false);
            }
        };
        fetchNotes();
    }, []);

    const openNote = async (noteId: string) => {
        if (activeNoteId === noteId) return;
        setLoadingNote(true);
        setActiveNoteId(noteId);
        if (window.innerWidth < 1024) setSidebarOpen(false);
        try {
            const data = await getNoteById(noteId);
            setSelectedNote(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingNote(false);
        }
    };

    const handleSignOut = async () => {
        await signOutUser(dispatch, navigate);
    };

    if (!userData) return null;

    const filtered = topics.filter((t) =>
        t.topic.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-bg">
            <DashboardHeader
                userName={userData.name}
                credits={userData.credits}
                onSignOut={handleSignOut}
                onBuyCredits={() => navigate("/pricing")}
                onHistory={() => { }}
            />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="show"
                    className="flex items-end justify-between mb-6 gap-4"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 mb-3 shadow-soft">
                            <Clock className="w-3.5 h-3.5 text-gold" />
                            <span className="text-xs font-medium text-text-secondary">Note History</span>
                        </div>
                        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">
                            Your <span className="text-gradient-accent">notes.</span>
                        </h1>
                        <p className="mt-1.5 text-sm text-text-secondary">
                            {topics.length} note{topics.length !== 1 ? "s" : ""} generated so far.
                        </p>
                    </div>
                    <motion.button
                        whileHover={{ y: -2, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/notes")}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-accent/90 transition-colors duration-200 flex-shrink-0"
                    >
                        <Plus className="w-4 h-4" />
                        New note
                    </motion.button>
                </motion.div>

                <div className="flex gap-5 items-start relative">
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.aside
                                key="sidebar"
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  transition={{ duration: 0.3 }}
                                className="fixed lg:static inset-y-0 left-0 z-50 lg:z-auto"
                            >
                                <div className="w-72 lg:w-72 h-screen lg:h-auto lg:max-h-[calc(100vh-9rem)] overflow-hidden flex flex-col rounded-none lg:rounded-2xl border-r lg:border border-border bg-surface shadow-soft lg:shadow-elevated">
                                    <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-accent" />
                                            <span className="text-sm font-semibold text-text-primary">All notes</span>
                                        </div>
                                        <button
                                            onClick={() => setSidebarOpen(false)}
                                            className="flex cursor-pointer items-center justify-center w-7 h-7 rounded-lg hover:bg-surface-secondary transition-colors duration-200 text-text-tertiary hover:text-text-primary"
                                        >
                                            <PanelLeftClose className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="p-3 border-b border-border flex-shrink-0">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-tertiary pointer-events-none" />
                                            <input
                                                type="text"
                                                placeholder="Search notes…"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="w-full rounded-xl border border-border bg-bg pl-8 pr-3 py-2 text-xs text-text-primary placeholder:text-text-tertiary outline-none focus:border-accent/40 focus:ring-2 focus:ring-accent/10 transition-all duration-200"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                                        {loadingList && (
                                            <div className="space-y-2 pt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                                                        className="h-14 rounded-xl bg-surface-secondary"
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {!loadingList && filtered.length === 0 && (
                                            <div className="flex flex-col items-center justify-center py-10 text-center px-4">
                                                <div className="w-10 h-10 rounded-xl bg-surface-secondary flex items-center justify-center mb-3">
                                                    <FileText className="w-4 h-4 text-text-tertiary" />
                                                </div>
                                                <p className="text-xs font-medium text-text-secondary">
                                                    {search ? "No matches found" : "No notes yet"}
                                                </p>
                                                <p className="text-[11px] text-text-tertiary mt-1">
                                                    {search ? "Try a different search" : "Generate your first note"}
                                                </p>
                                            </div>
                                        )}

                                        {!loadingList &&
                                            filtered.map((t, i) => (
                                                <motion.button
                                                    key={t._id}
                                                    initial={{ opacity: 0, x: -12 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.4, delay: i * 0.04, ease: easeOut }}
                                                    onClick={() => openNote(t._id)}
                                                    className={`w-full cursor-pointer rounded-xl p-3 text-left transition-all duration-200 group border ${activeNoteId === t._id
                                                            ? "bg-accent-soft border-accent/30"
                                                            : "bg-transparent border-transparent hover:bg-surface-secondary hover:border-border"
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className={`text-xs font-semibold leading-snug truncate transition-colors duration-200 ${activeNoteId === t._id ? "text-accent" : "text-text-primary group-hover:text-accent"
                                                            }`}>
                                                            {t.topic}
                                                        </p>
                                                        <ChevronRight className={`w-3 h-3 flex-shrink-0 mt-0.5 transition-all duration-200 ${activeNoteId === t._id ? "text-accent" : "text-text-tertiary opacity-0 group-hover:opacity-100"
                                                            }`} />
                                                    </div>
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {t.classLevel && (
                                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent-soft text-accent">
                                                                {t.classLevel}
                                                            </span>
                                                        )}
                                                        {t.examType && (
                                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gold-soft text-gold">
                                                                {t.examType}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {(t.revisionMode || t.includeDiagram || t.includeChart) && (
                                                        <div className="flex items-center gap-2 mt-1.5">
                                                            {t.revisionMode && <Zap className="w-2.5 h-2.5 text-text-tertiary" />}
                                                            {t.includeDiagram && <GitBranch className="w-2.5 h-2.5 text-text-tertiary" />}
                                                            {t.includeChart && <BarChart2 className="w-2.5 h-2.5 text-text-tertiary" />}
                                                        </div>
                                                    )}
                                                </motion.button>
                                            ))}
                                    </div>
                                </div>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 z-30 bg-bg/60 backdrop-blur-sm lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="show"
                        className="flex-1 min-w-0"
                    >
                        <div className="relative rounded-3xl border border-border bg-surface shadow-soft min-h-[calc(100vh-14rem)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/4 via-transparent to-gold/4 pointer-events-none" />

                          {!sidebarOpen && (
  <button
    onClick={() => {
      console.log("OPEN SIDEBAR");
      setSidebarOpen(true);
    }}
    className="
      fixed
      top-58
      left-4
      z-[9999]
      flex
      items-center
      gap-2
      rounded-xl
      border
      border-border
      bg-surface
      px-3
      py-2
      text-xs
      font-medium
      text-text-secondary
      hover:text-text-primary
      hover:border-accent/30
      shadow-elevated
      cursor-pointer
    "
  >
    <PanelLeftOpen className="w-3.5 h-3.5" />
    Notes
  </button>
)}

                            <AnimatePresence mode="wait">
                                {loadingNote && (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                                            className="w-8 h-8 rounded-full border-2 border-border border-t-accent"
                                        />
                                        <p className="text-sm text-text-tertiary">Loading note…</p>
                                    </motion.div>
                                )}

                                {!loadingNote && !selectedNote && (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5, ease: easeOut }}
                                        className="flex flex-col items-center justify-center py-32 px-8 text-center"
                                    >
                                        <motion.div
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="w-16 h-16 rounded-2xl bg-accent-soft flex items-center justify-center mb-5"
                                        >
                                            <BookOpen className="w-8 h-8 text-accent" />
                                        </motion.div>
                                        <h3 className="text-base font-semibold text-text-primary">Select a note</h3>
                                        <p className="mt-2 text-sm text-text-tertiary max-w-xs leading-relaxed">
                                            Choose a note from the sidebar to view its full content and exam material.
                                        </p>
                                        {topics.length === 0 && !loadingList && (
                                            <motion.button
                                                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => navigate("/notes")}
                                                className="mt-6 cursor-pointer inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-soft"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Generate your first note
                                            </motion.button>
                                        )}
                                    </motion.div>
                                )}

                                {!loadingNote && selectedNote && (
                                    <motion.div
                                        key={activeNoteId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.55, ease: easeOut }}
                                        className={`relative z-10 p-6 sm:p-8 ${!sidebarOpen ? "pt-20" : ""
                                            }`}
                                    >
                                        <FinalResult result={selectedNote.content} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;