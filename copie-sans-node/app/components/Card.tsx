"use client"

type CardProps = {
    title: string
    emoji?: string
    children: React.ReactNode
    accent?: string
    bgColor?: string
}

export default function Card({ title, children }: CardProps) {
    return (
        <div style={{
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            width: "100%",
        }}>
            <div style={{
                padding: "16px 20px",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
            }}>
                <p style={{
                    color: "rgba(255,255,255,0.6)",
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
                padding: "20px",
                color: "#2A2A2A",
                lineHeight: 1.6,
            }}>
                {children}
            </div>
        </div>
    )
}