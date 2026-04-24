"use client"
import { useEffect, useState } from "react"
import SunCalc from "suncalc"
import Card from "./Card"

type SunData = { lever: string; coucher: string; duree: string }

const fmt = (d: Date) => d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", hour12: false })
const dur = (l: Date, c: Date) => { const d = c.getTime()-l.getTime(); return `${Math.floor(d/3600000)}h${String(Math.floor((d%3600000)/60000)).padStart(2,"0")}` }

export default function EphemeridesCard() {
    const [sun, setSun] = useState<SunData | null>(null)

    useEffect(() => {
        const compute = (lat: number, lng: number) => {
            const t = SunCalc.getTimes(new Date(), lat, lng)
            setSun({ lever: fmt(t.sunrise), coucher: fmt(t.sunset), duree: dur(t.sunrise, t.sunset) })
        }
        if (!navigator.geolocation) { compute(48.8566, 2.3522); return }
        navigator.geolocation.getCurrentPosition(
            pos => compute(pos.coords.latitude, pos.coords.longitude),
            () => compute(48.8566, 2.3522)
        )
    }, [])

    const today = new Date()
    const soy = new Date(today.getFullYear(), 0, 1)
    const jourAnnee = Math.ceil((today.getTime()-soy.getTime())/86400000)
    const joursRestants = Math.ceil((new Date(today.getFullYear(),11,31).getTime()-today.getTime())/86400000)
    const numSemaine = Math.ceil(jourAnnee/7)

    return (
        <Card title="Éphémérides" bgColor="#E4D5BC" accent="#5C4430">
            {!sun && <p style={{ color: "var(--text-muted)" }}>Calcul en cours...</p>}
            {sun && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "12px" }}>
                        {[{label:"Lever",icon:"🌄",time:sun.lever},{label:"Coucher",icon:"🌇",time:sun.coucher}].map((item, i) => (
                            <div key={item.label} style={{ textAlign: "center", gridColumn: i===0?1:3 }}>
                                <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>{item.label}</p>
                                <p style={{ fontSize: "2.2rem" }}>{item.icon}</p>
                                <p style={{ fontFamily: "var(--font-licorice)", fontSize: "5.2rem", color: "#5C4430", lineHeight: 1 }}>{item.time}</p>
                            </div>
                        ))}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", gridColumn: 2 }}>
                            <div style={{ width: "3px", height: "60px", background: "linear-gradient(to bottom, #9E7F5C, #D9CCBA)", borderRadius: "4px" }} />
                            <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{sun.duree}</p>
                        </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px", paddingTop: "16px", borderTop: "1px solid #D9CCBA" }}>
                        {[{label:"Jour de l'année",value:jourAnnee},{label:"Semaine",value:`N°${numSemaine}`},{label:"Jours restants",value:joursRestants}].map(({label,value}) => (
                            <div key={label} style={{ textAlign: "center" }}>
                                <p style={{ fontFamily: "var(--font-licorice)", fontSize: "5rem", color: "#5C4430", lineHeight: 1, marginBottom: "4px" }}>{value}</p>
                                <p style={{ fontSize: "0.62rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    )
}