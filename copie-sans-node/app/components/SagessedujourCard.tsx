"use client"
import { useState } from "react"
import styles from "../page.module.css"
import { getDictonDuJour } from "../data/dictons"
import { getCitationsDuJour } from "../data/citations"

type Item = { type: string; icon: string; text: string; author: string }

export default function SagesseDuJourCard() {
    const dicton   = getDictonDuJour()
    const citations = getCitationsDuJour()

    // Dicton en premier dans la liste
    const items: Item[] = [
        ...(dicton ? [{ type: "Dicton", icon: "📖", text: dicton, author: "Proverbe" }] : []),
        ...citations.map(c => ({ type: "Citation", icon: "💬", text: c.texte, author: c.auteur })),
    ]

    const [idx, setIdx] = useState(0)
    const current = items[idx]
    if (!current) return null

    const prev = () => setIdx(i => (i - 1 + items.length) % items.length)
    const next = () => setIdx(i => (i + 1) % items.length)

    return (
        <div>
            {/* Hero teal avec le contenu courant */}
            <div className={styles.heroTeal} style={{ marginBottom: 12 }}>
                <div className={styles.badge}>{current.type.toUpperCase()} DU JOUR</div>

                {/* Nav dots */}
                {items.length > 1 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                        <div style={{ display: "flex", gap: 4 }}>
                            {items.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIdx(i)}
                                    style={{
                                        width: i === idx ? 16 : 6,
                                        height: 6,
                                        borderRadius: 20,
                                        background: i === idx ? "var(--mimosa)" : "rgba(255,255,255,.3)",
                                        border: "none", cursor: "pointer", padding: 0,
                                        transition: "all .25s",
                                    }}
                                />
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: 5, marginLeft: "auto" }}>
                            <button onClick={prev} className={styles.filmArr}>‹</button>
                            <button onClick={next} className={styles.filmArr}>›</button>
                        </div>
                    </div>
                )}

                <div style={{ fontSize: 28, marginBottom: 10 }}>{current.icon}</div>
                <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.65, fontStyle: "italic" }}>
                    "{current.text}"
                </p>
                <p style={{ fontSize: 12, opacity: 0.6, marginTop: 10 }}>— {current.author}</p>
            </div>

            {/* Liste de toutes les sagesses */}
            {items.length > 1 && (
                <div className={styles.card}>
                    <div className={styles.cardTitle}>TOUTES LES SAGESSES DU JOUR</div>
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={styles.eventRow}
                            style={{ cursor: "pointer" }}
                            onClick={() => setIdx(i)}
                        >
                            <div className={styles.eventYear}>{item.icon}</div>
                            <div>
                                <div style={{
                                    fontSize: 12, fontStyle: "italic",
                                    color: i === idx ? "var(--teal)" : "var(--text-dark)",
                                    fontWeight: i === idx ? 700 : 400,
                                    lineHeight: 1.5,
                                }}>
                                    "{item.text}"
                                </div>
                                <div style={{ fontSize: 10, color: "var(--teal)", fontWeight: 700, marginTop: 2 }}>
                                    — {item.author} · <span style={{ opacity: 0.6 }}>{item.type}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}