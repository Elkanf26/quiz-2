"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { questions, MAX_SCORE } from "@/lib/questions";

const LETTERS = ["A", "B", "C", "D"];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [locked, setLocked] = useState(false); // true = auto-avance en cours, false = peut changer
  const [scoreHistory, setScoreHistory] = useState<number[]>([]);
  const [answerHistory, setAnswerHistory] = useState<number[]>([]);
  const [animKey, setAnimKey] = useState(0);

  const question = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const isLast = currentIndex + 1 === questions.length;

  const advance = useCallback((idx: number) => {
    const points = question.answers[idx].points;
    const newScoreHistory = [...scoreHistory, points];
    const newAnswerHistory = [...answerHistory, idx];

    setLocked(true);
    setTimeout(() => {
      if (isLast) {
        const total = newScoreHistory.reduce((a, b) => a + b, 0);
        const pct = Math.round((total / MAX_SCORE) * 100);
        sessionStorage.setItem("quiz_score", String(pct));
        router.push("/lead");
      } else {
        setScoreHistory(newScoreHistory);
        setAnswerHistory(newAnswerHistory);
        setSelectedIndex(null);
        setLocked(false);
        setAnimKey((k) => k + 1);
        setCurrentIndex((i) => i + 1);
      }
    }, 480);
  }, [question, scoreHistory, answerHistory, isLast, router]);

  function handleSelect(idx: number) {
    if (locked) return;
    setSelectedIndex(idx);
    advance(idx);
  }

  function handleBack() {
    if (currentIndex === 0) {
      router.push("/");
      return;
    }
    const prevIndex = currentIndex - 1;
    const previousAnswer = answerHistory[prevIndex];
    setAnswerHistory((h) => h.slice(0, -1));
    setScoreHistory((s) => s.slice(0, -1));
    setSelectedIndex(previousAnswer ?? null);
    setLocked(false); // on peut changer la réponse
    setAnimKey((k) => k + 1);
    setCurrentIndex(prevIndex);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: "#f8fafc" }}>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: "absolute", top: "-5%", right: "0", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{ color: "#64748b", backgroundColor: "#fff", border: "1.5px solid #e2e8f0" }}
          >
            ← {currentIndex === 0 ? "Accueil" : "Question précédente"}
          </button>
          <span className="text-sm font-medium" style={{ color: "#64748b" }}>
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full mb-8 overflow-hidden" style={{ backgroundColor: "#e2e8f0" }}>
          <div
            className="h-1.5 rounded-full progress-fill"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #2563eb, #0ea5e9)" }}
          />
        </div>

        {/* Question card */}
        <div key={animKey} className="bg-white rounded-3xl p-8 mb-4 slide-in card-shadow">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}>
            Question {currentIndex + 1}
          </div>

          <h2 className="text-xl font-bold mb-7" style={{ color: "#0f172a", lineHeight: 1.5 }}>
            {question.text}
          </h2>

          <div className="flex flex-col gap-3">
            {question.answers.map((answer, i) => {
              const isSelected = selectedIndex === i;
              const isDimmed = selectedIndex !== null && !isSelected;

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={locked}
                  className={`answer-btn text-left px-5 py-4 rounded-2xl text-sm font-medium ${isSelected ? "selected" : ""}`}
                  style={{
                    backgroundColor: isSelected ? "#2563eb" : isDimmed ? "#f8fafc" : "#f1f5f9",
                    border: `2px solid ${isSelected ? "#2563eb" : "#e2e8f0"}`,
                    color: isSelected ? "#fff" : isDimmed ? "#94a3b8" : "#1e293b",
                    cursor: locked ? "default" : "pointer",
                    opacity: isDimmed ? 0.5 : 1,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: isSelected ? "rgba(255,255,255,0.25)" : "#e2e8f0",
                        color: isSelected ? "#fff" : "#64748b",
                      }}
                    >
                      {isSelected ? "✓" : LETTERS[i]}
                    </span>
                    <span>{answer.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs" style={{ color: "#94a3b8" }}>
          Sélectionnez une réponse pour continuer
        </p>
      </div>
    </main>
  );
}
