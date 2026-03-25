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

const SECTIONS = [
    { id: "fete",       label: "Fête du jour",           emoji: "🎉", bg: "#c8ece6", accent: "#2d6a5e" },
    { id: "ephemerides",label: "Éphémérides",            emoji: "🌅", bg: "#c8ece6", accent: "#2d6a5e" },
    { id: "meteo",      label: "Météo",                  emoji: "⛅", bg: "#dce8f4", accent: "#2d4a6a" },
    { id: "journee",    label: "Journée intl.",          emoji: "🌍", bg: "#d0e8f8", accent: "#2d5a7a" },
    { id: "saviez",     label: "Saviez-vous ?",          emoji: "🧠", bg: "#dce8f4", accent: "#2d4a6a" },
    { id: "citation",   label: "Citation",               emoji: "💬", bg: "#e0d8f4", accent: "#4a3a7a" },
    { id: "dicton",     label: "Dicton",                 emoji: "💭", bg: "#e4ecdc", accent: "#4a5a2a" },
    { id: "arrive",     label: "C'est arrivé",           emoji: "📅", bg: "#c8ece6", accent: "#2d6a5e" },
    { id: "naissance",  label: "Naissances",             emoji: "🎂", bg: "#f0d8ec", accent: "#7a3a6a" },
    { id: "deces",      label: "Décès",                  emoji: "🕯️", bg: "#d0dcea", accent: "#3a4a6a" },
]

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
        default:            return null
    }
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
                    <span className={styles.headerLogo}>Dailyfun</span>
                </div>
                <div className={styles.headerCenter}>
                    <span className={styles.headerDate}>{dateStr}</span>
                    <span className={styles.headerTagline}>Ta dose quotidienne de culture</span>
                </div>
                <div className={styles.headerRight}>
                    <a href="https://www.buymeacoffee.com/dailyfun" target="_blank">
                        <img
                            src="https://img.buymeacoffee.com/button-api/?text=Soutenir+le+projet&emoji=💡&slug=dailyfun&button_colour=c8ece6&font_colour=2d4a44&font_family=Poppins&outline_colour=3d8a78&coffee_colour=FFDD00"
                            alt="Soutenir le projet"
                            style={{ height: "36px" }}
                        />
                    </a>
                </div>
            </header>

            {/* DESKTOP */}
            <div className={styles.layout}>
                <aside className={styles.sidebar}>
                    <p className={styles.sidebarTitle}>Rubriques du jour</p>
                    {SECTIONS.map(s => (
                        <div key={s.id} className={styles.sidebarItem}
                             style={active === s.id ? { background: s.bg } : {}}
                             onClick={() => switchTo(s.id)}>
                            <div className={styles.sidebarIcon} style={{ background: s.bg }}>{s.emoji}</div>
                            <span className={styles.sidebarLabel} style={active === s.id ? { color: s.accent, fontWeight: 600 } : {}}>
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
                        <div>
                            <p className={styles.quickNavLabel}>Autres rubriques du jour</p>
                            <div className={styles.quickNav}>
                                {quickSections.map(s => (
                                    <div key={s.id} className={styles.quickNavItem} style={{ background: s.bg }} onClick={() => switchTo(s.id)}>
                                        <span className={styles.quickNavEmoji}>{s.emoji}</span>
                                        <span className={styles.quickNavText} style={{ color: s.accent }}>{s.label}</span>
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
                    <div className={styles.mobileFeature}
                         style={{ background: `linear-gradient(135deg, ${SECTIONS[0].bg}, #a8d8d0)` }}
                         onClick={() => openMobile(SECTIONS[0].id)}>
                        <div className={styles.mobileFeatureIcon}>{SECTIONS[0].emoji}</div>
                        <div>
                            <p className={styles.mobileFeatureCat} style={{ color: SECTIONS[0].accent }}>À la une</p>
                            <p className={styles.mobileFeatureTitle} style={{ color: SECTIONS[0].accent }}>{SECTIONS[0].label}</p>
                        </div>
                    </div>
                    <div className={styles.mobileGrid}>
                        {SECTIONS.map(s => (
                            <div key={s.id} className={styles.mobileAppItem} onClick={() => openMobile(s.id)}>
                                <div className={styles.mobileAppIcon} style={{ background: s.bg }}>{s.emoji}</div>
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
                        <div className={styles.mobileQuickNav}>
                            {otherMobile.map(s => (
                                <div key={s.id} className={styles.mobileQuickItem} style={{ background: s.bg }}
                                     onClick={() => { setMobileAnimating(true); setTimeout(() => { setMobileOpen(s.id); setMobileAnimating(false) }, 220) }}>
                                    <span>{s.emoji}</span>
                                    <span style={{ color: s.accent, fontSize: "11px", fontWeight: 600 }}>{s.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className={styles.bmcMobile}>
                <a href="https://www.buymeacoffee.com/dailyfun" target="_blank">
                    <img src="https://img.buymeacoffee.com/button-api/?text=Soutenir+le+projet&emoji=💡&slug=dailyfun&button_colour=c8ece6&font_colour=2d4a44&font_family=Poppins&outline_colour=3d8a78&coffee_colour=FFDD00"
                         alt="Soutenir" style={{ height: "36px" }} />
                </a>
            </div>
        </main>
    )
}