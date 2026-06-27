"use client"
import { useState, useEffect } from "react"
import styles from "../page.module.css"

const SIGNES = [
    { id: "belier",      label: "Bélier",      symbol: "♈", dates: "21 mars – 19 avr." },
    { id: "taureau",     label: "Taureau",      symbol: "♉", dates: "20 avr. – 20 mai" },
    { id: "gemeaux",     label: "Gémeaux",      symbol: "♊", dates: "21 mai – 20 juin" },
    { id: "cancer",      label: "Cancer",       symbol: "♋", dates: "21 juin – 22 juil." },
    { id: "lion",        label: "Lion",         symbol: "♌", dates: "23 juil. – 22 août" },
    { id: "vierge",      label: "Vierge",       symbol: "♍", dates: "23 août – 22 sept." },
    { id: "balance",     label: "Balance",      symbol: "♎", dates: "23 sept. – 22 oct." },
    { id: "scorpion",    label: "Scorpion",     symbol: "♏", dates: "23 oct. – 21 nov." },
    { id: "sagittaire",  label: "Sagittaire",   symbol: "♐", dates: "22 nov. – 21 déc." },
    { id: "capricorne",  label: "Capricorne",   symbol: "♑", dates: "22 déc. – 19 janv." },
    { id: "verseau",     label: "Verseau",      symbol: "♒", dates: "20 janv. – 18 fév." },
    { id: "poissons",    label: "Poissons",     symbol: "♓", dates: "19 fév. – 20 mars" },
]

type SigneData = {
    message: string; conseil: string
    amour: number; travail: number; sante: number; finances: number
    chiffre: number; couleur: string
}

function Stars({ n, mimosa = false }: { n: number; mimosa?: boolean }) {
    return (
        <div className={styles.starsRow}>
            {[1,2,3,4,5].map(i => (
                <span
                    key={i}
                    className={mimosa
                        ? (i <= n ? styles.starOn : styles.starOff)
                        : (i <= n ? styles.starYellow : styles.starGrey)
                    }
                >★</span>
            ))}
        </div>
    )
}

// Signe de saison par défaut
function getDefaultSigne(): string {
    const today = new Date()
    const m = today.getMonth() + 1
    const d = today.getDate()
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "belier"
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "taureau"
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "gemeaux"
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "cancer"
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "lion"
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "vierge"
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "balance"
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "scorpion"
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "sagittaire"
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "capricorne"
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "verseau"
    return "poissons"
}

export default function HoroscopeCard() {
    const [selected, setSelected] = useState<string>(getDefaultSigne())
    const [signes, setSignes] = useState<Record<string, SigneData>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/horoscope")
            .then(r => r.json())
            .then(d => { setSignes(d.signes ?? {}); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const signe = SIGNES.find(s => s.id === selected)!
    const data  = signes[selected]

    return (
        <div>
            <div className={styles.horoFullCard}>
                <div className={styles.cardTitle}>HOROSCOPE ⭐ — CHOISIS TON SIGNE</div>

                {/* Grille des signes scrollable horizontalement */}
                <div className={styles.signScroll}>
                    {SIGNES.map(s => (
                        <div key={s.id} className={styles.signPill} onClick={() => setSelected(s.id)}>
                            <div className={`${styles.signBall} ${s.id === selected ? styles.signBallActive : ""}`}>
                                {s.symbol}
                            </div>
                            <span className={styles.signLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* Détail du signe sélectionné */}
                {loading ? (
                    <p style={{ color: "var(--text-mid)", fontSize: 13, textAlign: "center", padding: "16px 0" }}>
                        ✨ Consultation des astres...
                    </p>
                ) : data ? (
                    <>
                        <div className={styles.horoDHeader}>
                            <div className={styles.horoBallLg}>{signe.symbol}</div>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 900, color: "var(--teal)" }}>{signe.label}</div>
                                <div style={{ fontSize: 10, color: "var(--text-light)" }}>{signe.dates}</div>
                            </div>
                        </div>

                        <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-mid)", fontStyle: "italic", marginBottom: 12 }}>
                            {data.message}
                        </p>

                        {[
                            ["❤️ Amour",    "amour"],
                            ["💼 Travail",  "travail"],
                            ["🌿 Santé",    "sante"],
                            ["💰 Finances", "finances"],
                        ].map(([label, key]) => (
                            <div key={key} className={styles.domainRow}>
                                <span className={styles.domainLabel}>{label}</span>
                                <Stars n={Number(data[key as keyof SigneData] ?? 0)} />
                            </div>
                        ))}

                        <div className={styles.conseilBox}>💡 {data.conseil}</div>

                        <div className={styles.numRow}>
                            <div className={styles.numBox}>
                                <div className={styles.numVal}>{data.chiffre}</div>
                                <div className={styles.numSub}>Chiffre du jour</div>
                            </div>
                            <div className={styles.numBox}>
                                <div className={styles.numVal} style={{ fontSize: 15, paddingTop: 3 }}>{data.couleur}</div>
                                <div className={styles.numSub}>Couleur du jour</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p style={{ color: "var(--text-mid)", textAlign: "center" }}>Horoscope indisponible.</p>
                )}
            </div>
        </div>
    )
}