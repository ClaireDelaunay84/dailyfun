"use client"
import { useState, useEffect } from "react"
import Card from "./Card"

type Personne = { nom: string; annee: number; age: number; description: string; emoji: string; imageUrl: string | null; extrait: string | null }

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

export default function NaissancesCard() {
    const [personnes, setPersonnes] = useState<Personne[]>([])
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [touchStartX, setTouchStartX] = useState<number | null>(null)

    const today = new Date()
    const anneeActuelle = today.getFullYear()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" })
    const MM = String(today.getMonth() + 1).padStart(2, "0")
    const DD = String(today.getDate()).padStart(2, "0")

    useEffect(() => {
        fetch(`/api/onthisday?type=births`)
            .then(res => res.json())
            .then(data => {
                const births = data?.births ?? []
                const avecImage = births.filter((b: any) => b.pages?.[0]?.thumbnail?.source)
                const selection = avecImage.length >= 5 ? avecImage.slice(0, 5) : [...avecImage, ...births.filter((b: any) => !b.pages?.[0]?.thumbnail?.source)].slice(0, 5)
                setPersonnes(selection.map((b: any) => ({
                    nom: b.pages?.[0]?.titles?.normalized ?? b.text?.split(",")[0] ?? "Inconnu",
                    annee: b.year, age: anneeActuelle - b.year,
                    description: b.pages?.[0]?.description ?? b.text ?? "",
                    emoji: getEmojiMetier(b.pages?.[0]?.description ?? ""),
                    imageUrl: b.pages?.[0]?.thumbnail?.source?.replace(/\/\d+px-/, "/400px-") ?? null,
                    extrait: b.pages?.[0]?.extract ?? null,
                })))
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [MM, DD])

    useEffect(() => {
        if (personnes.length <= 1) return
        const interval = setInterval(() => {
            setIndex(i => (i + 1) % personnes.length)
        }, 20000)
        return () => clearInterval(interval)
    }, [personnes.length])

    const goPrev = () => setIndex(i => (i - 1 + personnes.length) % personnes.length)
    const goNext = () => setIndex(i => (i + 1) % personnes.length)
    const current = personnes[index]

    return (
        <Card title={`Ils sont nés un ${jour} ${mois}`} bgColor="#D6CEC4" accent="#5C4430">
            {personnes.length > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <button onClick={goPrev} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #D9CCBA", background: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#9E7F5C" }}>‹</button>
                    <div style={{ display: "flex", gap: "6px", flex: 1, justifyContent: "center" }}>
                        {personnes.map((_, i) => (
                            <button key={i} onClick={() => setIndex(i)} style={{ width: i === index ? "22px" : "10px", height: "10px", borderRadius: "20px", background: i === index ? "#9E7F5C" : "#9E7F5C33", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
                        ))}
                    </div>
                    <button onClick={goNext} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #D9CCBA", background: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#9E7F5C" }}>›</button>
                </div>
            )}
            <div
                onTouchStart={e => setTouchStartX(e.touches[0].clientX)}
                onTouchEnd={e => {
                    if (touchStartX === null) return
                    const diff = touchStartX - e.changedTouches[0].clientX
                    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev()
                    setTouchStartX(null)
                }}
            >
                {loading ? (
                    <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)" }}>Chargement...</div>
                ) : current ? (
                    <>
                        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                            <div style={{ position: "relative", flexShrink: 0 }}>
                                <div style={{ width: "72px", height: "72px", borderRadius: "50%", overflow: "hidden", background: "rgba(158,127,92,0.12)", border: "2px solid #D9CCBA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {current.imageUrl
                                        ? <img src={`/api/wiki-image?url=${encodeURIComponent(current.imageUrl)}`} alt={current.nom} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                                        : <span style={{ fontSize: "2rem" }}>{current.emoji}</span>
                                    }
                                </div>
                                <div style={{ position: "absolute", bottom: -4, right: -4, background: "white", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}>
                                    {current.emoji}
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-dark)", marginBottom: "4px", lineHeight: 1.2 }}>{current.nom}</p>
                                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "6px" }}>{current.description}</p>
                                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9E7F5C" }}>🎂 {current.annee}</span>
                                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", background: "rgba(158,127,92,0.1)", padding: "2px 8px", borderRadius: "20px" }}>{current.age} ans</span>
                                </div>
                            </div>
                        </div>
                        {current.extrait && (
                            <p style={{
                                fontSize: "0.85rem",
                                lineHeight: 1.75,
                                color: "#555555",
                                borderLeft: "3px solid rgba(255,255,255,0.3)",
                                paddingLeft: "14px",
                                marginTop: "4px"
                            }}>
                                {current.extrait}
                            </p>
                        )}
                    </>
                ) : (
                    <p style={{color: "var(--text-muted)", textAlign: "center"}}>Aucune naissance trouvée.</p>
                )}
            </div>
        </Card>
    )
}