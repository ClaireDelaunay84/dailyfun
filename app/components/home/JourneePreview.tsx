"use client"
import styles from "../../page.module.css"
import { getJourneesduJour } from "../../data/journeesInternationales"

export default function JourneePreview() {
    const journees = getJourneesduJour()
    if (!journees.length) return null
    const j = journees[0]

    return (
        <div className={styles.journeeCard} style={{ borderRadius: "var(--radius)" }}>
            <div className={styles.mcLabel}>JOURNÉE MONDIALE 🌍</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4 }}>
                <span style={{ fontSize: 34 }}>🌍</span>
                <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "var(--teal)", lineHeight: 1.2 }}>
                        {j.nom}
                    </div>
                    {j.description && (
                        <div style={{ fontSize: 11, color: "rgba(0,85,90,.7)", marginTop: 4, lineHeight: 1.5 }}>
                            {j.description.slice(0, 80)}{j.description.length > 80 ? "…" : ""}
                        </div>
                    )}
                </div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "var(--teal)", marginTop: 10, opacity: 0.7 }}>
                En savoir plus ›
            </div>
        </div>
    )
}