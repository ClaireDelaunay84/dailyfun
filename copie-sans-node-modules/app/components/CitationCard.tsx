"use client"
import { useState, useEffect } from "react"
import Card from "./Card"
import { getCitationsDuJour } from "../data/citations"

export default function CitationCard() {
    const citationsDuJour = getCitationsDuJour()
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [imageLoading, setImageLoading] = useState(true)

    // Flip automatique toutes les 20s
    useEffect(() => {
        if (citationsDuJour.length <= 1) return

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setFlipped(true)
                setTimeout(() => {
                    setIndex(i => (i + 1) % citationsDuJour.length)
                    setFlipped(false)
                }, 600)
            }, 20000)

            return () => clearInterval(interval)
        }, 10000)

        return () => clearTimeout(timeout)
    }, [citationsDuJour.length])

    // Fetch image Wikipedia quand l'auteur change
    useEffect(() => {
        const auteur = citationsDuJour[index]?.auteur
        if (!auteur) return

        setImageUrl(null)
        setImageLoading(true)

        fetch(
            `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(auteur)}`
        )
            .then(res => res.json())
            .then(data => {
                setImageUrl(data?.thumbnail?.source ?? null)
            })
            .catch(() => setImageUrl(null))
            .finally(() => setImageLoading(false))
    }, [index, citationsDuJour])

    const current = citationsDuJour[index]

    return (
        <div style={{ perspective: "1200px", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{
                transition: "transform 0.6s ease",
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateX(90deg)" : "rotateX(0deg)",
                transformOrigin: "center center",
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}>
                <Card title="Citation du jour" emoji="✨" accent="#C8B6FF">
                    {/* Indicateurs */}
                    {citationsDuJour.length > 1 && (
                        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
                            {citationsDuJour.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setFlipped(true)
                                        setTimeout(() => { setIndex(i); setFlipped(false) }, 600)
                                    }}
                                    style={{
                                        height: "3px", flex: 1, borderRadius: "4px",
                                        background: i === index ? "#C8B6FF" : "#C8B6FF33",
                                        cursor: "pointer", transition: "background 0.3s ease",
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Contenu */}
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>

                        {/* Image auteur */}
                        <div style={{
                            width: "72px", height: "72px", borderRadius: "50%",
                            flexShrink: 0, overflow: "hidden",
                            background: "linear-gradient(135deg, #FFC8DD44, #C8B6FF44)",
                            border: "2px solid #C8B6FF",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={current.auteur}
                                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                                />
                            ) : (
                                <span style={{ fontSize: "1.8rem" }}>
                  {imageLoading ? "⏳" : "✍️"}
                </span>
                            )}
                        </div>

                        {/* Texte */}
                        <div style={{ flex: 1 }}>
                            <p style={{
                                fontSize: "0.95rem",
                                fontStyle: "italic",
                                lineHeight: 1.7,
                                color: "var(--text-dark)",
                                marginBottom: "12px",
                            }}>
                                "{current.texte}"
                            </p>
                            <p style={{
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                color: "#C8B6FF",
                                fontFamily: "var(--font-poppins)",
                                letterSpacing: "0.5px",
                            }}>
                                — {current.auteur}
                            </p>
                        </div>

                    </div>

                </Card>
            </div>
        </div>
    )
}