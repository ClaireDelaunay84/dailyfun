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
    { id: "fete",      label: "Fête du jour",           emoji: "🎉", bg: "#c8ece6", accent: "#3d8a78" },
    { id: "ephemerides",label: "Éphémérides",            emoji: "🌅", bg: "#c8ece6", accent: "#3d8a78" },
    { id: "meteo",     label: "Météo",                  emoji: "⛅", bg: "#dce8f4", accent: "#2d4a6a" },
    { id: "journee",   label: "Journée internationale", emoji: "🌍", bg: "#d0e8f8", accent: "#2d5a7a" },
    { id: "saviez",    label: "Le saviez-vous ?",       emoji: "🧠", bg: "#dce8f4", accent: "#2d4a6a" },
    { id: "citation",  label: "Citation du jour",       emoji: "💬", bg: "#e0d8f4", accent: "#4a3a7a" },
    { id: "dicton",    label: "Dicton du jour",         emoji: "💭", bg: "#e4ecdc", accent: "#4a5a2a" },
    { id: "arrive",    label: "C'est arrivé un...",     emoji: "📅", bg: "#c8ece6", accent: "#3d8a78" },
    { id: "naissance", label: "Ils sont nés un...",     emoji: "🎂", bg: "#f0d8ec", accent: "#7a3a6a" },
    { id: "deces",     label: "Ils sont partis un...",  emoji: "🕯️", bg: "#d0dcea", accent: "#3a4a6a" },
]

function CardForSection({ id }: { id: string }) {
    switch (id) {
        case "fete":       return <FeteCard />
        case "ephemerides":return <EphemeridesCard />
        case "meteo":      return <WeatherCard />
        case "journee":    return <JourneeCard />
        case "saviez":     return <SaviezVousCard />
        case "citation":   return <CitationCard />
        case "dicton":     return <DictonCard />
        case "arrive":     return <ArriveCard />
        case "naissance":  return <NaissancesCard />
        case "deces":      return <DecesCard />
        default:           return null
    }
}

export default function Home() {
    const [active, setActive] = useState("fete")

    const today = new Date()
    const dateStr = today.toLocaleDateString("fr-FR", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    }).replace(/^\w/, c => c.toUpperCase())

    const activeSection = SECTIONS.find(s => s.id === active)!
    const otherSections = SECTIONS.filter(s => s.id !== active).slice(0, 3)

    return (
        <main className={styles.main}>

            {/* ── HEADER ── */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <span className={styles.headerLogo}>Dailyfun</span>
                    <span className={styles.headerDate}>{dateStr}</span>
                </div>
                <div className={styles.headerRight}>
                    <a href="https://www.buymeacoffee.com/dailyfun">
                        <img
                            src="https://img.buymeacoffee.com/button-api/?text=Soutenir+le+projet&emoji=💡&slug=dailyfun&button_colour=c8ece6&font_colour=2d4a44&font_family=Poppins&outline_colour=3d8a78&coffee_colour=FFDD00"
                            alt="Soutenir le projet"
                            style={{ height: "36px" }}
                        />
                    </a>
                </div>
            </header>

            {/* ── LAYOUT ── */}
            <div className={styles.layout}>

                {/* SIDEBAR */}
                <aside className={styles.sidebar}>
                    <p className={styles.sidebarTitle}>Rubriques du jour</p>
                    {SECTIONS.map(s => (
                        <div
                            key={s.id}
                            className={styles.sidebarItem}
                            style={active === s.id ? { background: s.bg } : {}}
                            onClick={() => setActive(s.id)}
                        >
                            <div className={styles.sidebarIcon} style={{ background: s.bg }}>
                                {s.emoji}
                            </div>
                            <span
                                className={styles.sidebarLabel}
                                style={active === s.id ? { color: s.accent, fontWeight: 600 } : {}}
                            >
                                {s.label}
                            </span>
                        </div>
                    ))}
                </aside>

                {/* CONTENT */}
                <div className={styles.content}>

                    {/* ── DESKTOP : carte active + navigation rapide ── */}
                    <div className={styles.desktopView}>
                        <div className={styles.activeCardWrap}>
                            <CardForSection id={active} />
                        </div>
                        <div className={styles.quickNav}>
                            {otherSections.map(s => (
                                <div
                                    key={s.id}
                                    className={styles.quickNavItem}
                                    style={{ background: s.bg }}
                                    onClick={() => setActive(s.id)}
                                >
                                    <span className={styles.quickNavEmoji}>{s.emoji}</span>
                                    <span className={styles.quickNavLabel} style={{ color: s.accent }}>
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── MOBILE : toutes les cartes empilées ── */}
                    <div className={styles.mobileView}>
                        <WeatherCard />
                        <EphemeridesCard />
                        <FeteCard />
                        <JourneeCard />
                        <SaviezVousCard />
                        <CitationCard />
                        <DictonCard />
                        <ArriveCard />
                        <NaissancesCard />
                        <DecesCard />
                    </div>

                </div>
            </div>

            {/* ── BMC mobile flottant ── */}
            <div className={styles.bmcMobile}>
                <a href="https://www.buymeacoffee.com/dailyfun">
                    <img
                        src="https://img.buymeacoffee.com/button-api/?text=Soutenir+le+projet&emoji=💡&slug=dailyfun&button_colour=c8ece6&font_colour=2d4a44&font_family=Poppins&outline_colour=3d8a78&coffee_colour=FFDD00"
                        alt="Soutenir le projet"
                        style={{ height: "36px" }}
                    />
                </a>
            </div>

        </main>
    )
}
