"use client"
import { useState, useEffect } from "react"
import Card from "./Card"

type Personne = {
    nom: string
    anneeNaissance: number | null
    anneeDeces: number
    age: number | null
    description: string
    emoji: string
    imageUrl: string | null
    extrait: string | null
}

function getEmojiMetier(description: string): string {
    const d = description.toLowerCase()
    if (d.includes("acteur") || d.includes("actrice") || d.includes("cinéma") || d.includes("film")) return "🎬"
    if (d.includes("chanteur") || d.includes("chanteuse") || d.includes("musicien") || d.includes("musicienne") || d.includes("chant")) return "🎤"
    if (d.includes("footballeur") || d.includes("tennis") || d.includes("sportif") || d.includes("sportive") || d.includes("athlète") || d.includes("cycliste") || d.includes("nageur")) return "🏆"
    if (d.includes("écrivain") || d.includes("romancier") || d.includes("poète") || d.includes("auteur") || d.includes("auteure")) return "✍️"
    if (d.includes("physicien") || d.includes("chimiste") || d.includes("biologiste") || d.includes("scientifique") || d.includes("chercheur")) return "🔬"
    if (d.includes("mathématicien") || d.includes("mathématicienne")) return "🔢"
    if (d.includes("peintre") || d.includes("sculpteur") || d.includes("artiste")) return "🎨"
    if (d.includes("philosophe")) return "🧠"
    if (d.includes("président") || d.includes("ministre") || d.includes("politique") || d.includes("roi") || d.includes("reine")) return "🏛️"
    if (d.includes("médecin") || d.includes("chirurgien") || d.includes("docteur")) return "🩺"
    if (d.includes("architecte")) return "🏗️"
    if (d.includes("réalisateur") || d.includes("réalisatrice")) return "🎥"
    if (d.includes("comédien") || d.includes("comédienne") || d.includes("humoriste")) return "🎭"
    if (d.includes("astronaute") || d.includes("cosmonaute")) return "🚀"
    if (d.includes("photographe")) return "📷"
    if (d.includes("compositeur") || d.includes("compositrice")) return "🎼"
    if (d.includes("journaliste")) return "📰"
    if (d.includes("avocat") || d.includes("avocate") || d.includes("juge")) return "⚖️"
    if (d.includes("général") || d.includes("militaire") || d.includes("amiral")) return "🎖️"
    if (d.includes("explorateur") || d.includes("exploratrice")) return "🧭"
    if (d.includes("ingénieur") || d.includes("ingénieure")) return "⚙️"
    if (d.includes("cuisinier") || d.includes("cuisinière") || d.includes("chef")) return "👨‍🍳"
    if (d.includes("danseur") || d.includes("danseuse")) return "💃"
    if (d.includes("boxeur") || d.includes("boxeuse")) return "🥊"
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
                const selection = avecImage.length >= 5
                    ? avecImage.slice(0, 5)
                    : [...avecImage, ...deaths.filter((b: any) => !b.pages?.[0]?.thumbnail?.source)].slice(0, 5)

                const formatted: Personne[] = await Promise.all(selection.map(async (b: any) => {
                    const description = b.pages?.[0]?.description ?? b.text ?? ""
                    const imageUrl = b.pages?.[0]?.thumbnail?.source
                        ? b.pages[0].thumbnail.source.replace(/\/\d+px-/, "/400px-")
                        : null
                    const nom = b.pages?.[0]?.titles?.normalized ?? b.text?.split(",")[0] ?? "Inconnu"

                    // Calcul de l'âge au décès depuis le texte (ex: "1920 – 2005")
                    const anneeNaissance = b.pages?.[0]?.description?.match(/\b(1[0-9]{3}|[0-9]{3})\b/)?.[0]
                        ? null
                        : null

                    // Fetch résumé Wikipedia
                    let extrait: string | null = b.pages?.[0]?.extract ?? null
                    if (!extrait && nom !== "Inconnu") {
                        try {
                            const res = await fetch(
                                `https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nom)}`
                            )
                            const summary = await res.json()
                            extrait = summary?.extract ?? null
                        } catch {
                            extrait = null
                        }
                    }

                    // Tente d'extraire l'année de naissance depuis l'extrait
                    let anneeNaissanceParsed: number | null = null
                    if (extrait) {
                        const match = extrait.match(/née? (?:le )?\d{1,2}[^\d]+(\d{4})|(\d{4})\s*[-–]\s*\d{4}/)
                        if (match) anneeNaissanceParsed = parseInt(match[1] ?? match[2])
                    }

                    const age = anneeNaissanceParsed ? b.year - anneeNaissanceParsed : null

                    return {
                        nom,
                        anneeNaissance: anneeNaissanceParsed,
                        anneeDeces: b.year,
                        age,
                        description,
                        emoji: getEmojiMetier(description),
                        imageUrl,
                        extrait,
                    }
                }))

                setPersonnes(formatted)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [MM, DD])

    // Flip automatique toutes les 20s, décalé de 17s
    useEffect(() => {
        if (personnes.length <= 1) return
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setFlipped(true)
                setTimeout(() => {
                    setIndex(i => (i + 1) % personnes.length)
                    setFlipped(false)
                }, 600)
            }, 20000)
            return () => clearInterval(interval)
        }, 17000)
        return () => clearTimeout(timeout)
    }, [personnes.length])

    const current = personnes[index]

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
                <Card title={`Ils sont partis un ${jour} ${mois}`} emoji="🕯️" accent="#FFB5A7">

                    {/* Indicateurs */}
                    {personnes.length > 1 && (
                        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
                            {personnes.map((_, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setFlipped(true)
                                        setTimeout(() => { setIndex(i); setFlipped(false) }, 600)
                                    }}
                                    style={{
                                        height: "3px", flex: 1, borderRadius: "4px",
                                        background: i === index ? "#FFB5A7" : "#FFB5A733",
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
                        <>
                            {/* Photo + Infos */}
                            <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>

                                {/* Photo */}
                                <div style={{ position: "relative", flexShrink: 0 }}>
                                    <div style={{
                                        width: "72px", height: "72px", borderRadius: "50%",
                                        overflow: "hidden",
                                        background: "linear-gradient(135deg, #FFB5A744, #FFC8DD44)",
                                        border: "2px solid #FFB5A766",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}>
                                        {current.imageUrl ? (
                                            <img
                                                src={current.imageUrl}
                                                alt={current.nom}
                                                style={{ width: "100%", height: "100%", objectFit: "cover",objectPosition: "top center", }}
                                            />
                                        ) : (
                                            <span style={{ fontSize: "2rem" }}>{current.emoji}</span>
                                        )}
                                    </div>
                                    {/* Badge emoji métier */}
                                    <div style={{
                                        position: "absolute", bottom: -4, right: -4,
                                        background: "white",
                                        borderRadius: "50%",
                                        width: "24px", height: "24px",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "0.85rem",
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                        border: "1px solid #FFB5A733",
                                    }}>
                                        {current.emoji}
                                    </div>
                                </div>

                                {/* Infos */}
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        fontSize: "1rem",
                                        fontWeight: 700,
                                        fontFamily: "var(--font-poppins)",
                                        color: "var(--text-dark)",
                                        marginBottom: "4px",
                                        lineHeight: 1.2,
                                    }}>
                                        {current.nom}
                                    </p>
                                    <p style={{
                                        fontSize: "0.78rem",
                                        color: "var(--text-muted)",
                                        marginBottom: "6px",
                                    }}>
                                        {current.description}
                                    </p>
                                    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                                        <span style={{
                                            fontSize: "0.75rem",
                                            fontWeight: 700,
                                            color: "#FFB5A7",
                                            fontFamily: "var(--font-poppins)",
                                        }}>
                                            🕯️ {current.anneeDeces}
                                        </span>
                                        {current.anneeNaissance && (
                                            <span style={{
                                                fontSize: "0.72rem",
                                                color: "var(--text-muted)",
                                                background: "#FFB5A718",
                                                padding: "2px 8px",
                                                borderRadius: "20px",
                                            }}>
                                                né(e) en {current.anneeNaissance}
                                            </span>
                                        )}
                                        {current.age && (
                                            <span style={{
                                                fontSize: "0.72rem",
                                                color: "var(--text-muted)",
                                                background: "#FFB5A718",
                                                padding: "2px 8px",
                                                borderRadius: "20px",
                                            }}>
                                                {current.age} ans
                                            </span>
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* Résumé */}
                            {current.extrait && (
                                <p style={{
                                    fontSize: "0.82rem",
                                    lineHeight: 1.7,
                                    color: "var(--text-muted)",
                                    marginTop: "14px",
                                    borderLeft: "3px solid #FFB5A744",
                                    paddingLeft: "12px",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical" as const,
                                    overflow: "hidden",
                                }}>
                                    {current.extrait}
                                </p>
                            )}
                        </>
                    ) : (
                        <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
                            Aucun décès trouvé pour aujourd'hui.
                        </p>
                    )}

                </Card>
            </div>
        </div>
    )
}