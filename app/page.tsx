"use client";

import { useRouter } from "next/navigation";

const stats = [
  { value: "10", label: "Questions" },
  { value: "5",  label: "Niveaux" },
  { value: "2 min", label: "Durée" },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ backgroundColor: "#f8fafc" }}>

      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", left: "-5%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative w-full max-w-2xl text-center fade-up">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ backgroundColor: "#eff6ff", color: "#2563eb", border: "1px solid #bfdbfe" }}>
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" style={{ boxShadow: "0 0 6px #22c55e" }} />
          Quiz gratuit · 2 minutes
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold mb-5 leading-tight tracking-tight" style={{ color: "#0f172a" }}>
          Quel est votre{" "}
          <span className="gradient-text">vrai niveau</span>
          <br />avec l&apos;IA ?
        </h1>

        <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: "#64748b", lineHeight: 1.7 }}>
          Découvrez en 2 minutes où vous en êtes avec l&apos;intelligence artificielle
          et obtenez des conseils personnalisés pour progresser.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-10 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold gradient-text">{s.value}</span>
              <span className="text-sm font-medium" style={{ color: "#94a3b8" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/quiz")}
          className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-white"
        >
          Démarrer le quiz
          <span className="text-xl">→</span>
        </button>

        <p className="mt-5 text-sm" style={{ color: "#94a3b8" }}>
          100% gratuit · Résultat immédiat · Sans engagement
        </p>

        {/* Social proof */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {["#2563eb","#0ea5e9","#7c3aed","#059669"].map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: c }}>
                {["M","A","J","L"][i]}
              </div>
            ))}
          </div>
          <p className="text-sm" style={{ color: "#64748b" }}>
            <strong style={{ color: "#0f172a" }}>+2 400 professionnels</strong> ont déjà testé leur niveau
          </p>
        </div>
      </div>
    </main>
  );
}
