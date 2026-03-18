"use client"
import { useState, useEffect } from "react"
import Card from "./Card"

type Evenement = {
    annee: number
    texte: string
    imageUrl: string | null
}

export default function ArrivéCard() {
    const [evenements, setEvenements] = useState<Evenement[]>([])
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped] = useState(false)
    const [loading, setLoading] = useState(true)

    const today = new Date()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" })
    const MM = String(today.getMonth() + 1).padStart(2, "0")
    const DD = String(today.getDate()).padStart(2, "0")

    useEffect(() => {
        fetch(`https://fr.wikipedia.org/api/rest_v1/feed/onthisday/events/${MM}/${DD}`)
            .then(res => res.json())
            .then(data => {
                const events = data?.events ?? []

                // Trie par année décroissante et prend 5 événements bien répartis
                const sorted = [...events].sort((a, b) => b.year - a.year)
                const step = Math.floor(sorted.length / 5)
                const selection = [0, 1, 2, 3, 4].map(i => sorted[i * step] ?? sorted[i]).filter(Boolean)

                const formatted: Evenement[] = selection.map((e: any) => ({
                    annee: e.year,
                    texte: e.text,
                    imageUrl: e.pages?.[0]?.thumbnail?.source
                        ? e.pages[0].thumbnail.source.replace(/\/\d+px-/, "/400px-")
                        : null,
                }))

                setEvenements(formatted)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [MM, DD])

    // Flip automatique toutes les 20s, décalé de 5s
    useEffect(() => {
        if (evenements.length <= 1) return
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setFlipped(true)
                setTimeout(() => {
                    setIndex(i => (i + 1) % evenements.length)
                    setFlipped(false)
                }, 600)
            }, 20000)
            return () => clearInterval(interval)
        }, 5000)
        return () => clearTimeout(timeout)
    }, [evenements.length])

    const current = evenements[index]

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
                <Card title={`C'est arrivé un ${jour} ${mois}`} emoji="📅" accent="#FDE68A">

                    {/* Indicateurs */}
                    {evenements.length > 1 && (
                        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
                            {evenements.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setFlipped(true)
                                        setTimeout(() => { setIndex(i); setFlipped(false) }, 600)
                                    }}
                                    style={{
                                        height: "3px", flex: 1, borderRadius: "4px",
                                        background: i === index ? "#FDE68A" : "#FDE68A33",
                                        cursor: "pointer", transition: "background 0.3s ease",
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {loading ? (
                        <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>
                            Chargement...
                        </div>
                    ) : current ? (
                        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>

                            {/* Image ou fallback */}
                            <div style={{
                                width: "72px", height: "72px", borderRadius: "12px",
                                flexShrink: 0, overflow: "hidden",
                                background: "linear-gradient(135deg, #FDE68A44, #FDE68A44)",
                                border: "2px solid #FDE68A744",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                {current.imageUrl ? (
                                    <img
                                        src={current.imageUrl}
                                        alt={current.texte}
                                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", }}
                                    />
                                ) : (
                                    <span style={{ fontSize: "2rem" }}>📅</span>
                                )}
                            </div>

                            {/* Texte */}
                            <div style={{ flex: 1 }}>
                                <p style={{
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    color: "#FDE68A",
                                    fontFamily: "var(--font-poppins)",
                                    letterSpacing: "1px",
                                    marginBottom: "6px",
                                }}>
                                    En {current.annee}
                                </p>
                                <p style={{
                                    fontSize: "0.9rem",
                                    lineHeight: 1.65,
                                    color: "var(--text-dark)",
                                }}>
                                    {current.texte}
                                </p>
                            </div>

                        </div>
                    ) : (
                        <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
                            Aucun événement trouvé pour aujourd'hui.
                        </p>
                    )}

                </Card>
            </div>
        </div>
    )
}