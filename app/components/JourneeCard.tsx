"use client"
import { useState } from "react"
import styles from "../page.module.css"
import { getJourneesduJour } from "../data/journeesInternationales"

export default function JourneeCard() {
    const journees = getJourneesduJour()
    const [selected, setSelected] = useState(0)

    const current = journees[selected]

    if (!current) return null

    return (
        <div>
            {/* ── Hero mimosa ── */}
            <div style={{
                background: "var(--mimosa)", borderRadius: "var(--radius)",
                padding: 20, marginBottom: 12,
            }}>
                <div style={{
                    fontSize: 9, fontWeight: 900, letterSpacing: "1.2px",
                    color: "rgba(0,85,90,.6)", textTransform: "uppercase", marginBottom: 12,
                }}>
                    JOURNÉE MONDIALE 🌍
                </div>

                <p style={{ fontSize: 22, fontWeight: 900, color: "var(--teal)", lineHeight: 1.2, marginBottom: 10 }}>
                    {current.nom}
                </p>

                <p style={{
                    fontSize: 14, lineHeight: 1.75, color: "var(--teal)",
                    borderLeft: "3px solid rgba(0,85,90,.25)", paddingLeft: 14,
                    opacity: 0.85,
                }}>
                    {current.description}
                </p>
            </div>

            {/* ── Liste des autres journées (si plusieurs ce jour) ── */}
            {journees.length > 1 && (
                <div className={styles.card}>
                    <div className={styles.cardTitle}>AUTRES JOURNÉES DU JOUR</div>
                    {journees.map((j, i) => (
                        <div
                            key={i}
                            onClick={() => setSelected(i)}
                            style={{
                                padding: "10px 8px", borderRadius: 8, cursor: "pointer",
                                background: i === selected ? "var(--mimosa3)" : "transparent",
                                transition: "background .15s",
                                borderBottom: i < journees.length - 1 ? "1px solid var(--border)" : "none",
                            }}
                        >
                            <p style={{
                                fontSize: 13, fontWeight: i === selected ? 800 : 600,
                                color: i === selected ? "var(--teal)" : "var(--text-dark)",
                                marginBottom: 3,
                            }}>🌍 {j.nom}</p>
                            <p style={{ fontSize: 11, color: "var(--text-mid)", lineHeight: 1.4 }}>
                                {j.description.slice(0, 80)}{j.description.length > 80 ? "…" : ""}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}