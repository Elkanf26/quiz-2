"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LeadPage() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: "", email: "", lastName: "", company: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("quiz_score")) router.replace("/");
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
      if (!res.ok) throw new Error();
      sessionStorage.setItem("quiz_lead_done", "1");
      router.push("/result");
    } catch {
      setError("Une erreur est survenue, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: "#f8fafc" }}>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: "absolute", top: "-5%", right: "0", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-md fade-up">

        {/* Icon + Title */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5 card-shadow"
            style={{ background: "linear-gradient(135deg, #2563eb, #0ea5e9)" }}>
            🎯
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>
            Votre résultat est prêt !
          </h1>
          <p className="text-sm" style={{ color: "#64748b" }}>
            Entrez vos informations pour accéder à votre analyse personnalisée
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 flex flex-col gap-4 card-shadow"
        >
          <div className="flex gap-3">
            <Field label="Prénom" name="firstName" placeholder="Marie" required value={form.firstName} onChange={handleChange} />
            <Field label="Nom" name="lastName" placeholder="Dupont" value={form.lastName} onChange={handleChange} />
          </div>
          <Field label="Email" name="email" type="email" placeholder="marie@exemple.com" required value={form.email} onChange={handleChange} />
          <Field label="Entreprise" name="company" placeholder="Ma Société" value={form.company} onChange={handleChange} />
          <Field label="Téléphone" name="phone" type="tel" placeholder="+33 6 00 00 00 00" value={form.phone} onChange={handleChange} />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 rounded-2xl font-semibold text-white mt-2 disabled:opacity-60"
          >
            {loading ? "Chargement…" : "Accéder à mon résultat →"}
          </button>

          <p className="text-center text-xs" style={{ color: "#94a3b8" }}>
            🔒 Vos données sont confidentielles et ne seront jamais revendues.
          </p>
        </form>
      </div>
    </main>
  );
}

function Field({ label, name, type = "text", placeholder, required, value, onChange }: {
  label: string; name: string; type?: string; placeholder: string;
  required?: boolean; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex-1">
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#475569" }}>
        {label}{required && <span className="text-blue-500 ml-0.5">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
        style={{
          backgroundColor: "#f8fafc",
          border: "1.5px solid #e2e8f0",
          color: "#0f172a",
        }}
        onFocus={(e) => { e.target.style.borderColor = "#2563eb"; e.target.style.backgroundColor = "#fff"; }}
        onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.backgroundColor = "#f8fafc"; }}
      />
    </div>
  );
}
