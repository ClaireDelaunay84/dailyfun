"use client"

type CardProps = {
    title: string
    emoji: React.ReactNode
    children: React.ReactNode
    accent?: string
}

export default function Card({ title, emoji, children, accent = "#6366F1" }: CardProps) {
    return (
        <div style={{
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            borderTop: "2px solid rgba(255, 255, 255, 1)",
            boxShadow: `
                0 4px 6px rgba(0, 0, 0, 0.03),
                0 12px 32px rgba(0, 0, 0, 0.06),
                0 0 0 1px rgba(255,255,255,0.5) inset,
                0 24px 48px ${accent}15
            `,
        }}>

            {/* ── HEADER avec barre colorée en haut ── */}
            <div style={{
                borderTop: `3px solid ${accent}`,
                background: `linear-gradient(135deg, ${accent}18, ${accent}06)`,
                padding: "10px 18px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: `1px solid ${accent}15`,
            }}>
                <span style={{fontSize: "1rem"}}>{emoji}</span>
                <p style={{
                    color: "var(--text-muted)", // ← était accent, maintenant gris uniforme
                    fontSize: "0.6rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    margin: 0,
                }}>
                    {title}
                </p>
            </div>

            {/* ── CONTENU ── */}
            <div style={{
                padding: "18px",
                color: "var(--text-dark)",
                lineHeight: 1.6,
                flex: 1,
            }}>
                {children}
            </div>

        </div>
    )
}