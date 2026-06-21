"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLevelByPercentage, levels, type Level } from "@/lib/questions";

export default function ResultPage() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [displayed, setDisplayed] = useState(0);
  const [level, setLevel] = useState<Level | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("quiz_score");
    const done = sessionStorage.getItem("quiz_lead_done");
    if (!raw || !done) { router.replace("/"); return; }
    const pct = Number(raw);
    setScore(pct);
    setLevel(getLevelByPercentage(pct));
    setTimeout(() => setReady(true), 100);

    let start = 0;
    const step = Math.max(1, Math.ceil(pct / 50));
    const interval = setInterval(() => {
      start = Math.min(start + step, pct);
      setDisplayed(start);
      if (start >= pct) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [router]);

  if (!level || score === null) return null;

  const levelIndex = levels.findIndex((l) => l.name === level.name);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: "#f8fafc" }}>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.05) 0%, transparent 70%)" }} />
      </div>

      <div className={`relative w-full max-w-xl ${ready ? "fade-up" : "opacity-0"}`}>

        {/* Score card */}
        <div className="bg-white rounded-3xl p-8 mb-5 text-center card-shadow">
          <div className="text-5xl mb-3">{level.emoji}</div>

          <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
            style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)", color: "#2563eb" }}>
            {level.name}
          </div>

          <h1 className="text-2xl font-bold mb-5" style={{ color: "#0f172a" }}>
            Votre score IA
          </h1>

          {/* Animated score */}
          <div className="score-pop mb-5">
            <span className="text-7xl font-black gradient-text">{displayed}</span>
            <span className="text-3xl font-bold gradient-text">%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-full overflow-hidden mb-2" style={{ backgroundColor: "#f1f5f9" }}>
            <div
              className="h-3 rounded-full progress-fill"
              style={{ width: `${displayed}%`, background: "linear-gradient(90deg, #2563eb, #0ea5e9)" }}
            />
          </div>
          <div className="flex justify-between text-xs" style={{ color: "#94a3b8" }}>
            <span>Débutant</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Description card */}
        <div className="bg-white rounded-3xl p-6 mb-5 card-shadow">
          <h2 className="font-bold mb-3" style={{ color: "#0f172a" }}>Analyse de votre profil</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748b" }}>{level.description}</p>
          <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #eff6ff, #dbeafe)", border: "1px solid #bfdbfe" }}>
            <p className="text-xs font-bold mb-1.5" style={{ color: "#2563eb" }}>💡 Notre conseil pour vous</p>
            <p className="text-sm leading-relaxed" style={{ color: "#1e40af" }}>{level.advice}</p>
          </div>
        </div>

        {/* Level scale */}
        <div className="bg-white rounded-3xl p-5 mb-6 card-shadow">
          <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: "#94a3b8" }}>Les 5 niveaux</p>
          <div className="flex gap-1.5">
            {levels.map((l, i) => {
              const isActive = i === levelIndex;
              return (
                <div key={i} className="flex-1 text-center py-2.5 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: isActive ? "linear-gradient(135deg, #2563eb, #0ea5e9)" : "#f1f5f9",
                    color: isActive ? "#fff" : "#94a3b8",
                    boxShadow: isActive ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
                  }}>
                  <div className="text-base mb-0.5">{l.emoji}</div>
                  <div className="text-[10px]">{l.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/")}
          className="btn-primary w-full py-4 rounded-2xl font-semibold text-white mb-3"
        >
          {level.cta}
        </button>

        <button
          onClick={() => { sessionStorage.clear(); router.push("/"); }}
          className="w-full text-sm py-2 transition-colors hover:opacity-70"
          style={{ color: "#94a3b8" }}
        >
          Refaire le quiz
        </button>
      </div>
    </main>
  );
}
