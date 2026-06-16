"use client"
import { useState, useEffect } from "react"
import styles from "../page.module.css"

type Film = {
    id: number
    titre: string
    titreOriginal: string | null
    annee: string
    affiche: string | null
    synopsis: string
    note: number | null
    realisateur: string | null
    acteurs: string[]
}

export default function FilmsCard() {
    const [films, setFilms] = useState<Film[]>([])
    const [selected, setSelected] = useState(0)
    const [loading, setLoading] = useState(true)

    const today = new Date()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" })

    useEffect(() => {
        fetch("/api/films")
            .then(res => res.json())
            .then(data => { setFilms(data.films ?? []); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const current = films[selected]

    if (loading) return (
        <div className={styles.heroTeal}>
            <div className={styles.badge}>CINÉMA</div>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}>Chargement des films...</p>
        </div>
    )

    if (!current) return (
        <div className={styles.heroTeal}>
            <div className={styles.badge}>CINÉMA</div>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}>Aucun film trouvé.</p>
        </div>
    )

    return (
        <div>
            {/* ── Hero teal : film sélectionné ── */}
            <div className={styles.heroTeal} style={{ marginBottom: 12 }}>
                <div className={styles.badge}>FILMS SORTIS UN {jour} {mois.toUpperCase()}</div>

                <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 10 }}>
                    {/* Affiche */}
                    <div style={{
                        width: 90, height: 130, borderRadius: 10, flexShrink: 0,
                        overflow: "hidden", background: "rgba(255,255,255,.1)",
                        border: "1px solid rgba(255,255,255,.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        {current.affiche
                            ? <img src={current.affiche} alt={current.titre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <span style={{ fontSize: 32 }}>🎬</span>
                        }
                    </div>

                    {/* Infos */}
                    <div style={{ flex: 1 }}>
                        <span style={{
                            fontSize: 10, fontWeight: 800, color: "var(--mimosa)",
                            background: "rgba(255,201,75,.15)", padding: "2px 9px",
                            borderRadius: 5, display: "inline-block", marginBottom: 7,
                        }}>📅 {current.annee}</span>

                        <p style={{ fontSize: 18, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 5 }}>
                            {current.titre}
                        </p>
                        {current.titreOriginal && current.titreOriginal !== current.titre && (
                            <p style={{ fontSize: 11, color: "rgba(255,255,255,.55)", fontStyle: "italic", marginBottom: 5 }}>
                                {current.titreOriginal}
                            </p>
                        )}
                        {current.note && (
                            <p style={{ fontSize: 12, color: "var(--mimosa)", fontWeight: 700, marginBottom: 4 }}>
                                ★ {current.note}/10
                            </p>
                        )}
                        {current.realisateur && (
                            <p style={{ fontSize: 11, color: "rgba(255,255,255,.7)", marginBottom: 3 }}>
                                🎥 <strong>{current.realisateur}</strong>
                            </p>
                        )}
                        {current.acteurs.length > 0 && (
                            <p style={{ fontSize: 11, color: "rgba(255,255,255,.6)" }}>
                                🎭 {current.acteurs.join(" · ")}
                            </p>
                        )}
                    </div>
                </div>

                {current.synopsis && (
                    <p style={{
                        fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,.7)",
                        marginTop: 14, borderLeft: "3px solid var(--mimosa)", paddingLeft: 12,
                    }}>
                        {current.synopsis}
                    </p>
                )}
            </div>

            {/* ── Liste des autres films ── */}
            {films.length > 1 && (
                <div className={styles.card}>
                    <div className={styles.cardTitle}>TOUS LES FILMS DU JOUR</div>
                    {films.map((f, i) => (
                        <div
                            key={f.id}
                            onClick={() => setSelected(i)}
                            style={{
                                display: "flex", gap: 12, alignItems: "center",
                                padding: "10px 8px", borderRadius: 10, cursor: "pointer",
                                background: i === selected ? "var(--teal3)" : "transparent",
                                transition: "background .15s",
                                borderBottom: i < films.length - 1 ? "1px solid var(--border)" : "none",
                            }}
                        >
                            <div style={{
                                width: 40, height: 56, borderRadius: 6, flexShrink: 0,
                                overflow: "hidden", background: "var(--teal3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                {f.affiche
                                    ? <img src={f.affiche} alt={f.titre} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    : <span style={{ fontSize: 18 }}>🎬</span>
                                }
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{
                                    fontSize: 13, fontWeight: i === selected ? 800 : 600,
                                    color: i === selected ? "var(--teal)" : "var(--text-dark)",
                                    lineHeight: 1.3, marginBottom: 2,
                                }}>{f.titre}</p>
                                <p style={{ fontSize: 11, color: "var(--text-mid)" }}>
                                    {f.realisateur} · {f.annee}
                                    {f.note ? <span style={{ color: "var(--teal)", fontWeight: 700, marginLeft: 6 }}>★ {f.note}</span> : null}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}