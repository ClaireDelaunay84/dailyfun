"use client"
import { useState, useEffect } from "react"
import Card from "./Card"

type Evenement = { annee: number; texte: string; imageUrl: string | null }

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
                const sorted = [...events].sort((a: any, b: any) => b.year - a.year)
                const step = Math.floor(sorted.length / 5)
                const selection = [0, 1, 2, 3, 4].map(i => sorted[i * step] ?? sorted[i]).filter(Boolean)
                setEvenements(selection.map((e: any) => ({
                    annee: e.year, texte: e.text,
                    imageUrl: e.pages?.[0]?.thumbnail?.source?.replace(/\/\d+px-/, "/400px-") ?? null,
                })))
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [MM, DD])

    useEffect(() => {
        if (evenements.length <= 1) return
        const t = setTimeout(() => {
            const interval = setInterval(() => {
                setFlipped(true)
                setTimeout(() => { setIndex(i => (i + 1) % evenements.length); setFlipped(false) }, 600)
            }, 20000)
            return () => clearInterval(interval)
        }, 5000)
        return () => clearTimeout(t)
    }, [evenements.length])

    const current = evenements[index]

    return (
        <div style={{ perspective: "1200px", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ transition: "transform 0.6s ease", transformStyle: "preserve-3d", transform: flipped ? "rotateX(90deg)" : "rotateX(0deg)", transformOrigin: "center center", flex: 1, display: "flex", flexDirection: "column" }}>
                <Card title={`C'est arrivé un ${jour} ${mois}`} emoji="📅" bgColor="#c8ece6" accent="#3d8a78">
                    {evenements.length > 1 && (
                        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
                            {evenements.map((_, i) => (
                                <div key={i} onClick={() => { setFlipped(true); setTimeout(() => { setIndex(i); setFlipped(false) }, 600) }}
                                     style={{ height: "3px", flex: 1, borderRadius: "4px", background: i === index ? "#3d8a78" : "#3d8a7833", cursor: "pointer", transition: "background 0.3s" }}
                                />
                            ))}
                        </div>
                    )}
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>Chargement...</div>
                    ) : current ? (
                        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                            <div style={{ width: "72px", height: "72px", borderRadius: "12px", flexShrink: 0, overflow: "hidden", background: "rgba(61,138,120,0.12)", border: "2px solid #3d8a7833", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {current.imageUrl
                                    ? <img src={current.imageUrl} alt={current.texte} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    : <span style={{ fontSize: "2rem" }}>📅</span>
                                }
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#3d8a78", fontFamily: "var(--font-jost)", letterSpacing: "1px", marginBottom: "6px" }}>En {current.annee}</p>
                                <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "var(--text-dark)" }}>{current.texte}</p>
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: "var(--text-muted)", textAlign: "center" }}>Aucun événement trouvé.</p>
                    )}
                </Card>
            </div>
        </div>
    )
}
