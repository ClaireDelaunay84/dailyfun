"use client"
import { useState, useEffect } from "react"
import styles from "../page.module.css"

type Evenement = { annee: number; texte: string; imageUrl: string | null }

export default function ArriveCard() {
    const [evenements, setEvenements] = useState<Evenement[]>([])
    const [selected, setSelected] = useState(0)
    const [loading, setLoading] = useState(true)

    const today = new Date()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" })
    const MM = String(today.getMonth() + 1).padStart(2, "0")
    const DD = String(today.getDate()).padStart(2, "0")

    useEffect(() => {
        fetch(`/api/onthisday?type=events`)
            .then(r => r.json())
            .then(data => {
                const sorted = [...(data?.events ?? [])].sort((a: any, b: any) => b.year - a.year)
                const step = Math.floor(sorted.length / 5)
                const selection = [0, 1, 2, 3, 4]
                    .map(i => sorted[i * step] ?? sorted[i])
                    .filter(Boolean)
                    .map((e: any) => ({
                        annee: e.year,
                        texte: e.text,
                        imageUrl: e.pages?.[0]?.thumbnail?.source ?? null,
                    }))
                setEvenements(selection)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [MM, DD])

    const current = evenements[selected]

    if (loading) return (
        <div className={styles.heroTeal}>
            <div className={styles.badge}>C'EST ARRIVÉ</div>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}>Chargement...</p>
        </div>
    )

    if (!current) return (
        <div className={styles.heroTeal}>
            <div className={styles.badge}>C'EST ARRIVÉ</div>
            <p style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}>Aucun événement trouvé.</p>
        </div>
    )

    return (
        <div>
            {/* ── Hero teal ── */}
            <div className={styles.heroTeal} style={{ marginBottom: 12 }}>
                <div className={styles.badge}>C'EST ARRIVÉ UN {jour} {mois.toUpperCase()}</div>

                <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 12 }}>
                    <div style={{
                        width: 72, height: 72, borderRadius: 12, flexShrink: 0,
                        overflow: "hidden", background: "rgba(255,255,255,.1)",
                        border: "1px solid rgba(255,255,255,.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        {current.imageUrl
                            ? <img src={`/api/wiki-image?url=${encodeURIComponent(current.imageUrl)}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <span style={{ fontSize: 28 }}>📅</span>
                        }
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 32, fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: 8 }}>
                            En {current.annee}
                        </p>
                        <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,.8)" }}>
                            {current.texte}
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Liste des autres événements ── */}
            {evenements.length > 1 && (
                <div className={styles.card}>
                    <div className={styles.cardTitle}>AUTRES ÉVÉNEMENTS</div>
                    {evenements.map((e, i) => (
                        <div
                            key={i}
                            onClick={() => setSelected(i)}
                            style={{
                                display: "flex", gap: 12, alignItems: "flex-start",
                                padding: "9px 8px", borderRadius: 8, cursor: "pointer",
                                background: i === selected ? "var(--teal3)" : "transparent",
                                transition: "background .15s",
                                borderBottom: i < evenements.length - 1 ? "1px solid var(--border)" : "none",
                            }}
                        >
                            <span style={{
                                fontSize: 12, fontWeight: 900,
                                color: i === selected ? "var(--teal)" : "var(--teal)",
                                minWidth: 36, flexShrink: 0, paddingTop: 1,
                            }}>{e.annee}</span>
                            <p style={{
                                fontSize: 12, lineHeight: 1.55,
                                color: i === selected ? "var(--teal)" : "var(--text-dark)",
                                fontWeight: i === selected ? 600 : 400,
                            }}>
                                {e.texte.length > 100 ? e.texte.slice(0, 100) + "…" : e.texte}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}