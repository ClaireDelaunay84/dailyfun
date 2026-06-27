"use client"
import { useEffect, useState } from "react"
import SunCalc from "suncalc"
import styles from "../page.module.css"
import { getFeteduJour } from "../data/fetes"

const fmt = (d: Date) =>
    d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", hour12: false })

function getSigneSaison(date: Date): string {
    const m = date.getMonth() + 1
    const d = date.getDate()
    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "Bélier ♈"
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "Taureau ♉"
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "Gémeaux ♊"
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "Cancer ♋"
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "Lion ♌"
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "Vierge ♍"
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "Balance ♎"
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "Scorpion ♏"
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "Sagittaire ♐"
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "Capricorne ♑"
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "Verseau ♒"
    return "Poissons ♓"
}

function getPhaseLune(date: Date): string {
    const phase = SunCalc.getMoonIllumination(date).phase
    if (phase < 0.03 || phase > 0.97) return "Nouvelle lune 🌑"
    if (phase < 0.22) return "Lune croissante 🌒"
    if (phase < 0.28) return "Premier quartier 🌓"
    if (phase < 0.47) return "Lune croissante gibbeuse 🌔"
    if (phase < 0.53) return "Pleine lune 🌕"
    if (phase < 0.72) return "Lune décroissante gibbeuse 🌖"
    if (phase < 0.78) return "Dernier quartier 🌗"
    return "Lune décroissante 🌘"
}

type Data = {
    lever: string; coucher: string; duree: string
    lune: string; signe: string
    jourAnnee: number; joursRestants: number; semaine: number
    saints: string
}

export default function EphemeridesCard() {
    const [data, setData] = useState<Data | null>(null)

    useEffect(() => {
        const today = new Date()
        const soy = new Date(today.getFullYear(), 0, 1)
        const jourAnnee = Math.ceil((today.getTime() - soy.getTime()) / 86400000)
        const joursRestants = Math.ceil(
            (new Date(today.getFullYear(), 11, 31).getTime() - today.getTime()) / 86400000
        )
        const semaine = Math.ceil(jourAnnee / 7)
        const fete = getFeteduJour()

        const compute = (lat: number, lng: number) => {
            const times = SunCalc.getTimes(today, lat, lng)
            const dureeMs = times.sunset.getTime() - times.sunrise.getTime()
            const h = Math.floor(dureeMs / 3600000)
            const min = String(Math.floor((dureeMs % 3600000) / 60000)).padStart(2, "0")
            setData({
                lever: fmt(times.sunrise),
                coucher: fmt(times.sunset),
                duree: `${h}h${min}`,
                lune: getPhaseLune(today),
                signe: getSigneSaison(today),
                jourAnnee, joursRestants, semaine,
                saints: fete.prenom,
            })
        }

        if (!navigator.geolocation) { compute(48.8566, 2.3522); return }
        navigator.geolocation.getCurrentPosition(
            pos => compute(pos.coords.latitude, pos.coords.longitude),
            () => compute(48.8566, 2.3522)
        )
    }, [])

    const today = new Date()
    const dateLabel = today.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })

    if (!data) return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>ÉPHÉMÉRIDES</div>
            <p style={{ fontSize: 12, color: "var(--text-mid)" }}>Calcul en cours...</p>
        </div>
    )

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.cardTitle}>ÉPHÉMÉRIDES</div>
                <div style={{ fontSize: 20, marginBottom: 4 }}>🗓️</div>
                <div className={styles.ephemDate}>{dateLabel}</div>

                <div className={styles.ephemRow}>
                    <span className={styles.ephemIcon}>📅</span>
                    <div className={styles.ephemText}>
                        Jour {data.jourAnnee} de l'année · Semaine {data.semaine} · {data.joursRestants} jours restants
                    </div>
                </div>
                <div className={styles.ephemRow}>
                    <span className={styles.ephemIcon}>🌄</span>
                    <div className={styles.ephemText}>
                        Lever du soleil {data.lever} · Coucher {data.coucher} · Durée {data.duree}
                    </div>
                </div>
                <div className={styles.ephemRow}>
                    <span className={styles.ephemIcon}>🌙</span>
                    <div className={styles.ephemText}>{data.lune}</div>
                </div>
                <div className={styles.ephemRow}>
                    <span className={styles.ephemIcon}>⭐</span>
                    <div className={styles.ephemText}>Signe de saison : {data.signe}</div>
                </div>
                <div className={styles.ephemRow}>
                    <span className={styles.ephemIcon}>✝️</span>
                    <div className={styles.ephemText}>Saints : {data.saints}</div>
                </div>
            </div>
        </div>
    )
}