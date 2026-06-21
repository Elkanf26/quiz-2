"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16" style={{ backgroundColor: "#0a0a0f" }}>
      <div className="w-full max-w-2xl text-center animate-fade-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{ backgroundColor: "#1a0a3a", color: "#a78bfa", border: "1px solid #4c1d95" }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
          Quiz gratuit · 2 minutes
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: "#f1f0f5" }}>
          Quel est votre{" "}
          <span style={{ color: "#7c3aed" }}>vrai niveau</span>
          {" "}avec l&apos;IA&nbsp;?
        </h1>

        <p className="text-lg mb-10" style={{ color: "#9ca3af" }}>
          Découvrez en 2 minutes où vous en êtes réellement avec l&apos;intelligence artificielle
          et obtenez des conseils personnalisés pour progresser.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 mb-12">
          {[
            { value: "10", label: "Questions" },
            { value: "5", label: "Niveaux" },
            { value: "2 min", label: "Durée" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold" style={{ color: "#7c3aed" }}>{stat.value}</span>
              <span className="text-sm" style={{ color: "#6b7280" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => router.push("/quiz")}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ backgroundColor: "#7c3aed", boxShadow: "0 0 30px rgba(124,58,237,0.4)" }}
        >
          Démarrer le quiz →
        </button>

        <p className="mt-6 text-sm" style={{ color: "#4b5563" }}>
          100% gratuit · Résultat immédiat · Sans engagement
        </p>
      </div>
    </main>
  );
}
