"use client"
import styles from "../../page.module.css"
import { getDictonDuJour } from "../../data/dictons"
import { getCitationsDuJour } from "../../data/citations"

export default function SagessePreview() {
    // Dicton en premier
    const dicton = getDictonDuJour()
    const citations = getCitationsDuJour()
    const citation = citations[0]

    // On affiche le dicton par défaut
    const isCitation = !dicton
    const text   = dicton ?? citation?.texte ?? ""
    const author = isCitation ? citation?.auteur : "Proverbe"
    const type   = isCitation ? "Citation du jour" : "Dicton du jour"
    const icon   = isCitation ? "💬" : "📖"

    return (
        <div className={styles.sagesseCard} style={{ borderRadius: "var(--radius)" }}>
            <div className={styles.sagesseType}>{type}</div>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{icon}</div>
            <div className={styles.sagesseText}>"{text}"</div>
            {author && <div className={styles.sagesseAuthor}>— {author}</div>}
            <div style={{ fontSize: 10, fontWeight: 800, color: "var(--mimosa)", marginTop: 10 }}>
                Voir plus ›
            </div>
        </div>
    )
}