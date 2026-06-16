import styles from "../page.module.css"
import { getFeteduJour } from "../data/fetes"

export default function FeteCard({ compact = false }: { compact?: boolean }) {
    const fete = getFeteduJour()

    if (compact) {
        return (
            <div className={styles.card}>
                <div className={styles.cardTitle}>FÊTE DU JOUR</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "var(--teal)", marginBottom: 3 }}>
                    🌸 {fete.prenom}
                </div>
                {fete.anecdote && (
                    <p style={{ fontSize: 12, color: "var(--text-mid)", lineHeight: 1.5 }}>
                        {fete.anecdote.slice(0, 100)}{fete.anecdote.length > 100 ? "…" : ""}
                    </p>
                )}
            </div>
        )
    }

    return (
        <div>
            <div className={styles.heroTeal} style={{ marginBottom: 12 }}>
                <div className={styles.badge}>FÊTE DU JOUR</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: "8px 0 4px" }}>
                    🌸 {fete.prenom}
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.cardTitle}>À PROPOS</div>
                {fete.anecdote && (
                    <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-mid)", fontStyle: "italic", borderLeft: "3px solid var(--mimosa)", paddingLeft: 12 }}>
                        {fete.anecdote}
                    </p>
                )}
            </div>
        </div>
    )
}