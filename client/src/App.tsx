import { useState, useEffect } from 'react';
import { Sparkles, Plus, Search, Moon, Sun, FileText, Star, Clock, Settings, ChevronDown, Wand2, Mic, MoreHorizontal } from 'lucide-react';

const notes = [
  { id: 1, title: 'Q3 Product Roadmap', preview: 'Key milestones for the AI summarization engine and onboarding flow redesign...', tag: 'Work', time: '2h ago', active: true },
  { id: 2, title: 'Reading: Atomic Habits', preview: 'Chapter 4 — the plateau of latent potential, compounding small gains...', tag: 'Personal', time: '5h ago' },
  { id: 3, title: 'Client Call — Acme Corp', preview: 'Discussed pricing tiers, requested custom export to Notion and Slack...', tag: 'Meetings', time: 'Yesterday' },
  { id: 4, title: 'Recipe — Sourdough v3', preview: 'Hydration at 78%, autolyse 45 min, bulk ferment 5 hrs at 24°C...', tag: 'Personal', time: '2d ago' },
];

const tags = [
  { label: 'All Notes', count: 48, icon: FileText },
  { label: 'Starred', count: 6, icon: Star },
  { label: 'Recent', count: 12, icon: Clock },
];

export default function App() {
  const [dark, setDark] = useState(true);
  const [activeNote, setActiveNote] = useState(1);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans flex">
      <aside className="hidden lg:flex w-72 flex-col border-r border-border bg-bg-secondary">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-border">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center shadow-soft">
            <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">Marginal</span>
        </div>

        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium py-2.5 transition-colors shadow-soft">
            <Plus className="w-4 h-4" />
            New note
          </button>
        </div>

        <nav className="px-3 space-y-0.5">
          {tags.map((t) => (
            <button key={t.label} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors">
              <span className="flex items-center gap-2.5">
                <t.icon className="w-4 h-4" strokeWidth={1.75} />
                {t.label}
              </span>
              <span className="text-xs text-text-tertiary font-mono">{t.count}</span>
            </button>
          ))}
        </nav>

        <div className="px-5 pt-6 pb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary">Folders</div>
        <nav className="px-3 space-y-0.5 flex-1 overflow-y-auto">
          {['Work', 'Personal', 'Meetings', 'Research'].map((f) => (
            <button key={f} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:bg-surface-secondary hover:text-text-primary transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {f}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center text-accent text-xs font-semibold">KS</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Krishna Sahu</p>
            <p className="text-xs text-text-tertiary truncate">Pro plan</p>
          </div>
          <Settings className="w-4 h-4 text-text-tertiary" />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 glass sticky top-0 z-10">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <Search className="w-4 h-4 text-text-tertiary" />
            <input
              placeholder="Search notes, tags, or ask AI..."
              className="bg-transparent text-sm outline-none placeholder:text-text-tertiary w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-surface-secondary transition-colors"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-surface-secondary transition-colors">
              Export
              <ChevronDown className="w-3.5 h-3.5 text-text-tertiary" />
            </button>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          <section className="w-80 border-r border-border overflow-y-auto">
            {notes.map((n) => (
              <button
                key={n.id}
                onClick={() => setActiveNote(n.id)}
                className={`w-full text-left p-4 border-b border-border transition-colors ${
                  activeNote === n.id ? 'bg-accent-soft' : 'hover:bg-surface-secondary'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gold bg-gold-soft px-2 py-0.5 rounded-full">{n.tag}</span>
                  <span className="text-xs text-text-tertiary">{n.time}</span>
                </div>
                <h3 className="font-medium text-sm mb-1 truncate">{n.title}</h3>
                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">{n.preview}</p>
              </button>
            ))}
          </section>

          <section className="flex-1 flex flex-col overflow-y-auto">
            <div className="max-w-3xl w-full mx-auto px-10 py-10">
              <div className="flex items-center gap-2 text-xs text-text-tertiary mb-4 font-mono">
                <span>Work</span>
                <span>/</span>
                <span>Edited 2h ago</span>
              </div>

              <h1 className="font-display text-4xl font-semibold tracking-tight mb-6">Q3 Product Roadmap</h1>

              <div className="rounded-2xl border border-border bg-surface p-5 mb-8 shadow-soft">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl gradient-accent flex items-center justify-center flex-shrink-0">
                    <Wand2 className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">AI Summary</p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      This note outlines three milestones for Q3 — shipping the AI summarization engine,
                      redesigning the onboarding flow, and launching collaborative folders. Estimated
                      completion is week 11, pending design review.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors">
                    Expand summary
                  </button>
                  <button className="text-xs font-medium px-3 py-1.5 rounded-lg border border-border hover:bg-surface-secondary transition-colors">
                    Regenerate
                  </button>
                </div>
              </div>

              <div className="prose-notes space-y-4 text-[15px] leading-relaxed text-text-primary">
                <p>
                  The summarization engine is the centerpiece of this quarter. We are prioritizing
                  latency over exhaustiveness — users should see a draft summary in under two seconds.
                </p>
                <h3 className="font-display text-xl font-semibold pt-2">Milestones</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                    <span>Ship summarization v1 with streaming responses — <span className="text-text-tertiary font-mono text-sm">Week 7</span></span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <span>Redesign onboarding to highlight AI capture — <span className="text-text-tertiary font-mono text-sm">Week 9</span></span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-border-strong mt-2 flex-shrink-0" />
                    <span>Collaborative folders private beta — <span className="text-text-tertiary font-mono text-sm">Week 11</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <aside className="hidden xl:flex w-80 border-l border-border flex-col">
            <div className="p-5 border-b border-border">
              <p className="text-sm font-medium mb-3">Ask your notes</p>
              <div className="rounded-xl border border-border bg-surface-secondary p-3 flex items-center gap-2">
                <input
                  placeholder="What did I decide about pricing?"
                  className="bg-transparent text-sm outline-none placeholder:text-text-tertiary flex-1"
                />
                <Mic className="w-4 h-4 text-text-tertiary" />
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 overflow-y-auto">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">Suggestions</p>
              {['Turn this into a checklist', 'Summarize all Work notes', 'Find related notes', 'Translate to Hindi'].map((s) => (
                <button key={s} className="w-full flex items-center justify-between text-left text-sm rounded-lg border border-border px-3 py-2.5 hover:bg-surface-secondary transition-colors">
                  {s}
                  <MoreHorizontal className="w-4 h-4 text-text-tertiary" />
                </button>
              ))}
            </div>

            <div className="p-5 border-t border-border">
              <div className="rounded-xl bg-gold-soft border border-border p-4">
                <p className="text-xs font-medium text-gold mb-1">Pro tip</p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Press <span className="font-mono">⌘K</span> anywhere to summon AI actions for the note you're editing.
                </p>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}