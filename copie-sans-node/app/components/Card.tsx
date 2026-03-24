"use client"

type CardProps = {
    title: string
    emoji: React.ReactNode
    children: React.ReactNode
    accent?: string
    bgColor?: string
}

export default function Card({
                                 title,
                                 emoji,
                                 children,
                                 accent = "#3d8a78",
                                 bgColor = "#c8ece6",
                             }: CardProps) {
    return (
        <div style={{
            borderRadius: "22px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: bgColor,
            border: `0.5px solid ${accent}22`,
        }}>
            {/* ── HEADER ── */}
            <div style={{
                padding: "12px 16px 10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: `0.5px solid ${accent}18`,
            }}>
                <div style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "rgba(255,255,255,0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "17px",
                    flexShrink: 0,
                }}>
                    {emoji}
                </div>
                <p style={{
                    color: accent,
                    fontSize: "0.6rem",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    margin: 0,
                    fontFamily: "var(--font-jost)",
                }}>
                    {title}
                </p>
            </div>

            {/* ── CONTENU ── */}
            <div style={{
                padding: "16px 18px",
                color: "var(--text-dark)",
                lineHeight: 1.6,
                flex: 1,
                background: "rgba(255,255,255,0.45)",
            }}>
                {children}
            </div>
        </div>
    )
}
