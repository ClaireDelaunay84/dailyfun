"use client"
import { useState } from "react"
import styles from "./page.module.css"

import WeatherCard        from "./components/WeatherCard"
import EphemeridesCard    from "./components/EphemeridesCard"
import JourneeCard        from "./components/JourneeCard"
import HoroscopeCard      from "./components/HoroscopeCard"
import SagesseDuJourCard  from "./components/SagessedujourCard"
import FilmsCard          from "./components/FilmsCard"
import ArriveCard         from "./components/ArriveCard"
import NaissancesCard     from "./components/NaissancesCard"
import DecesCard          from "./components/DecesCard"
import SaviezVousCard     from "./components/SaviezVousCard"
import FeteCard           from "./components/FeteCard"

import WeatherPreview     from "./components/home/WeatherPreview"
import EphemeridesPreview from "./components/home/EphemeridesPreview"
import JourneePreview     from "./components/home/JourneePreview"
import HoroscopePreview   from "./components/home/HoroscopePreview"
import SagessePreview     from "./components/home/SagessePreview"

import { getFeteduJour }  from "./data/fetes"

const SECTIONS = [
    { id: "accueil",     label: "Accueil",        icon: "🏠" },
    { id: "films",       label: "Cinéma",          icon: "🎬" },
    { id: "horoscope",   label: "Astro",           icon: "⭐" },
    { id: "arrive",      label: "C'est arrivé",    icon: "📅" },
    { id: "naissance",   label: "Naissances",      icon: "🎂" },
    { id: "deces",       label: "Décès",           icon: "🕯️" },
    { id: "journee",     label: "Journée intl.",   icon: "🌍" },
    { id: "saviez",      label: "Saviez-vous",     icon: "💡" },
    { id: "sagesse",     label: "Sagesse du jour", icon: "💬" },
    { id: "ephemerides", label: "Éphémérides",     icon: "🗓️" },
]

function CardForSection({ id }: { id: string }) {
    switch (id) {
        case "films":       return <FilmsCard />
        case "horoscope":   return <HoroscopeCard />
        case "arrive":      return <ArriveCard />
        case "naissance":   return <NaissancesCard />
        case "deces":       return <DecesCard />
        case "journee":     return <JourneeCard />
        case "saviez":      return <SaviezVousCard />
        case "sagesse":     return <SagesseDuJourCard />
        case "ephemerides": return <EphemeridesCard />
        default:            return null
    }
}

function DesktopSidebar({ onNav }: { onNav: (id: string) => void }) {
    return (
        <div className={styles.homeRight}>
            <WeatherCard />
            <div
                className={`${styles.card} ${styles.cardClickable}`}
                onClick={() => onNav("ephemerides")}
            >
                <EphemeridesPreview />
                <div className={styles.cardCta}>Voir tout ›</div>
            </div>
            <FeteCard compact />
        </div>
    )
}

export default function Home() {
    const [active, setActive] = useState("accueil")
    const fete = getFeteduJour()

    const today = new Date()
    const dateStr = today.toLocaleDateString("fr-FR", {
        weekday: "short", day: "numeric", month: "long", year: "numeric"
    }).toUpperCase()
    // Format court pour mobile
    const dateMobile = today.toLocaleDateString("fr-FR", {
        day: "numeric", month: "short", year: "numeric"
    }).toUpperCase()

    const navTo = (id: string) => setActive(id)

    return (
        <main className={styles.main}>

            {/* ── Header desktop : logo + nav + date ── */}
            <header className={styles.header}>
                <div className={styles.headerLogo}>
                    daily<span>fun</span>
                </div>
                {/* Nav desktop inline dans le header */}
                <nav className={styles.desktopNav}>
                    {SECTIONS.map(s => (
                        <button
                            key={s.id}
                            className={`${styles.desktopNavLink} ${active === s.id ? styles.desktopNavLinkActive : ""}`}
                            onClick={() => navTo(s.id)}
                        >
                            {s.label}
                        </button>
                    ))}
                </nav>
                {/* Date longue desktop, courte mobile */}
                <div className={styles.headerDate}>
                    <span className={styles.dateDesktop}>{dateStr}</span>
                    <span className={styles.dateMobile}>{dateMobile}</span>
                </div>
            </header>

            {/* ── Bandeau fête ── */}
            <div className={styles.feteBanner}>
                🌸 <strong>Fête du jour :</strong>&nbsp;{fete.prenom}
            </div>

            {/* ── DESKTOP : contenu pleine largeur (pas de sidebar gauche) ── */}
            <div className={styles.desktopContent}>
                {active === "accueil" ? (
                    <div className={styles.homeGrid}>
                        <div className={styles.homeLeft}>
                            <div onClick={() => navTo("journee")} style={{ cursor: "pointer" }}>
                                <JourneePreview />
                            </div>
                            <div onClick={() => navTo("horoscope")} style={{ cursor: "pointer" }}>
                                <HoroscopePreview />
                            </div>
                            <div onClick={() => navTo("sagesse")} style={{ cursor: "pointer" }}>
                                <SagessePreview />
                            </div>
                        </div>
                        <DesktopSidebar onNav={navTo} />
                    </div>
                ) : (
                    <div className={styles.detailGrid}>
                        <div className={styles.detailLeft}>
                            <CardForSection id={active} />
                        </div>
                        <DesktopSidebar onNav={navTo} />
                    </div>
                )}
            </div>

            {/* ── MOBILE : scroll + nav bas ── */}
            <div className={styles.mobileScroll}>
                {active === "accueil" ? (
                    <>
                        <WeatherPreview />
                        <div onClick={() => navTo("ephemerides")} style={{ cursor: "pointer" }}>
                            <EphemeridesPreview clickable />
                        </div>
                        <div onClick={() => navTo("journee")} style={{ cursor: "pointer" }}>
                            <JourneePreview />
                        </div>
                        <div onClick={() => navTo("horoscope")} style={{ cursor: "pointer" }}>
                            <HoroscopePreview />
                        </div>
                        <div onClick={() => navTo("sagesse")} style={{ cursor: "pointer" }}>
                            <SagessePreview />
                        </div>
                    </>
                ) : (
                    <CardForSection id={active} />
                )}
            </div>

            {/* Nav mobile bas */}
            <nav className={styles.mobileNav}>
                <div className={styles.mobileNavScroll}>
                    {SECTIONS.map(s => (
                        <div
                            key={s.id}
                            className={`${styles.mobileNavItem} ${active === s.id ? styles.mobileNavItemActive : ""}`}
                            onClick={() => navTo(s.id)}
                        >
                            <span className={styles.mobileNavIcon}>{s.icon}</span>
                            <span className={styles.mobileNavLabel}>{s.label}</span>
                            <div className={styles.mobileNavDot} />
                        </div>
                    ))}
                </div>
                <div className={styles.mobileNavHint}>›</div>
            </nav>

            {/* ── Buy Me a Coffee flottant ── */}
            <div className={styles.bmcFloat}>
                <a
                    href="https://www.buymeacoffee.com/dailyfun"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bmcBtn}
                >
                    ♡ Soutenir
                </a>
            </div>

        </main>
    )
}