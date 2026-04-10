"use client"
import { useState, useEffect } from "react"
import Card from "./Card"

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
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [touchStartX, setTouchStartX] = useState<number | null>(null)

    const today = new Date()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" })

    useEffect(() => {
        fetch("/api/films")
            .then(res => res.json())
            .then(data => { setFilms(data.films ?? []); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const current = films[index]
    const goPrev = () => setIndex(i => (i - 1 + films.length) % films.length)
    const goNext = () => setIndex(i => (i + 1) % films.length)

    return (
        <Card title={`Grands films sortis un ${jour} ${mois}`} emoji="🎬" bgColor="#f0e8d8" accent="#7a5a2a">

            {films.length > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <button onClick={goPrev} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #7a5a2a44", background: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#7a5a2a" }}>‹</button>
                    <div style={{ display: "flex", gap: "6px", flex: 1, justifyContent: "center" }}>
                        {films.map((_, i) => (
                            <button key={i} onClick={() => setIndex(i)} style={{ width: i === index ? "22px" : "10px", height: "10px", borderRadius: "20px", background: i === index ? "#7a5a2a" : "#7a5a2a33", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
                        ))}
                    </div>
                    <button onClick={goNext} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #7a5a2a44", background: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#7a5a2a" }}>›</button>
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
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                        {/* Affiche */}
                        <div style={{ flexShrink: 0, width: "90px" }}>
                            {current.affiche ? (
                                <img src={current.affiche} alt={current.titre}
                                     style={{ width: "90px", height: "135px", objectFit: "cover", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }} />
                            ) : (
                                <div style={{ width: "90px", height: "135px", borderRadius: "8px", background: "rgba(122,90,42,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>🎬</div>
                            )}
                        </div>

                        {/* Infos */}
                        <div style={{ flex: 1 }}>
                            {/* Année badge */}
                            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7a5a2a", background: "rgba(122,90,42,0.12)", padding: "2px 10px", borderRadius: "20px", display: "inline-block", marginBottom: "6px" }}>
                                📅 {current.annee}
                            </span>

                            {/* Titre */}
                            <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-dark)", lineHeight: 1.2, marginBottom: "4px" }}>
                                {current.titre}
                            </p>
                            {current.titreOriginal && (
                                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "6px", fontStyle: "italic" }}>
                                    {current.titreOriginal}
                                </p>
                            )}

                            {/* Note */}
                            {current.note && (
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
                                    <span style={{ color: "#f5a623", fontSize: "0.8rem" }}>★</span>
                                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-dark)" }}>{current.note}/10</span>
                                </div>
                            )}

                            {/* Réalisateur */}
                            {current.realisateur && (
                                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "4px" }}>
                                    🎥 <strong>{current.realisateur}</strong>
                                </p>
                            )}

                            {/* Acteurs */}
                            {current.acteurs.length > 0 && (
                                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                    🎭 {current.acteurs.join(" · ")}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <p style={{ color: "var(--text-muted)", textAlign: "center" }}>Aucun film trouvé.</p>
                )}

                {/* Synopsis */}
                {current?.synopsis && (
                    <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--text-muted)", marginTop: "14px", borderLeft: "3px solid #7a5a2a33", paddingLeft: "12px" }}>
                        {current.synopsis}
                    </p>
                )}
            </div>
        </Card>
    )
}