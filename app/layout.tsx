import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quel est votre vrai niveau avec l'IA ?",
  description: "Quiz gratuit en 2 minutes pour évaluer votre niveau d'utilisation de l'intelligence artificielle.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen" style={{ backgroundColor: "#0a0a0f", color: "#f1f0f5" }}>
        {children}
      </body>
    </html>
  );
}
