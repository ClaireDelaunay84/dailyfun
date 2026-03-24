"use client"
import { useEffect, useState } from "react"
import SunCalc from "suncalc"
import Card from "./Card"

type SunData = { lever: string; coucher: string; duree: string }

function formatTime(date: Date): string {
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", hour12: false })
}
function getDuree(lever: Date, coucher: Date): string {
    const diff = coucher.getTime() - lever.getTime()
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    return `${h}h${String(m).padStart(2, "0")}`
}

export default function EphemeridesCard() {
    const [sun, setSun] = useState<SunData | null>(null)

    useEffect(() => {
        const compute = (lat: number, lng: number) => {
            const times = SunCalc.getTimes(new Date(), lat, lng)
            setSun({ lever: formatTime(times.sunrise), coucher: formatTime(times.sunset), duree: getDuree(times.sunrise, times.sunset) })
        }
        if (!navigator.geolocation) { compute(48.8566, 2.3522); return }
        navigator.geolocation.getCurrentPosition(
            pos => compute(pos.coords.latitude, pos.coords.longitude),
            () => compute(48.8566, 2.3522)
        )
    }, [])

    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const jourAnnee = Math.ceil((today.getTime() - startOfYear.getTime()) / 86400000)
    const joursRestants = Math.ceil((new Date(today.getFullYear(), 11, 31).getTime() - today.getTime()) / 86400000)
    const numSemaine = Math.ceil(jourAnnee / 7)

    return (
        <Card title="Éphémérides" emoji="🌅" bgColor="#c8ece6" accent="#3d8a78">
            {!sun && <p style={{ color: "var(--text-muted)" }}>Calcul en cours...</p>}
            {sun && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "4px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "8px" }}>
                        {[
                            { label: "Lever", icon: "🌄", time: sun.lever },
                            { label: "Coucher", icon: "🌇", time: sun.coucher },
                        ].map((item, i) => (
                            <div key={item.label} style={{ textAlign: "center", gridColumn: i === 1 ? 3 : 1 }}>
                                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</p>
                                <p style={{ fontSize: "2rem" }}>{item.icon}</p>
                                <p style={{ fontSize: "1.8rem", fontWeight: 700, fontFamily: "var(--font-jost)", lineHeight: 1, color: "var(--text-dark)" }}>{item.time}</p>
                            </div>
                        ))}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", gridColumn: 2 }}>
                            <div style={{ width: "3px", height: "60px", background: "linear-gradient(to bottom, #3d8a78, #a8d8d0)", borderRadius: "4px" }} />
                            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{sun.duree}</p>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "14px", borderTop: "0.5px solid #3d8a7822", gap: "8px" }}>
                        {[
                            { label: "Jour de l'année", value: jourAnnee },
                            { label: "Semaine", value: `N°${numSemaine}` },
                            { label: "Jours restants", value: joursRestants },
                        ].map(({ label, value }) => (
                            <div key={label} style={{ textAlign: "center", flex: 1 }}>
                                <p style={{ fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-jost)", color: "var(--text-dark)", lineHeight: 1, marginBottom: "4px" }}>{value}</p>
                                <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    )
}
