"use client"
import { useEffect, useState } from "react"
import styles from "../../page.module.css"

// Signe de saison selon la date du jour
function getSigneSaison(): { id: string; label: string; symbol: string; dates: string } {
    const today = new Date()
    const m = today.getMonth() + 1
    const d = today.getDate()
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return { id: "belier",      label: "Bélier",      symbol: "♈", dates: "21 mars – 19 avr." }
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return { id: "taureau",     label: "Taureau",     symbol: "♉", dates: "20 avr. – 20 mai" }
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return { id: "gemeaux",     label: "Gémeaux",     symbol: "♊", dates: "21 mai – 20 juin" }
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return { id: "cancer",      label: "Cancer",      symbol: "♋", dates: "21 juin – 22 juil." }
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return { id: "lion",        label: "Lion",        symbol: "♌", dates: "23 juil. – 22 août" }
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return { id: "vierge",      label: "Vierge",      symbol: "♍", dates: "23 août – 22 sept." }
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return { id: "balance",    label: "Balance",     symbol: "♎", dates: "23 sept. – 22 oct." }
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return { id: "scorpion",  label: "Scorpion",    symbol: "♏", dates: "23 oct. – 21 nov." }
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return { id: "sagittaire",label: "Sagittaire",  symbol: "♐", dates: "22 nov. – 21 déc." }
    if ((m === 12 && d >= 22) || (m === 1  && d <= 19)) return { id: "capricorne",label: "Capricorne",  symbol: "♑", dates: "22 déc. – 19 janv." }
    if ((m === 1  && d >= 20) || (m === 2  && d <= 18)) return { id: "verseau",   label: "Verseau",     symbol: "♒", dates: "20 janv. – 18 fév." }
    return { id: "poissons", label: "Poissons", symbol: "♓", dates: "19 fév. – 20 mars" }
}

type SigneData = {
    message: string
    amour: number
}

function Stars({ n }: { n: number }) {
    return (
        <div className={styles.starsMimosa}>
            {[1,2,3,4,5].map(i => (
                <span key={i} className={i <= n ? styles.starOn : styles.starOff}>★</span>
            ))}
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.4)", marginLeft: 5 }}>Amour</span>
        </div>
    )
}

export default function HoroscopePreview() {
    const [data, setData] = useState<SigneData | null>(null)
    const signe = getSigneSaison()

    useEffect(() => {
        fetch("/api/horoscope")
            .then(r => r.json())
            .then(d => {
                const s = d.signes?.[signe.id]
                if (s) setData({ message: s.message, amour: Number(s.amour ?? 3) })
            })
            .catch(() => {})
    }, [signe.id])

    return (
        <div className={styles.horoPreview}>
            <div className={styles.horoPreviewTop}>
                <span className={styles.horoPreviewTitle}>HOROSCOPE ⭐ · SIGNE DE SAISON</span>
                <span className={styles.horoPreviewCta}>Tous les signes ›</span>
            </div>
            <div className={styles.horoSeasonBlock}>
                <div className={styles.horoBallSeason}>{signe.symbol}</div>
                <div style={{ flex: 1 }}>
                    <div className={styles.horoSignName}>{signe.label}</div>
                    <div className={styles.horoSignDates}>{signe.dates}</div>
                    {data && <Stars n={data.amour} />}
                    <div className={styles.horoMsg}>
                        {data?.message ?? "Consultation des astres en cours…"}
                    </div>
                </div>
            </div>
        </div>
    )
}