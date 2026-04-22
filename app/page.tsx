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

const C1 = { bg: "#DDD0BC", shadow: "rgba(160,130,95,0.55)", icon: "#A8917A" }
const C2 = { bg: "#C9B393", shadow: "rgba(140,105,60,0.55)",  icon: "#8A6E4A" }
const C3 = { bg: "#C4B09E", shadow: "rgba(130,95,75,0.55)",   icon: "#82604E" }
const C4 = { bg: "#B09478", shadow: "rgba(110,75,45,0.55)",   icon: "#725A42" }
const C5 = { bg: "#C2B8AC", shadow: "rgba(120,108,95,0.55)",  icon: "#7E7268" }

const SECTIONS = [
    { id: "fete",        label: "Fête du jour",   clay: C1 },
    { id: "ephemerides", label: "Éphémérides",    clay: C2 },
    { id: "meteo",       label: "Météo",           clay: C3 },
    { id: "journee",     label: "Journée intl.",   clay: C5 },
    { id: "saviez",      label: "Saviez-vous ?",   clay: C4 },
    { id: "citation",    label: "Citation",         clay: C1 },
    { id: "dicton",      label: "Dicton",           clay: C2 },
    { id: "arrive",      label: "C'est arrivé",    clay: C3 },
    { id: "naissance",   label: "Naissances",       clay: C5 },
    { id: "deces",       label: "Décès",            clay: C4 },
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
        default:            return null
    }
}

function clayStyle(clay: { bg: string; shadow: string }, size = 56): React.CSSProperties {
    return {
        width: size, height: size,
        borderRadius: Math.round(size * 0.3),
        background: clay.bg,
        boxShadow: `5px 6px 12px ${clay.shadow}, 0 2px 4px ${clay.shadow}`,
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
        default:            return null
    }
}

function CalendrierWidget() {
    const today = new Date()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" }).toUpperCase()
    const jour = today.getDate()
    const annee = today.getFullYear()
    const moisIndex = today.getMonth()
    const jourSemaine = today.getDay() // 0=dim

    // Jours du mois
    const premierJour = new Date(annee, moisIndex, 1).getDay()
    const nbJours = new Date(annee, moisIndex + 1, 0).getDate()
    const offset = premierJour === 0 ? 6 : premierJour - 1 // lundi en premier

    const jours = ["L", "M", "M", "J", "V", "S", "D"]
    const cases = Array(offset).fill(null).concat(Array.from({ length: nbJours }, (_, i) => i + 1))

    return (
        <div style={{
            background: "rgba(220, 208, 190, 0.45)",
            borderRadius: "18px",
            padding: "16px 18px",
            border: "1px solid rgba(217,204,186,0.4)",
            boxShadow: "4px 5px 12px rgba(160,130,95,0.3)",
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
        }}>
            {/* Gauche — mois + jour */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: "64px" }}>
                <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "11px",
                    fontWeight: 500,
                    color: "#9E7F5C",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                }}>{mois}</span>
                <span style={{
                    fontFamily: "'Mr De Haviland', cursive",
                    fontSize: "72px",
                    color: "#5C4430",
                    lineHeight: 1,
                    marginTop: "-4px",
                }}>{jour}</span>
            </div>

            {/* Droite — mini calendrier */}
            <div style={{ flex: 1 }}>
                {/* En-tête jours */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    marginBottom: "4px",
                    gap: "1px",
                }}>
                    {jours.map((j, i) => (
                        <span key={i} style={{
                            fontSize: "8px",
                            fontWeight: 500,
                            color: "#9C8A76",
                            textAlign: "center",
                            letterSpacing: "0.5px",
                        }}>{j}</span>
                    ))}
                </div>
                {/* Cases */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "1px",
                }}>
                    {cases.map((d, i) => (
                        <span key={i} style={{
                            fontSize: "9px",
                            textAlign: "center",
                            padding: "2px 0",
                            borderRadius: "50%",
                            background: d === jour ? "#9E7F5C" : "transparent",
                            color: d === jour ? "#FAF7F2" : d ? "#5C4430" : "transparent",
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

    const today = new Date()
    const dateStr = today.toLocaleDateString("fr-FR", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    }).replace(/^\w/, c => c.toUpperCase())

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
    const otherMobile = SECTIONS.filter(s => s.id !== mobileOpen).slice(0, 3)

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div style={{display: "flex", flexDirection: "column", gap: "0px"}}>
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
                             style={active === s.id ? {background: s.clay.bg + "55"} : {}}
                             onClick={() => switchTo(s.id)}>
                            <div className={styles.sidebarIcon} style={{
                                background: s.clay.bg,
                                boxShadow: `3px 4px 8px ${s.clay.shadow}`,
                            }}>
                                <SectionIcon id={s.id} color={s.clay.icon} size={18}/>
                            </div>
                            <span className={styles.sidebarLabel}
                                  style={active === s.id ? {color: "#5C4430", fontWeight: 600} : {}}>
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
                            <CardForSection id={active}/>
                        </div>
                        <div>
                            <p className={styles.quickNavLabel}>Autres rubriques du jour</p>
                            <div className={styles.quickNav}>
                                {quickSections.map(s => (
                                    <div key={s.id} className={styles.quickNavItem}
                                         style={{background: s.clay.bg + "44"}}
                                         onClick={() => switchTo(s.id)}>
                                        <div className={styles.quickNavIcon} style={clayStyle(s.clay, 28)}>
                                            <SectionIcon id={s.id} color={s.clay.icon} size={14}/>
                                        </div>
                                        <span className={styles.quickNavText}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
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
                    <CalendrierWidget/>

                    <div className={styles.mobileGrid}>
                        {SECTIONS.map(s => (
                            <div key={s.id} className={styles.mobileAppItem} onClick={() => openMobile(s.id)}>
                                <div className={styles.mobileAppIcon} style={clayStyle(s.clay, 56)}>
                                    <SectionIcon id={s.id} color={s.clay.icon} size={28}/>
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
                        <CardForSection id={mobileOpen}/>
                    </div>
                )}
            </div>

            <div className={styles.bmcMobile}>
                <a href="https://www.buymeacoffee.com/dailyfun" target="_blank" className={styles.supportBtnMobile}>
                    ♡ Soutenir
                </a>
            </div>
            <footer style={{
                textAlign: "center",
                padding: "16px",
                fontSize: "11px",
                color: "#9C8A76",
            }}>
                <a href="/privacy" style={{color: "#9C8A76", textDecoration: "underline"}}>
                    Politique de confidentialité
                </a>
            </footer>
        </main>
    )
}