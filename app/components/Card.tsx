"use client"

type CardProps = {
    title: string
    emoji: string
    children: React.ReactNode
    accent?: string
    bgColor?: string
}

export default function Card({
    title, emoji, children,
    accent = "#3d8a78",
    bgColor = "#c8ece6",
}: CardProps) {
    return (
        <div style={{
            borderRadius: "22px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: bgColor,
            border: `0.5px solid ${accent}22`,
        }}>
            {/* HEADER */}
            <div style={{
                padding: "14px 20px 12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderBottom: `0.5px solid ${accent}18`,
            }}>
                <div style={{
                    width: "38px", height: "38px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.65)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", flexShrink: 0,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                }}>
                    {emoji}
                </div>
                <p style={{
                    color: accent,
                    fontSize: "0.58rem",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    margin: 0,
                    fontFamily: "var(--font-jost)",
                }}>
                    {title}
                </p>
            </div>

            {/* CONTENT */}
            <div style={{
                padding: "20px 24px",
                color: "var(--text-dark)",
                lineHeight: 1.6,
                background: "rgba(255,255,255,0.4)",
            }}>
                {children}
            </div>
        </div>
    )
}
