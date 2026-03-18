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

export default function Home() {
    const today = new Date()
    const dateStr = today.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })

    return (
        <main className={styles.main}>
            {/* ── BOUTON BUY ME A COFFEE ── */}
            <div style={{
                position: "absolute",
                top: "16px",
                right: "24px",
                zIndex: 10,
            }}>
                <a href="https://www.buymeacoffee.com/dailyfun">
                    <img
                        src="https://img.buymeacoffee.com/button-api/?text=Soutenir le projet&emoji=💡&slug=dailyfun&button_colour=a78bfa&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
                        alt="Soutenir le projet"
                        style={{ height: "36px" }}
                    />
                </a>
            </div>
            {/* ── HEADER ── */}
            <header style={{textAlign: "center", marginBottom: "4px"}}>
                <div style={{
                    fontFamily: "var(--font-poppins)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    background: "linear-gradient(90deg, #A78BFA, #818CF8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.2,
                }}>
                    ✨ Dailyfun
                </div>
                <p style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    textTransform: "capitalize",
                    marginTop: "2px",
                }}>
                    {dateStr}
                </p>
            </header>

            {/* ── LIGNE 1 : Météo | Éphémérides | Fête ── */}
            <div className={styles.gridLigne1}>
                <WeatherCard/>
                <EphemeridesCard/>
                <FeteCard/>
            </div>

            {/* ── LIGNE 2 : Journée | Saviez-vous | Citation | Dicton ── */}
            <div className={styles.gridLigne2}>
                <JourneeCard/>
                <SaviezVousCard/>
                <CitationCard/>
                <DictonCard/>
            </div>

            {/* ── LIGNE 3 : Arrivé | Nés | Partis ── */}
            <div className={styles.gridLigne3}>
                <ArriveCard />
                <NaissancesCard />
                <DecesCard />
            </div>

        </main>
    )
}