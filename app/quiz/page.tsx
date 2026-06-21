"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { questions, MAX_SCORE } from "@/lib/questions";

const LETTERS = ["A", "B", "C", "D"];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isLast = currentIndex + 1 === questions.length;

  const advance = useCallback((idx: number) => {
    const points = question.answers[idx].points;
    const newTotal = totalScore + points;

    setTimeout(() => {
      if (isLast) {
        const pct = Math.round((newTotal / MAX_SCORE) * 100);
        sessionStorage.setItem("quiz_score", String(pct));
        router.push("/lead");
      } else {
        setTotalScore(newTotal);
        setSelectedIndex(null);
        setAnimKey((k) => k + 1);
        setCurrentIndex((i) => i + 1);
      }
    }, 480);
  }, [question, totalScore, isLast, router]);

  function handleSelect(idx: number) {
    if (selectedIndex !== null) return;
    setSelectedIndex(idx);
    advance(idx);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: "#f8fafc" }}>

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div style={{
          position: "absolute", top: "-5%", right: "0",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative w-full max-w-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.push("/")} className="text-sm flex items-center gap-1 transition-colors hover:opacity-70" style={{ color: "#94a3b8" }}>
            ← Retour
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
        <div
          key={animKey}
          className="bg-white rounded-3xl p-8 mb-4 slide-in card-shadow"
        >
          {/* Question number chip */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}>
            Question {currentIndex + 1}
          </div>

          <h2 className="text-xl font-bold mb-7 leading-snug" style={{ color: "#0f172a", lineHeight: 1.5 }}>
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
                  disabled={selectedIndex !== null}
                  className={`answer-btn text-left px-5 py-4 rounded-2xl text-sm font-medium ${isSelected ? "selected" : ""}`}
                  style={{
                    backgroundColor: isSelected ? "#2563eb" : isDimmed ? "#f8fafc" : "#f1f5f9",
                    border: `2px solid ${isSelected ? "#2563eb" : isDimmed ? "#e2e8f0" : "#e2e8f0"}`,
                    color: isSelected ? "#fff" : isDimmed ? "#94a3b8" : "#1e293b",
                    cursor: selectedIndex !== null ? "default" : "pointer",
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

        {/* Hint */}
        <p className="text-center text-xs" style={{ color: "#94a3b8" }}>
          Sélectionnez une réponse pour continuer
        </p>
      </div>
    </main>
  );
}
