"use client"
import { useState, useEffect } from "react"
import styles from "../page.module.css"

type Personne = {
    nom: string; annee: number; age: number
    description: string; emoji: string
    imageUrl: string | null; extrait: string | null
}

function getEmoji(d: string): string {
    const s = d.toLowerCase()
    if (s.includes("acteur") || s.includes("actrice") || s.includes("cinéma")) return "🎬"
    if (s.includes("chanteur") || s.includes("chanteuse") || s.includes("musicien")) return "🎤"
    if (s.includes("footballeur") || s.includes("tennis") || s.includes("sportif")) return "🏆"
    if (s.includes("écrivain") || s.includes("romancier") || s.includes("poète")) return "✍️"
    if (s.includes("scientifique") || s.includes("physicien")) return "🔬"
    if (s.includes("peintre") || s.includes("artiste")) return "🎨"
    if (s.includes("philosophe")) return "🧠"
    if (s.includes("président") || s.includes("ministre")) return "🏛️"
    if (s.includes("réalisateur")) return "🎥"
    return "⭐"
}

export default function NaissancesCard() {
    const [personnes, setPersonnes] = useState<Personne[]>([])
    const [selected, setSelected] = useState(0)
    const [loading, setLoading] = useState(true)

    const today = new Date()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" })
    const MM = String(today.getMonth() + 1).padStart(2, "0")
    const DD = String(today.getDate()).padStart(2, "0")
    const anneeActuelle = today.getFullYear()

    useEffect(() => {
        fetch(`/api/onthisday?type=births`)
            .then(r => r.json())
            .then(data => {
                const births = data?.births ?? []
                const avecImage = births.filter((b: any) => b.pages?.[0]?.thumbnail?.source)
                const sel = avecImage.length >= 5
                    ? avecImage.slice(0, 5)
                    : [...avecImage, ...births.filter((b: any) => !b.pages?.[0]?.thumbnail?.source)].slice(0, 5)
                setPersonnes(sel.map((b: any) => ({
                    nom: b.pages?.[0]?.titles?.normalized ?? b.text?.split(",")[0] ?? "Inconnu",
                    annee: b.year,
                    age: anneeActuelle - b.year,
                    description: b.pages?.[0]?.description ?? b.text ?? "",
                    emoji: getEmoji(b.pages?.[0]?.description ?? ""),
                    imageUrl: b.pages?.[0]?.thumbnail?.source ?? null,
                    extrait: b.pages?.[0]?.extract ?? null,
                })))
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [MM, DD])

    const current = personnes[selected]

    if (loading) return (
        <div className={styles.heroTeal}>
            <div className={styles.badge}>NAISSANCES</div>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}>Chargement...</p>
        </div>
    )

    if (!current) return (
        <div className={styles.heroTeal}>
            <div className={styles.badge}>NAISSANCES</div>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}>Aucune naissance trouvée.</p>
        </div>
    )

    return (
        <div>
            {/* ── Hero teal ── */}
            <div className={styles.heroTeal} style={{ marginBottom: 12 }}>
                <div className={styles.badge}>ILS SONT NÉS UN {jour} {mois.toUpperCase()}</div>

                <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 12 }}>
                    {/* Photo */}
                    <div style={{
                        width: 72, height: 72, borderRadius: "50%", flexShrink: 0,
                        overflow: "hidden", background: "rgba(255,255,255,.1)",
                        border: "2px solid rgba(255,255,255,.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        {current.imageUrl
                            ? <img src={`/api/wiki-image?url=${encodeURIComponent(current.imageUrl)}`} alt={current.nom} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                            : <span style={{ fontSize: 28 }}>{current.emoji}</span>
                        }
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>
                            {current.nom}
                        </p>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,.65)", marginBottom: 6 }}>
                            {current.description}
                        </p>
                        <div style={{ display: "flex", gap: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: "var(--mimosa)" }}>🎂 {current.annee}</span>
                            <span style={{
                                fontSize: 11, color: "rgba(255,255,255,.6)",
                                background: "rgba(255,255,255,.12)", padding: "2px 8px", borderRadius: 20,
                            }}>{current.age} ans</span>
                        </div>
                    </div>
                </div>

                {current.extrait && (
                    <p style={{
                        fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,.7)",
                        marginTop: 14, borderLeft: "3px solid var(--mimosa)", paddingLeft: 12,
                    }}>
                        {current.extrait.slice(0, 300)}{current.extrait.length > 300 ? "…" : ""}
                    </p>
                )}
            </div>

            {/* ── Liste des autres ── */}
            {personnes.length > 1 && (
                <div className={styles.card}>
                    <div className={styles.cardTitle}>AUTRES NAISSANCES</div>
                    {personnes.map((p, i) => (
                        <div
                            key={i}
                            onClick={() => setSelected(i)}
                            style={{
                                display: "flex", gap: 12, alignItems: "center",
                                padding: "9px 8px", borderRadius: 8, cursor: "pointer",
                                background: i === selected ? "var(--teal3)" : "transparent",
                                transition: "background .15s",
                                borderBottom: i < personnes.length - 1 ? "1px solid var(--border)" : "none",
                            }}
                        >
                            <div style={{
                                width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                                overflow: "hidden", background: "var(--teal3)",
                                border: "1.5px solid var(--border)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                {p.imageUrl
                                    ? <img src={`/api/wiki-image?url=${encodeURIComponent(p.imageUrl)}`} alt={p.nom} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                                    : <span style={{ fontSize: 16 }}>{p.emoji}</span>
                                }
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{
                                    fontSize: 13, fontWeight: i === selected ? 800 : 600,
                                    color: i === selected ? "var(--teal)" : "var(--text-dark)",
                                    marginBottom: 2,
                                }}>{p.nom}</p>
                                <p style={{ fontSize: 11, color: "var(--text-mid)" }}>
                                    {p.description.slice(0, 50)}{p.description.length > 50 ? "…" : ""}
                                    <span style={{ color: "var(--teal)", fontWeight: 700, marginLeft: 6 }}>🎂 {p.annee}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}