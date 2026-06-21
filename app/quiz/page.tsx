"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions, MAX_SCORE } from "@/lib/questions";

const LETTERS = ["A", "B", "C", "D"];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);

  const question = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;
  const isLast = currentIndex + 1 === questions.length;

  useEffect(() => {
    setSelectedIndex(null);
  }, [currentIndex]);

  function handleNext() {
    if (selectedIndex === null) return;
    const points = question.answers[selectedIndex].points;
    const newTotal = totalScore + points;

    if (isLast) {
      const pct = Math.round((newTotal / MAX_SCORE) * 100);
      sessionStorage.setItem("quiz_score", String(pct));
      router.push("/lead");
    } else {
      setTotalScore(newTotal);
      setCurrentIndex((i) => i + 1);
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2" style={{ color: "#6b7280" }}>
            <span>Question {currentIndex + 1} sur {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: "#1a1a2e" }}>
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: "#7c3aed" }}
            />
          </div>
        </div>

        {/* Question card */}
        <div
          key={currentIndex}
          className="rounded-2xl p-8 mb-6 animate-fade-in"
          style={{ backgroundColor: "#0f0f1a", border: "1px solid #1e1e3f" }}
        >
          <h2 className="text-xl font-semibold mb-6 leading-snug" style={{ color: "#f1f0f5" }}>
            {question.text}
          </h2>

          <div className="flex flex-col gap-3">
            {question.answers.map((answer, i) => {
              const isSelected = selectedIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className="text-left px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isSelected ? "#1a0a3a" : "#1a1a2e",
                    border: `1px solid ${isSelected ? "#7c3aed" : "#2d2d50"}`,
                    color: "#d1d5db",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: isSelected ? "#7c3aed" : "#1e1e3f",
                        color: isSelected ? "#fff" : "#9ca3af",
                      }}
                    >
                      {LETTERS[i]}
                    </span>
                    <span className="pt-0.5">{answer.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedIndex === null}
          className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#7c3aed" }}
        >
          {isLast ? "Voir mon résultat →" : "Question suivante →"}
        </button>
      </div>
    </main>
  );
}
