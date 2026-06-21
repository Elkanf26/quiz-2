"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stats = [
  { value: "2 400+", label: "professionnels testés" },
  { value: "2 min", label: "seulement" },
  { value: "5", label: "niveaux détaillés" },
  { value: "100%", label: "gratuit" },
];

const levels = [
  { emoji: "🌱", name: "Observateur", color: "#e2e8f0", text: "#64748b" },
  { emoji: "🔍", name: "Curieux",     color: "#dbeafe", text: "#2563eb" },
  { emoji: "🧭", name: "Explorateur", color: "#bfdbfe", text: "#1d4ed8" },
  { emoji: "⚡", name: "Praticien",   color: "#93c5fd", text: "#1e40af" },
  { emoji: "🚀", name: "Expert",      color: "#2563eb", text: "#fff"    },
];

const benefits = [
  {
    icon: "🎯",
    title: "Votre niveau exact",
    desc: "Découvrez précisément où vous en êtes parmi 5 profils IA distincts, du débutant complet à l'expert confirmé.",
  },
  {
    icon: "💡",
    title: "Des conseils actionnables",
    desc: "Recevez des recommandations personnalisées selon votre profil pour progresser rapidement et efficacement.",
  },
  {
    icon: "📈",
    title: "Un plan de progression",
    desc: "Identifiez vos lacunes et les prochaines étapes concrètes pour maximiser votre productivité avec l'IA.",
  },
];

const testimonials = [
  { name: "Marie L.", role: "Directrice Marketing", text: "J'ai découvert que j'étais Exploratrice. Les conseils m'ont permis de gagner 5h par semaine en 1 mois.", avatar: "#2563eb" },
  { name: "Thomas R.", role: "Entrepreneur", text: "Quiz ultra pertinent. Je me croyais expert mais j'étais Praticien. Ça m'a ouvert les yeux sur mes angles morts.", avatar: "#7c3aed" },
  { name: "Sarah M.", role: "Consultante RH", text: "Simple, rapide et redoutablement précis. Le résultat correspond exactement à mon usage réel de l'IA.", avatar: "#059669" },
];

const questions = [
  "Quelle est votre fréquence d'utilisation de l'IA ?",
  "Maîtrisez-vous l'art du prompt engineering ?",
  "Avez-vous automatisé des tâches avec l'IA ?",
];

export default function Home() {
  const router = useRouter();
  const [activeQ, setActiveQ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveQ((q) => (q + 1) % questions.length), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-24 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position:"absolute", top:"-15%", right:"-10%", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 65%)" }} />
          <div style={{ position:"absolute", bottom:"-10%", left:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 65%)" }} />
          {/* Grid */}
          <div style={{
            position:"absolute", inset:0,
            backgroundImage:"linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
            backgroundSize:"60px 60px",
          }} />
        </div>

        <div className="relative w-full max-w-3xl mx-auto text-center fade-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
            style={{ backgroundColor:"#eff6ff", color:"#2563eb", border:"1.5px solid #bfdbfe" }}>
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
            Quiz gratuit · Résultat immédiat
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight">
            Quel est votre<br />
            <span className="gradient-text">vrai niveau</span><br />
            avec l&apos;IA ?
          </h1>

          <p className="text-xl mb-10 max-w-xl mx-auto" style={{ color:"#64748b", lineHeight:1.7 }}>
            10 questions pour évaluer précisément votre maîtrise de l&apos;intelligence artificielle
            et obtenir un plan d&apos;action personnalisé.
          </p>

          {/* Animated question preview */}
          <div className="max-w-sm mx-auto mb-10 px-5 py-4 rounded-2xl text-sm font-medium text-left"
            style={{ backgroundColor:"#fff", border:"1.5px solid #e2e8f0", boxShadow:"0 4px 20px rgba(37,99,235,0.08)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background:"linear-gradient(135deg,#2563eb,#0ea5e9)" }}>?</div>
              <span className="text-xs font-semibold" style={{ color:"#94a3b8" }}>Exemple de question</span>
            </div>
            <p style={{ color:"#1e293b" }} key={activeQ} className="slide-in">
              {questions[activeQ]}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => router.push("/quiz")}
            className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-xl font-bold text-white mb-4"
          >
            Tester mon niveau maintenant
            <span>→</span>
          </button>

          <p className="text-sm" style={{ color:"#94a3b8" }}>
            Sans inscription · 2 minutes · Gratuit
          </p>

          {/* Social proof avatars */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="flex -space-x-2.5">
              {["#2563eb","#0ea5e9","#7c3aed","#059669","#dc2626"].map((c, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor:c }}>
                  {["M","T","S","J","L"][i]}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
              </div>
              <p className="text-sm" style={{ color:"#64748b" }}>
                <strong style={{ color:"#0f172a" }}>2 400+ professionnels</strong> ont déjà testé
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{ backgroundColor:"#2563eb" }} className="py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-black mb-1">{s.value}</div>
              <div className="text-sm opacity-70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 px-4" style={{ backgroundColor:"#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor:"#eff6ff", color:"#2563eb" }}>
              Ce que vous allez découvrir
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Un diagnostic complet<br />
              <span className="gradient-text">en 2 minutes chrono</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="rounded-3xl p-7 card-shadow"
                style={{ backgroundColor:"#f8fafc", border:"1.5px solid #e2e8f0" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ backgroundColor:"#eff6ff" }}>
                  {b.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:"#64748b" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEVELS ── */}
      <section className="py-24 px-4" style={{ backgroundColor:"#f8fafc" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor:"#eff6ff", color:"#2563eb" }}>
              Les 5 profils IA
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Où vous situez-vous<br />
              <span className="gradient-text">parmi ces profils ?</span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {levels.map((l, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 rounded-2xl transition-all"
                style={{ backgroundColor: i === 4 ? "#2563eb" : "#fff", border:`1.5px solid ${l.color}`, boxShadow: i === 4 ? "0 8px 24px rgba(37,99,235,0.3)" : "0 2px 8px rgba(0,0,0,0.04)" }}>
                <span className="text-2xl">{l.emoji}</span>
                <div className="flex-1">
                  <span className="font-bold text-sm" style={{ color: i === 4 ? "#fff" : "#0f172a" }}>{l.name}</span>
                </div>
                <div className="h-2 flex-1 rounded-full overflow-hidden" style={{ backgroundColor: i === 4 ? "rgba(255,255,255,0.2)" : "#f1f5f9" }}>
                  <div className="h-2 rounded-full"
                    style={{ width:`${20 + i * 20}%`, background: i === 4 ? "rgba(255,255,255,0.8)" : "linear-gradient(90deg,#2563eb,#0ea5e9)" }} />
                </div>
                <span className="text-xs font-semibold w-12 text-right" style={{ color: i === 4 ? "rgba(255,255,255,0.8)" : "#94a3b8" }}>
                  {[0,20,40,60,80][i]}–{[19,39,59,79,100][i]}%
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => router.push("/quiz")}
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold text-white">
              Découvrir mon profil →
            </button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-4" style={{ backgroundColor:"#fff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor:"#eff6ff", color:"#2563eb" }}>
              Ils ont testé leur niveau
            </div>
            <h2 className="text-4xl font-black tracking-tight">
              Ce qu&apos;ils en<br />
              <span className="gradient-text">ont pensé</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-3xl p-6 card-shadow"
                style={{ backgroundColor:"#f8fafc", border:"1.5px solid #e2e8f0" }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color:"#475569" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor:t.avatar }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color:"#0f172a" }}>{t.name}</p>
                    <p className="text-xs" style={{ color:"#94a3b8" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-4" style={{ background:"linear-gradient(135deg, #1e3a8a, #2563eb, #0ea5e9)" }}>
        <div className="max-w-2xl mx-auto text-center text-white">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight">
            Prêt à connaître votre<br />vrai niveau IA ?
          </h2>
          <p className="text-lg mb-8 opacity-80">
            Rejoignez 2 400+ professionnels qui ont déjà fait le test.
            Résultat en 2 minutes, conseils personnalisés inclus.
          </p>
          <button
            onClick={() => router.push("/quiz")}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-xl font-bold text-blue-700 bg-white transition-all hover:scale-105"
            style={{ boxShadow:"0 8px 30px rgba(0,0,0,0.2)" }}
          >
            Démarrer le quiz maintenant
            <span>→</span>
          </button>
          <p className="mt-5 text-sm opacity-60">Gratuit · Sans inscription · 2 minutes</p>
        </div>
      </section>

    </main>
  );
}
