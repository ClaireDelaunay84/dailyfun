"use client"
import { useState } from "react"
import styles from "./page.module.css"
import WeatherCard from "./components/WeatherCard"
import FeteCard from "./components/FeteCard"
import EphemeridesCard from "./components/EphemeridesCard"
import JourneeCard from "./components/JourneeCard"
import DictonCard from "./components/DictonCard"
import CitationCard from "./components/CitationCard"
import SaviezVousCard from "./components/SaviezVousCard"
import ArriveCard from "./components/ArriveCard"
import NaissancesCard from "./components/NaissancesCard"
import DecesCard from "./components/DecesCard"
import FilmsCard from "./components/FilmsCard"
import HoroscopeCard from "./components/HoroscopeCard"

// ── Palette Soft Sunrise ──
const C1 = { bg: "rgba(146,171,211,0.65)", shadow: "rgba(74,90,122,0.4)",   icon: "#ffffff" }
const C2 = { bg: "rgba(228,156,149,0.65)", shadow: "rgba(180,80,74,0.4)",   icon: "#ffffff" }
const C3 = { bg: "rgba(250,192,152,0.65)", shadow: "rgba(200,120,60,0.4)",  icon: "#ffffff" }
const C4 = { bg: "rgba(133,153,136,0.65)", shadow: "rgba(60,90,65,0.4)",    icon: "#ffffff" }
const C5 = { bg: "rgba(180,160,200,0.65)", shadow: "rgba(100,70,140,0.4)",  icon: "#ffffff" }

const SECTIONS = [
    { id: "fete",        label: "Fête du jour",   clay: C1 },
    { id: "ephemerides", label: "Éphémérides",    clay: C2 },
    { id: "meteo",       label: "Météo",           clay: C3 },
    { id: "horoscope",   label: "Horoscope",      clay: C5},
    { id: "journee",     label: "Journée intl.",   clay: C4 },
    { id: "saviez",      label: "Saviez-vous ?",   clay: C1 },
    { id: "citation",    label: "Citation",         clay: C2 },
    { id: "dicton",      label: "Dicton",           clay: C3 },
    { id: "arrive",      label: "C'est arrivé",    clay: C5 },
    { id: "naissance",   label: "Naissances",       clay: C4 },
    { id: "deces",       label: "Décès",            clay: C1 },
    { id: "films",       label: "Films du jour",   clay: C2 },
]

function SectionIcon({ id, color, size = 28 }: { id: string; color: string; size?: number }) {
    const p = { width: size, height: size, viewBox: "0 0 24 24", fill: color }
    switch (id) {
        case "fete":        return <svg {...p}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
        case "ephemerides": return <svg {...p}><path d="M19 3h-1V1h-2v2H8V1H6v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5z"/></svg>
        case "meteo":       return <svg {...p}><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>
        case "journee":     return <svg {...p}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
        case "saviez":      return <svg {...p}><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 15h-4v-1h4v1zm0-2h-4v-1h4v1z"/></svg>
        case "citation":    return <svg {...p}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        case "dicton":      return <svg {...p}><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>
        case "arrive":      return <svg {...p}><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
        case "naissance":   return <svg {...p}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        case "deces":       return <svg {...p}><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
        case "films":       return <svg {...p}><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/></svg>
        case "horoscope": return <svg {...p}><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>
        default:            return null
    }
}

function clayStyle(clay: { bg: string; shadow: string }, size = 56): React.CSSProperties {
    return {
        width: size, height: size,
        borderRadius: Math.round(size * 0.3),
        background: clay.bg,
        boxShadow: `4px 5px 10px ${clay.shadow}`,
        border: "1px solid rgba(255,255,255,0.25)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
    }
}

function CardForSection({ id }: { id: string }) {
    switch (id) {
        case "fete":        return <FeteCard />
        case "ephemerides": return <EphemeridesCard />
        case "meteo":       return <WeatherCard />
        case "journee":     return <JourneeCard />
        case "saviez":      return <SaviezVousCard />
        case "citation":    return <CitationCard />
        case "dicton":      return <DictonCard />
        case "arrive":      return <ArriveCard />
        case "naissance":   return <NaissancesCard />
        case "deces":       return <DecesCard />
        case "films":       return <FilmsCard />
        case "horoscope":   return <HoroscopeCard />
        default:            return null
    }
}

function CalendrierWidget() {
    const today = new Date()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" }).toUpperCase()
    const jour = today.getDate()
    const annee = today.getFullYear()
    const moisIndex = today.getMonth()

    const premierJour = new Date(annee, moisIndex, 1).getDay()
    const nbJours = new Date(annee, moisIndex + 1, 0).getDate()
    const offset = premierJour === 0 ? 6 : premierJour - 1

    const jours = ["L", "M", "M", "J", "V", "S", "D"]
    const cases = Array(offset).fill(null).concat(Array.from({ length: nbJours }, (_, i) => i + 1))

    return (
        <div style={{
            background: "rgba(146,171,211,0.25)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "18px",
            padding: "16px 18px",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
        }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: "64px" }}>
                <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                }}>{mois}</span>
                <span style={{
                    fontFamily: "'Qwitcher Grypen', cursive",
                    fontSize: "88px",
                    color: "#ffffff",
                    lineHeight: 1,
                    marginTop: "-4px",
                }}>{jour}</span>
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "4px", gap: "1px" }}>
                    {jours.map((j, i) => (
                        <span key={i} style={{ fontSize: "8px", fontWeight: 500, color: "rgba(255,255,255,0.5)", textAlign: "center", letterSpacing: "0.5px" }}>{j}</span>
                    ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px" }}>
                    {cases.map((d, i) => (
                        <span key={i} style={{
                            fontSize: "9px",
                            textAlign: "center",
                            borderRadius: "50%",
                            background: d === jour ? "rgba(255,255,255,0.3)" : "transparent",
                            color: d ? "#ffffff" : "transparent",
                            fontWeight: d === jour ? 600 : 400,
                            lineHeight: "16px",
                            width: "16px",
                            height: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto",
                        }}>{d ?? ""}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    const [active, setActive] = useState("fete")
    const [animating, setAnimating] = useState(false)
    const [mobileOpen, setMobileOpen] = useState<string | null>(null)
    const [mobileAnimating, setMobileAnimating] = useState(false)

    const switchTo = (id: string) => {
        if (id === active) return
        setAnimating(true)
        setTimeout(() => { setActive(id); setAnimating(false) }, 220)
    }
    const openMobile = (id: string) => {
        setMobileAnimating(true)
        setTimeout(() => { setMobileOpen(id); setMobileAnimating(false) }, 0)
    }
    const closeMobile = () => {
        setMobileAnimating(true)
        setTimeout(() => { setMobileOpen(null); setMobileAnimating(false) }, 220)
    }

    const quickSections = SECTIONS.filter(s => s.id !== active).slice(0, 3)

    return (
        <main className={styles.main}>

            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                        <span className={styles.headerLogo}>Dailyfun</span>
                        <span className={styles.headerTagline}>Ta dose quotidienne de culture</span>
                    </div>
                </div>
                <div className={styles.headerRight}>
                    <a href="https://www.buymeacoffee.com/dailyfun" target="_blank" className={styles.supportBtn}>
                        ♡ Soutenir le projet
                    </a>
                </div>
            </header>

            {/* DESKTOP */}
            <div className={styles.layout}>
                <aside className={styles.sidebar}>
                    <p className={styles.sidebarTitle}>Rubriques du jour</p>
                    {SECTIONS.map(s => (
                        <div key={s.id} className={styles.sidebarItem}
                             style={active === s.id ? { background: "rgba(255,255,255,0.15)" } : {}}
                             onClick={() => switchTo(s.id)}>
                            <div className={styles.sidebarIcon} style={{
                                background: s.clay.bg,
                                boxShadow: `3px 4px 8px ${s.clay.shadow}`,
                            }}>
                                <SectionIcon id={s.id} color={s.clay.icon} size={18} />
                            </div>
                            <span className={styles.sidebarLabel}
                                  style={active === s.id ? { color: "#ffffff", fontWeight: 600 } : {}}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </aside>

                <div className={styles.content}>
                    <div className={styles.desktopView}>
                        <div className={styles.activeCardWrap} style={{
                            opacity: animating ? 0 : 1,
                            transform: animating ? "translateY(8px)" : "translateY(0)",
                            transition: "opacity 0.22s ease, transform 0.22s ease",
                        }}>
                            <CardForSection id={active} />
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <div className={styles.mobileView}>
                <div className={styles.mobileHome} style={{
                    opacity: mobileOpen ? 0 : 1,
                    transform: mobileOpen ? "translateX(-30px)" : "translateX(0)",
                    pointerEvents: mobileOpen ? "none" : "auto",
                    transition: "opacity 0.22s ease, transform 0.22s ease",
                    display: mobileOpen ? "none" : "flex",
                }}>
                    <CalendrierWidget />
                    <div className={styles.mobileGrid}>
                        {SECTIONS.map(s => (
                            <div key={s.id} className={styles.mobileAppItem} onClick={() => openMobile(s.id)}>
                                <div className={styles.mobileAppIcon} style={clayStyle(s.clay, 56)}>
                                    <SectionIcon id={s.id} color={s.clay.icon} size={28} />
                                </div>
                                <span className={styles.mobileAppLabel}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {mobileOpen && (
                    <div className={styles.mobileDetail} style={{
                        opacity: mobileAnimating ? 0 : 1,
                        transform: mobileAnimating ? "translateX(30px)" : "translateX(0)",
                        transition: "opacity 0.22s ease, transform 0.22s ease",
                    }}>
                        <button className={styles.mobileBack} onClick={closeMobile}>‹ Retour</button>
                        <CardForSection id={mobileOpen} />
                    </div>
                )}
            </div>

            <footer style={{
                textAlign: "center",
                padding: "16px",
                fontSize: "11px",
                color: "rgba(255,255,255,0.4)",
                display: "flex",
                justifyContent: "center",
                gap: "16px",
            }}>
                <a href="/credits" style={{color: "rgba(255,255,255,0.4)", textDecoration: "underline"}}>
                    Crédits
                </a>
                <a href="/privacy" style={{color: "rgba(255,255,255,0.4)", textDecoration: "underline"}}>
                    Politique de confidentialité
                </a>
                <span style={{color: "rgba(255,255,255,0.2)"}}>·</span>
                <a href="/privacy/deletion" style={{color: "rgba(255,255,255,0.4)", textDecoration: "underline"}}>
                    Suppression des données
                </a>
            </footer>

        </main>
    )
}