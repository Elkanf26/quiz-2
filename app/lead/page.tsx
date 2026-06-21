"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  email: string;
  lastName: string;
  company: string;
  phone: string;
}

export default function LeadPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    firstName: "",
    email: "",
    lastName: "",
    company: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const score = sessionStorage.getItem("quiz_score");
    if (!score) router.replace("/");
  }, [router]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.firstName.trim() || !form.email.trim()) {
      setError("Le prénom et l'email sont obligatoires.");
      return;
    }

    const score = sessionStorage.getItem("quiz_score") ?? "0";
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, score: Number(score) }),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      sessionStorage.setItem("quiz_lead_done", "1");
      router.push("/result");
    } catch {
      setError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      <div className="w-full max-w-md animate-fade-in">
        {/* Lock icon */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
            style={{ backgroundColor: "#1a0a3a", border: "1px solid #4c1d95" }}
          >
            🔒
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#f1f0f5" }}>
            Votre résultat est prêt !
          </h1>
          <p className="text-sm" style={{ color: "#9ca3af" }}>
            Entrez vos informations pour accéder à votre analyse personnalisée
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 flex flex-col gap-4"
          style={{ backgroundColor: "#0f0f1a", border: "1px solid #1e1e3f" }}
        >
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1" style={{ color: "#9ca3af" }}>
                Prénom <span style={{ color: "#7c3aed" }}>*</span>
              </label>
              <input
                name="firstName"
                type="text"
                required
                value={form.firstName}
                onChange={handleChange}
                placeholder="Marie"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #2d2d50",
                  color: "#f1f0f5",
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium mb-1" style={{ color: "#9ca3af" }}>
                Nom
              </label>
              <input
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Dupont"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: "#1a1a2e",
                  border: "1px solid #2d2d50",
                  color: "#f1f0f5",
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#9ca3af" }}>
              Email <span style={{ color: "#7c3aed" }}>*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="marie@exemple.com"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #2d2d50",
                color: "#f1f0f5",
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#9ca3af" }}>
              Entreprise
            </label>
            <input
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              placeholder="Ma Société"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #2d2d50",
                color: "#f1f0f5",
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "#9ca3af" }}>
              Téléphone
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+33 6 00 00 00 00"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #2d2d50",
                color: "#f1f0f5",
              }}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-60 hover:opacity-90 active:scale-95 mt-2"
            style={{ backgroundColor: "#7c3aed" }}
          >
            {loading ? "Chargement…" : "Accéder à mon résultat →"}
          </button>

          <p className="text-center text-xs" style={{ color: "#4b5563" }}>
            Vos données sont confidentielles et ne seront jamais revendues.
          </p>
        </form>
      </div>
    </main>
  );
}
