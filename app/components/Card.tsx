"use client"

type CardProps = {
    title: string
    emoji?: string
    children: React.ReactNode
    accent?: string
    bgColor?: string
}

export default function Card({
                                 title, children,
                                 accent = "#5C4430",
                                 bgColor = "#EAE0D0",
                             }: CardProps) {
    return (
        <div style={{
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: bgColor,
            border: "1px solid #D9CCBA",
            boxShadow: "4px 5px 14px rgba(160,130,95,0.25)",
        }}>
            <div style={{
                padding: "12px 20px 10px",
                borderBottom: "1px solid rgba(217,204,186,0.6)",
            }}>
                <p style={{
                    color: "#9C8A76",
                    fontSize: "0.58rem",
                    letterSpacing: "2.5px",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    margin: 0,
                }}>
                    {title}
                </p>
            </div>
            <div style={{
                padding: "20px 24px",
                color: "var(--text-dark)",
                lineHeight: 1.6,
                background: "rgba(255,255,255,0.25)",
            }}>
                {children}
            </div>
        </div>
    )
}