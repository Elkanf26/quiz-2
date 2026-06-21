export interface EmailData {
  firstName: string;
  score: number;
  levelName: string;
  levelEmoji: string;
  description: string;
  advice: string;
  cta: string;
}

const baseStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0; padding: 0; background-color: #f8fafc;
`;

export function buildEmail(data: EmailData): string {
  const { firstName, score, levelName, levelEmoji, description, advice, cta } = data;

  const levelColors: Record<string, { bg: string; text: string; badge: string }> = {
    "Observateur":  { bg: "#f1f5f9", text: "#475569", badge: "#e2e8f0" },
    "Curieux":      { bg: "#eff6ff", text: "#2563eb", badge: "#dbeafe" },
    "Explorateur":  { bg: "#eff6ff", text: "#1d4ed8", badge: "#bfdbfe" },
    "Praticien":    { bg: "#eff6ff", text: "#1e40af", badge: "#93c5fd" },
    "Expert":       { bg: "#1e3a8a", text: "#ffffff", badge: "#2563eb" },
  };

  const colors = levelColors[levelName] ?? levelColors["Curieux"];

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Votre résultat IA — ${levelEmoji} ${levelName}</title>
</head>
<body style="${baseStyle}">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%;">

          <!-- HEADER -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <span style="font-size:13px; font-weight:600; color:#2563eb; letter-spacing:0.05em;">QUIZ IA · VOTRE RÉSULTAT</span>
            </td>
          </tr>

          <!-- SCORE CARD -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:linear-gradient(135deg,#1e3a8a,#2563eb,#0ea5e9); border-radius:24px; padding:40px 32px; text-align:center; margin-bottom:20px;">
                <tr>
                  <td>
                    <div style="font-size:56px; margin-bottom:12px;">${levelEmoji}</div>
                    <div style="display:inline-block; background:rgba(255,255,255,0.2); color:#fff;
                      font-size:13px; font-weight:700; padding:6px 18px; border-radius:100px; margin-bottom:20px; letter-spacing:0.05em;">
                      ${levelName.toUpperCase()}
                    </div>
                    <div style="color:rgba(255,255,255,0.85); font-size:16px; margin-bottom:8px;">
                      Bonjour <strong>${firstName}</strong>, votre score IA est
                    </div>
                    <div style="font-size:80px; font-weight:900; color:#fff; line-height:1; margin-bottom:8px;">
                      ${score}<span style="font-size:40px;">%</span>
                    </div>
                    <!-- Score bar -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                      <tr>
                        <td style="background:rgba(255,255,255,0.2); border-radius:100px; height:8px; overflow:hidden;">
                          <div style="width:${score}%; height:8px; background:rgba(255,255,255,0.85); border-radius:100px;"></div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:6px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="color:rgba(255,255,255,0.5); font-size:11px;">Débutant</td>
                              <td align="right" style="color:rgba(255,255,255,0.5); font-size:11px;">Expert</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SPACER -->
          <tr><td style="height:20px;"></td></tr>

          <!-- DESCRIPTION -->
          <tr>
            <td style="background:#ffffff; border-radius:20px; padding:28px 32px;
              border:1.5px solid #e2e8f0; box-shadow:0 4px 20px rgba(37,99,235,0.06);">
              <p style="font-size:13px; font-weight:700; color:#2563eb; margin:0 0 10px; text-transform:uppercase; letter-spacing:0.05em;">
                Analyse de votre profil
              </p>
              <p style="font-size:15px; color:#475569; line-height:1.7; margin:0 0 20px;">
                ${description}
              </p>
              <!-- Advice box -->
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#eff6ff; border-radius:14px; border:1.5px solid #bfdbfe;">
                <tr>
                  <td style="padding:18px 20px;">
                    <p style="font-size:13px; font-weight:700; color:#2563eb; margin:0 0 8px;">
                      💡 Notre conseil pour vous
                    </p>
                    <p style="font-size:14px; color:#1e40af; line-height:1.6; margin:0;">
                      ${advice}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SPACER -->
          <tr><td style="height:20px;"></td></tr>

          <!-- LEVELS -->
          <tr>
            <td style="background:#ffffff; border-radius:20px; padding:28px 32px;
              border:1.5px solid #e2e8f0; box-shadow:0 4px 20px rgba(37,99,235,0.06);">
              <p style="font-size:13px; font-weight:700; color:#94a3b8; margin:0 0 14px; text-transform:uppercase; letter-spacing:0.05em;">
                Les 5 niveaux
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-spacing:0 6px;">
                ${[
                  ["🌱","Observateur","0–19%", levelName === "Observateur"],
                  ["🔍","Curieux","20–39%", levelName === "Curieux"],
                  ["🧭","Explorateur","40–59%", levelName === "Explorateur"],
                  ["⚡","Praticien","60–79%", levelName === "Praticien"],
                  ["🚀","Expert","80–100%", levelName === "Expert"],
                ].map(([e, n, r, active]) => `
                <tr>
                  <td style="padding:4px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      style="background:${active ? "linear-gradient(135deg,#2563eb,#0ea5e9)" : "#f1f5f9"};
                        border-radius:12px; padding:10px 14px;">
                      <tr>
                        <td style="width:28px; font-size:18px;">${e}</td>
                        <td style="font-size:13px; font-weight:${active ? "700" : "500"};
                          color:${active ? "#fff" : "#64748b"}; padding-left:10px;">${n}</td>
                        <td align="right" style="font-size:12px; color:${active ? "rgba(255,255,255,0.7)" : "#94a3b8"};">${r}</td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join("")}
              </table>
            </td>
          </tr>

          <!-- SPACER -->
          <tr><td style="height:28px;"></td></tr>

          <!-- CTA BUTTON -->
          <tr>
            <td align="center">
              <a href="https://quiz-2-sigma.vercel.app"
                style="display:inline-block; background:linear-gradient(135deg,#2563eb,#1d4ed8);
                  color:#fff; font-size:16px; font-weight:700; text-decoration:none;
                  padding:16px 36px; border-radius:16px;
                  box-shadow:0 6px 20px rgba(37,99,235,0.4);">
                ${cta}
              </a>
            </td>
          </tr>

          <!-- SPACER -->
          <tr><td style="height:32px;"></td></tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding:0 20px;">
              <p style="font-size:12px; color:#94a3b8; margin:0; line-height:1.8;">
                Vous recevez cet email car vous avez complété le Quiz IA.<br/>
                © 2025 Quiz IA · Tous droits réservés
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
