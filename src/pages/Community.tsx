import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translateCommunityCategory } from "@/data/dataTranslations";
import { ThumbsUp, ThumbsDown, Share2, MessageSquare } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { AnimatedLabel } from "@/components/AnimatedLabel";

interface Answer { id: string; text: string; votes: number; date: string; }
interface Question { id: string; text: string; category: string; votes: number; answers: Answer[]; date: string; }

const categories = ["All", "Pest Control", "Irrigation", "Soil", "Market", "Seeds", "Fertilizer", "Organic", "Equipment", "Weather"];

export default function Community() {
  const { t, lang } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem("agrilink-questions");
    return saved ? JSON.parse(saved) : [
      { id: "1", text: "What is the best organic pesticide for tomato fruit borer?", category: "Pest Control", votes: 12, answers: [
        { id: "a1", text: "Neem oil spray (5ml/L) is very effective. Spray in evening. Also use pheromone traps.", votes: 8, date: "2026-03-07" },
        { id: "a2", text: "Try Beauveria bassiana bio-pesticide. It's organic and approved for most crops.", votes: 5, date: "2026-03-07" },
      ], date: "2026-03-06" },
      { id: "2", text: "How much water does sugarcane need per acre?", category: "Irrigation", votes: 8, answers: [
        { id: "a3", text: "Sugarcane needs 1500-2500mm water. Drip irrigation saves 40% water compared to flood irrigation.", votes: 6, date: "2026-03-07" },
      ], date: "2026-03-05" },
      { id: "3", text: "Which variety of wheat is best for late sowing in UP?", category: "Seeds", votes: 15, answers: [
        { id: "a4", text: "HD-3086 and WH-1105 are good for late sowing. Sow by December end with higher seed rate (125kg/ha).", votes: 10, date: "2026-03-06" },
      ], date: "2026-03-04" },
    ];
  });
  const [newQ, setNewQ] = useState("");
  const [newQCat, setNewQCat] = useState("Pest Control");
  const [filter, setFilter] = useState("All");
  const [answerTexts, setAnswerTexts] = useState<Record<string, string>>({});
  const [expandedQ, setExpandedQ] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem("agrilink-questions", JSON.stringify(questions)); }, [questions]);

  const postQuestion = () => {
    if (!newQ.trim()) return;
    setQuestions(prev => [{ id: Date.now().toString(), text: newQ, category: newQCat, votes: 0, answers: [], date: new Date().toISOString().split("T")[0] }, ...prev]);
    setNewQ("");
  };

  const postAnswer = (qId: string) => {
    const text = answerTexts[qId];
    if (!text?.trim()) return;
    setQuestions(prev => prev.map(q => q.id === qId ? { ...q, answers: [...q.answers, { id: Date.now().toString(), text, votes: 0, date: new Date().toISOString().split("T")[0] }] } : q));
    setAnswerTexts(prev => ({ ...prev, [qId]: "" }));
  };

  const vote = (qId: string, delta: number) => setQuestions(prev => prev.map(q => q.id === qId ? { ...q, votes: q.votes + delta } : q));
  const voteAnswer = (qId: string, aId: string, delta: number) => setQuestions(prev => prev.map(q => q.id === qId ? { ...q, answers: q.answers.map(a => a.id === aId ? { ...a, votes: a.votes + delta } : a) } : q));

  const filtered = filter === "All" ? questions : questions.filter(q => q.category === filter);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.community.title}</h1>
        {/* Post Question */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 mb-6">
          <h2 className="font-display font-semibold text-foreground mb-3">{t.community.askQuestion}</h2>
          <textarea value={newQ} onChange={e => setNewQ(e.target.value)} placeholder={t.community.placeholder}
            className="w-full bg-secondary text-foreground p-3 rounded-2xl border border-border/50 mb-3 min-h-[80px] outline-none focus:ring-2 focus:ring-primary transition-all resize-none" />
          <div className="flex gap-3 items-center">
            <select value={newQCat} onChange={e => setNewQCat(e.target.value)} className="bg-secondary text-secondary-foreground text-sm rounded-xl px-3 py-2.5 border border-border/50">
              {categories.slice(1).map(c => <option key={c} value={c}>{translateCommunityCategory(c, lang)}</option>)}
            </select>
            <motion.button whileTap={{ scale: 0.97 }} onClick={postQuestion} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-semibold transition-colors">{t.community.post}</motion.button>
          </div>
        </motion.div>
        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`relative whitespace-nowrap px-3 py-1.5 rounded-xl text-sm transition-all ${filter === c ? "text-primary-foreground font-medium" : "text-secondary-foreground hover:bg-muted"}`}>
              <span className="relative z-10">{translateCommunityCategory(c, lang)}</span>
              {filter === c && <motion.div layoutId="comm-filter" className="absolute inset-0 bg-primary rounded-xl" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            </button>
          ))}
        </div>
        {/* Questions */}
        <div className="space-y-4">
          {filtered.map((q, i) => (
            <motion.div key={q.id} className="glass-card p-5"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <div className="flex justify-between items-start mb-2">
                <p className="text-foreground font-medium flex-1 leading-relaxed">{q.text}</p>
                <span className="bg-primary/15 text-primary text-xs px-2.5 py-1 rounded-xl ml-2 whitespace-nowrap font-medium">{translateCommunityCategory(q.category, lang)}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => vote(q.id, 1)} className="flex items-center gap-1 hover:text-primary transition-colors"><ThumbsUp size={14}/>{q.votes}</motion.button>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => vote(q.id, -1)} className="flex items-center gap-1 hover:text-destructive transition-colors"><ThumbsDown size={14}/></motion.button>
                <button onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)} className="flex items-center gap-1 hover:text-foreground transition-colors"><MessageSquare size={14}/>{q.answers.length} {t.community.answers}</button>
                <a href={buildWhatsAppLink(q.text)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-success transition-colors"><Share2 size={14}/>{t.community.share}</a>
                <span className="ml-auto text-xs">{q.date}</span>
              </div>
              <AnimatePresence>
                {expandedQ === q.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="border-t border-border/50 pt-3 space-y-3">
                      {q.answers.map(a => (
                        <div key={a.id} className="bg-secondary/50 rounded-xl p-3">
                          <p className="text-sm text-foreground leading-relaxed">{a.text}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => voteAnswer(q.id, a.id, 1)} className="flex items-center gap-1 hover:text-primary"><ThumbsUp size={12}/>{a.votes}</motion.button>
                            <motion.button whileTap={{ scale: 0.9 }} onClick={() => voteAnswer(q.id, a.id, -1)} className="hover:text-destructive"><ThumbsDown size={12}/></motion.button>
                            <span>{a.date}</span>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input value={answerTexts[q.id] || ""} onChange={e => setAnswerTexts(prev => ({ ...prev, [q.id]: e.target.value }))}
                          placeholder={t.community.answer} className="flex-1 bg-secondary text-foreground px-4 py-2.5 rounded-xl text-sm border border-border/50 outline-none focus:ring-2 focus:ring-primary transition-all" />
                        <motion.button whileTap={{ scale: 0.97 }} onClick={() => postAnswer(q.id)} className="bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold">{t.community.reply}</motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
