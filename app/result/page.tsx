"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLevelByPercentage, type Level } from "@/lib/questions";

export default function ResultPage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(0);
  const [level, setLevel] = useState<Level | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("quiz_score");
    const done = sessionStorage.getItem("quiz_lead_done");
    if (!raw || !done) {
      router.replace("/");
      return;
    }
    const pct = Number(raw);
    setScore(pct);
    setLevel(getLevelByPercentage(pct));

    // Animate counter
    let start = 0;
    const step = Math.ceil(pct / 40);
    const interval = setInterval(() => {
      start = Math.min(start + step, pct);
      setDisplayed(start);
      if (start >= pct) clearInterval(interval);
    }, 30);

    return () => clearInterval(interval);
  }, [router]);

  if (!level || score === null) return null;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      <div className="w-full max-w-xl text-center animate-fade-in">
        {/* Emoji + Level */}
        <div className="text-6xl mb-4">{level.emoji}</div>
        <div
          className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-3"
          style={{ backgroundColor: "#1a0a3a", color: "#a78bfa", border: "1px solid #4c1d95" }}
        >
          {level.name}
        </div>

        <h1 className="text-3xl font-bold mb-2" style={{ color: "#f1f0f5" }}>
          Votre score IA
        </h1>

        {/* Animated score */}
        <div className="my-6 animate-score">
          <span className="text-7xl font-black" style={{ color: "#7c3aed" }}>
            {displayed}
          </span>
          <span className="text-3xl font-bold" style={{ color: "#7c3aed" }}>%</span>
        </div>

        {/* Score bar */}
        <div
          className="w-full h-3 rounded-full mb-8 overflow-hidden"
          style={{ backgroundColor: "#1a1a2e" }}
        >
          <div
            className="h-3 rounded-full transition-all duration-1000"
            style={{ width: `${displayed}%`, backgroundColor: "#7c3aed" }}
          />
        </div>

        {/* Description card */}
        <div
          className="rounded-2xl p-6 mb-6 text-left"
          style={{ backgroundColor: "#0f0f1a", border: "1px solid #1e1e3f" }}
        >
          <h2 className="font-semibold mb-3" style={{ color: "#f1f0f5" }}>
            Analyse de votre profil
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#9ca3af" }}>
            {level.description}
          </p>
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: "#1a0a3a", border: "1px solid #4c1d95" }}
          >
            <p className="text-sm font-medium mb-1" style={{ color: "#a78bfa" }}>
              💡 Notre conseil
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#c4b5fd" }}>
              {level.advice}
            </p>
          </div>
        </div>

        {/* Level scale */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{ backgroundColor: "#0f0f1a", border: "1px solid #1e1e3f" }}
        >
          <p className="text-xs font-medium mb-3" style={{ color: "#6b7280" }}>
            LES 5 NIVEAUX
          </p>
          <div className="flex justify-between gap-1">
            {["🌱 0-19%", "🔍 20-39%", "🧭 40-59%", "⚡ 60-79%", "🚀 80-100%"].map((item, i) => {
              const ranges = [10, 30, 50, 70, 90];
              const isActive = score !== null && Math.abs(ranges[i] - score) <= 10 && score >= [0,20,40,60,80][i] && score <= [19,39,59,79,100][i];
              return (
                <div
                  key={i}
                  className="flex-1 text-center py-2 rounded-lg text-xs"
                  style={{
                    backgroundColor: isActive ? "#1a0a3a" : "transparent",
                    border: `1px solid ${isActive ? "#7c3aed" : "#2d2d50"}`,
                    color: isActive ? "#a78bfa" : "#4b5563",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/")}
          className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 mb-4"
          style={{ backgroundColor: "#7c3aed", boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}
        >
          {level.cta}
        </button>

        <button
          onClick={() => {
            sessionStorage.clear();
            router.push("/");
          }}
          className="text-sm underline transition-colors hover:opacity-80"
          style={{ color: "#4b5563" }}
        >
          Refaire le quiz
        </button>
      </div>
    </main>
  );
}
