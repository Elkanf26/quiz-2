"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLevelByPercentage, levels, type Level } from "@/lib/questions";

const LEADFLOW_URL = "https://leadflow.fr/bondecommande---";

const features = [
  { icon: "🤖", title: "IA intégrée", desc: "Génère des emails, SMS et contenus marketing en un clic grâce à l'IA directement dans l'outil." },
  { icon: "📩", title: "Emails & SMS automatisés", desc: "Créez des séquences automatiques qui relancent, nurturent et convertissent vos prospects 24h/24." },
  { icon: "🎯", title: "CRM tout-en-un", desc: "Gérez tous vos contacts, pipelines et opportunités depuis un seul tableau de bord." },
  { icon: "🌐", title: "Pages de vente & funnels", desc: "Construisez vos tunnels de vente, pages de capture et sites web sans coder." },
  { icon: "📅", title: "Calendrier & réservations", desc: "Permettez à vos prospects de booker directement un appel dans votre agenda." },
  { icon: "📊", title: "Reporting & analytics", desc: "Suivez vos performances en temps réel et optimisez vos campagnes avec les bonnes données." },
];

const testimonials = [
  { name: "Sarah M.", role: "Coach business", text: "Leadflow a remplacé 6 outils différents. Je gagne 3h par jour et mes conversions ont augmenté de 40%.", avatar: "#2563eb" },
  { name: "Thomas R.", role: "Agence marketing", text: "En 2 semaines j'avais automatisé tout mon suivi client. Le ROI était là dès le premier mois.", avatar: "#7c3aed" },
  { name: "Julie L.", role: "Formatrice en ligne", text: "L'IA intégrée est bluffante. Je crée mes campagnes email en 10 minutes au lieu de 2 heures.", avatar: "#059669" },
];

const levelMessages: Record<string, { hook: string; urgency: string }> = {
  "Observateur":  { hook: "Vous démarrez avec l'IA — Leadflow est conçu pour vous faire progresser rapidement sans compétences techniques.", urgency: "C'est le meilleur moment pour commencer : posez les bonnes bases dès maintenant." },
  "Curieux":      { hook: "Vous avez la curiosité, il vous manque les outils. Leadflow centralise tout ce qu'il vous faut pour passer à l'action.", urgency: "Ne restez pas au stade de la curiosité — transformez votre intérêt en résultats concrets." },
  "Explorateur":  { hook: "Vous utilisez déjà l'IA mais en ordre dispersé. Leadflow réunit tout en un seul endroit pour décupler votre impact.", urgency: "Vous êtes à mi-chemin — un bon outil va vous faire franchir le cap décisif." },
  "Praticien":    { hook: "Vous avez les compétences, Leadflow vous donne la puissance de feu pour scaler votre activité à un autre niveau.", urgency: "Les praticiens qui s'équipent maintenant prennent une longueur d'avance décisive sur leurs concurrents." },
  "Expert":       { hook: "En tant qu'expert IA, vous allez adorer la puissance de Leadflow. C'est l'outil que les pros utilisent pour dominer leur marché.", urgency: "Vous avez l'expertise — il ne manque plus que l'infrastructure pour l'exploiter à 100%." },
};

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
  const msg = levelMessages[level.name] ?? levelMessages["Curieux"];

  return (
    <main style={{ backgroundColor: "#f8fafc" }}>

      {/* ── SCORE SECTION ── */}
      <section className="flex flex-col items-center px-4 py-16">
        <div className={`w-full max-w-xl ${ready ? "fade-up" : "opacity-0"}`}>

          {/* Score card */}
          <div className="bg-white rounded-3xl p-8 mb-5 text-center card-shadow">
            <div className="text-5xl mb-3">{level.emoji}</div>
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4"
              style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", color: "#2563eb" }}>
              {level.name}
            </div>
            <h1 className="text-2xl font-bold mb-5" style={{ color: "#0f172a" }}>Votre score IA</h1>
            <div className="score-pop mb-5">
              <span className="text-7xl font-black gradient-text">{displayed}</span>
              <span className="text-3xl font-bold gradient-text">%</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden mb-2" style={{ backgroundColor: "#f1f5f9" }}>
              <div className="h-3 rounded-full progress-fill"
                style={{ width: `${displayed}%`, background: "linear-gradient(90deg,#2563eb,#0ea5e9)" }} />
            </div>
            <div className="flex justify-between text-xs" style={{ color: "#94a3b8" }}>
              <span>Débutant</span><span>Expert</span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl p-6 mb-5 card-shadow">
            <h2 className="font-bold mb-3" style={{ color: "#0f172a" }}>Analyse de votre profil</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748b" }}>{level.description}</p>
            <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "1px solid #bfdbfe" }}>
              <p className="text-xs font-bold mb-1.5" style={{ color: "#2563eb" }}>💡 Notre conseil pour vous</p>
              <p className="text-sm leading-relaxed" style={{ color: "#1e40af" }}>{level.advice}</p>
            </div>
          </div>

          {/* Levels scale */}
          <div className="bg-white rounded-3xl p-5 card-shadow">
            <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: "#94a3b8" }}>Les 5 niveaux</p>
            <div className="flex gap-1.5">
              {levels.map((l, i) => {
                const isActive = i === levelIndex;
                return (
                  <div key={i} className="flex-1 text-center py-2.5 rounded-xl text-xs font-medium"
                    style={{
                      background: isActive ? "linear-gradient(135deg,#2563eb,#0ea5e9)" : "#f1f5f9",
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
        </div>
      </section>

      {/* ── TRANSITION ── */}
      <section className="px-4 py-6">
        <div className="max-w-xl mx-auto">
          <div className="rounded-3xl p-7 text-center"
            style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)", color: "#fff" }}>
            <p className="text-lg font-bold mb-2">
              {msg.hook}
            </p>
            <p className="text-sm opacity-75">{msg.urgency}</p>
          </div>
        </div>
      </section>

      {/* ── LEADFLOW PRÉSENTATION ── */}
      <section className="px-4 py-16" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}>
              La solution recommandée
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4" style={{ color: "#0f172a" }}>
              Découvrez <span className="gradient-text">Leadflow</span>
            </h2>
            <p className="text-lg" style={{ color: "#64748b", lineHeight: 1.7 }}>
              La plateforme tout-en-un propulsée par l&apos;IA pour automatiser votre marketing,
              gérer vos clients et faire exploser vos ventes.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {features.map((f, i) => (
              <div key={i} className="rounded-2xl p-5 card-shadow"
                style={{ backgroundColor: "#f8fafc", border: "1.5px solid #e2e8f0" }}>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: "#eff6ff" }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: "#0f172a" }}>{f.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#64748b" }}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing highlight */}
          <div className="rounded-3xl p-8 text-center mb-8"
            style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb,#0ea5e9)", color: "#fff" }}>
            <p className="text-sm font-semibold opacity-75 mb-2 uppercase tracking-wider">Offre de lancement</p>
            <div className="text-5xl font-black mb-1">Tout inclus</div>
            <p className="text-lg opacity-80 mb-6">CRM · IA · Emails · SMS · Funnels · Calendrier</p>
            <a
              href={LEADFLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-blue-700 bg-white transition-all hover:scale-105 text-lg"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}
            >
              Je veux Leadflow maintenant →
            </a>
            <p className="text-xs opacity-60 mt-4">Sans engagement · Accès immédiat · Support inclus</p>
          </div>

          {/* Testimonials */}
          <div className="flex flex-col gap-4 mb-10">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl p-5 card-shadow"
                style={{ backgroundColor: "#f8fafc", border: "1.5px solid #e2e8f0" }}>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#475569" }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: t.avatar }}>{t.name[0]}</div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: "#0f172a" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#94a3b8" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <a
              href={LEADFLOW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-xl font-bold text-white mb-4"
            >
              Souscrire à Leadflow →
            </a>
            <p className="text-sm" style={{ color: "#94a3b8" }}>Accès immédiat · Support 7j/7</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section className="py-8 px-4 text-center" style={{ borderTop: "1px solid #e2e8f0" }}>
        <button
          onClick={() => { sessionStorage.clear(); router.push("/"); }}
          className="text-sm transition-colors hover:opacity-70"
          style={{ color: "#94a3b8" }}
        >
          Refaire le quiz
        </button>
      </section>

    </main>
  );
}
