"use client"
import { useState, useEffect } from "react"
import Card from "./Card"

type Personne = { nom: string; anneeNaissance: number | null; anneeDeces: number; age: number | null; description: string; emoji: string; imageUrl: string | null; extrait: string | null }

function getEmojiMetier(d: string): string {
    const s = d.toLowerCase()
    if (s.includes("acteur") || s.includes("actrice") || s.includes("cinéma")) return "🎬"
    if (s.includes("chanteur") || s.includes("chanteuse") || s.includes("musicien")) return "🎤"
    if (s.includes("footballeur") || s.includes("tennis") || s.includes("sportif") || s.includes("athlète")) return "🏆"
    if (s.includes("écrivain") || s.includes("romancier") || s.includes("poète") || s.includes("auteur")) return "✍️"
    if (s.includes("physicien") || s.includes("chimiste") || s.includes("scientifique")) return "🔬"
    if (s.includes("peintre") || s.includes("sculpteur") || s.includes("artiste")) return "🎨"
    if (s.includes("philosophe")) return "🧠"
    if (s.includes("président") || s.includes("ministre") || s.includes("politique")) return "🏛️"
    if (s.includes("réalisateur") || s.includes("réalisatrice")) return "🎥"
    if (s.includes("compositeur") || s.includes("compositrice")) return "🎼"
    if (s.includes("astronaute")) return "🚀"
    if (s.includes("journaliste")) return "📰"
    return "⭐"
}

export default function DecesCard() {
    const [personnes, setPersonnes] = useState<Personne[]>([])
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped] = useState(false)
    const [loading, setLoading] = useState(true)

    const today = new Date()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" })
    const MM = String(today.getMonth() + 1).padStart(2, "0")
    const DD = String(today.getDate()).padStart(2, "0")

    useEffect(() => {
        fetch(`https://fr.wikipedia.org/api/rest_v1/feed/onthisday/deaths/${MM}/${DD}`)
            .then(res => res.json())
            .then(async data => {
                const deaths = data?.deaths ?? []
                const avecImage = deaths.filter((b: any) => b.pages?.[0]?.thumbnail?.source)
                const selection = avecImage.length >= 5 ? avecImage.slice(0, 5) : [...avecImage, ...deaths.filter((b: any) => !b.pages?.[0]?.thumbnail?.source)].slice(0, 5)
                const formatted: Personne[] = await Promise.all(selection.map(async (b: any) => {
                    const description = b.pages?.[0]?.description ?? b.text ?? ""
                    const nom = b.pages?.[0]?.titles?.normalized ?? b.text?.split(",")[0] ?? "Inconnu"
                    let extrait: string | null = b.pages?.[0]?.extract ?? null
                    if (!extrait && nom !== "Inconnu") {
                        try {
                            const res = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nom)}`)
                            extrait = (await res.json())?.extract ?? null
                        } catch { extrait = null }
                    }
                    let anneeNaissanceParsed: number | null = null
                    if (extrait) {
                        const match = extrait.match(/née? (?:le )?\d{1,2}[^\d]+(\d{4})|(\d{4})\s*[-–]\s*\d{4}/)
                        if (match) anneeNaissanceParsed = parseInt(match[1] ?? match[2])
                    }
                    return {
                        nom, anneeNaissance: anneeNaissanceParsed, anneeDeces: b.year,
                        age: anneeNaissanceParsed ? b.year - anneeNaissanceParsed : null,
                        description, emoji: getEmojiMetier(description),
                        imageUrl: b.pages?.[0]?.thumbnail?.source?.replace(/\/\d+px-/, "/400px-") ?? null,
                        extrait,
                    }
                }))
                setPersonnes(formatted); setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [MM, DD])

    useEffect(() => {
        if (personnes.length <= 1) return
        const t = setTimeout(() => {
            const interval = setInterval(() => {
                setFlipped(true)
                setTimeout(() => { setIndex(i => (i + 1) % personnes.length); setFlipped(false) }, 600)
            }, 20000)
            return () => clearInterval(interval)
        }, 17000)
        return () => clearTimeout(t)
    }, [personnes.length])

    const current = personnes[index]

    return (
        <div style={{ perspective: "1200px", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ transition: "transform 0.6s ease", transformStyle: "preserve-3d", transform: flipped ? "rotateX(90deg)" : "rotateX(0deg)", transformOrigin: "center center", flex: 1, display: "flex", flexDirection: "column" }}>
                <Card title={`Ils sont partis un ${jour} ${mois}`} emoji="🕯️" bgColor="#d0dcea" accent="#3a4a6a">
                    {personnes.length > 1 && (
                        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
                            {personnes.map((_, i) => (
                                <div key={i} onClick={() => { setFlipped(true); setTimeout(() => { setIndex(i); setFlipped(false) }, 600) }}
                                     style={{ height: "3px", flex: 1, borderRadius: "4px", background: i === index ? "#3a4a6a" : "#3a4a6a33", cursor: "pointer", transition: "background 0.3s" }}
                                />
                            ))}
                        </div>
                    )}
                    {loading ? (
                        <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>Chargement...</div>
                    ) : current ? (
                        <>
                            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                                <div style={{ position: "relative", flexShrink: 0 }}>
                                    <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", background: "rgba(58,74,106,0.12)", border: "2px solid #3a4a6a33", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {current.imageUrl
                                            ? <img src={current.imageUrl} alt={current.nom} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                                            : <span style={{ fontSize: "2rem" }}>{current.emoji}</span>
                                        }
                                    </div>
                                    <div style={{ position: "absolute", bottom: -4, right: -4, background: "white", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}>
                                        {current.emoji}
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "var(--font-jost)", color: "var(--text-dark)", marginBottom: "4px", lineHeight: 1.2 }}>{current.nom}</p>
                                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "6px" }}>{current.description}</p>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3a4a6a" }}>🕯️ {current.anneeDeces}</span>
                                        {current.anneeNaissance && <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", background: "rgba(58,74,106,0.08)", padding: "2px 8px", borderRadius: "20px" }}>né(e) en {current.anneeNaissance}</span>}
                                        {current.age && <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", background: "rgba(58,74,106,0.08)", padding: "2px 8px", borderRadius: "20px" }}>{current.age} ans</span>}
                                    </div>
                                </div>
                            </div>
                            {current.extrait && (
                                <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--text-muted)", marginTop: "14px", borderLeft: "3px solid #3a4a6a33", paddingLeft: "12px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                                    {current.extrait}
                                </p>
                            )}
                        </>
                    ) : (
                        <p style={{ color: "var(--text-muted)", textAlign: "center" }}>Aucun décès trouvé.</p>
                    )}
                </Card>
            </div>
        </div>
    )
}
