import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThumbsUp, ThumbsDown, Share2, MessageSquare } from "lucide-react";

interface Answer { id: string; text: string; votes: number; date: string; }
interface Question { id: string; text: string; category: string; votes: number; answers: Answer[]; date: string; }

const categories = ["All", "Pest Control", "Irrigation", "Soil", "Market", "Seeds", "Fertilizer", "Organic", "Equipment", "Weather"];

export default function Community() {
  const { t } = useLanguage();
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

  const shareWhatsApp = (text: string) => window.open(`https://wa.me/919701473371?text=${encodeURIComponent(text)}`, "_blank");

  const filtered = filter === "All" ? questions : questions.filter(q => q.category === filter);

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h1 className="text-3xl font-display font-bold text-foreground mb-6">{t.community.title}</h1>
      {/* Post Question */}
      <div className="glass-card p-4 mb-6">
        <h2 className="font-semibold text-foreground mb-3">{t.community.askQuestion}</h2>
        <textarea value={newQ} onChange={e => setNewQ(e.target.value)} placeholder={t.community.placeholder}
          className="w-full bg-secondary text-foreground p-3 rounded-xl border border-border mb-3 min-h-[80px] outline-none focus:ring-2 focus:ring-primary" />
        <div className="flex gap-3 items-center">
          <select value={newQCat} onChange={e => setNewQCat(e.target.value)} className="bg-secondary text-secondary-foreground text-sm rounded-lg px-3 py-2 border border-border">
            {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={postQuestion} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-semibold transition-colors">{t.community.post}</button>
        </div>
      </div>
      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-sm ${filter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{c}</button>
        ))}
      </div>
      {/* Questions */}
      <div className="space-y-4">
        {filtered.map(q => (
          <div key={q.id} className="glass-card p-4">
            <div className="flex justify-between items-start mb-2">
              <p className="text-foreground font-medium flex-1">{q.text}</p>
              <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded ml-2 whitespace-nowrap">{q.category}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <button onClick={() => vote(q.id, 1)} className="flex items-center gap-1 hover:text-primary"><ThumbsUp size={14}/>{q.votes}</button>
              <button onClick={() => vote(q.id, -1)} className="flex items-center gap-1 hover:text-destructive"><ThumbsDown size={14}/></button>
              <button onClick={() => setExpandedQ(expandedQ === q.id ? null : q.id)} className="flex items-center gap-1 hover:text-foreground"><MessageSquare size={14}/>{q.answers.length} {t.community.answers}</button>
              <button onClick={() => shareWhatsApp(q.text)} className="flex items-center gap-1 hover:text-green-500"><Share2 size={14}/>{t.community.share}</button>
              <span className="ml-auto text-xs">{q.date}</span>
            </div>
            {expandedQ === q.id && (
              <div className="border-t border-border pt-3 space-y-3">
                {q.answers.map(a => (
                  <div key={a.id} className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-sm text-foreground">{a.text}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <button onClick={() => voteAnswer(q.id, a.id, 1)} className="flex items-center gap-1 hover:text-primary"><ThumbsUp size={12}/>{a.votes}</button>
                      <button onClick={() => voteAnswer(q.id, a.id, -1)} className="hover:text-destructive"><ThumbsDown size={12}/></button>
                      <span>{a.date}</span>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input value={answerTexts[q.id] || ""} onChange={e => setAnswerTexts(prev => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder={t.community.answer} className="flex-1 bg-secondary text-foreground px-3 py-2 rounded-lg text-sm border border-border outline-none" />
                  <button onClick={() => postAnswer(q.id)} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">Reply</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
