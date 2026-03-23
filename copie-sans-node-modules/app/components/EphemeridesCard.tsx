"use client"

import { useEffect, useState } from "react"
import SunCalc from "suncalc"
import Card from "./Card"
import {
    IconMeteo, IconFete, IconMonde, IconSavoir,
    IconCalendrier, IconNaissance, IconDeces,
    IconDicton, IconProverbe, IconSoleil
} from "./Icons"

type SunData = {
    lever: string
    coucher: string
    duree: string
    aube: string
    crepuscule: string
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    })
}

function getDuree(lever: Date, coucher: Date): string {
    const diff = coucher.getTime() - lever.getTime()
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    return `${hours}h${String(minutes).padStart(2, "0")}`
}

export default function EphemeridesCard() {
    const [sun, setSun] = useState<SunData | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Géolocalisation non supportée")
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords
                const today = new Date()
                const times = SunCalc.getTimes(today, latitude, longitude)

                setSun({
                    lever: formatTime(times.sunrise),
                    coucher: formatTime(times.sunset),
                    duree: getDuree(times.sunrise, times.sunset),
                    aube: formatTime(times.dawn),
                    crepuscule: formatTime(times.dusk),
                })
            },
            () => {
                // Fallback sur Paris si géoloc refusée
                const today = new Date()
                const times = SunCalc.getTimes(today, 48.8566, 2.3522)
                setSun({
                    lever: formatTime(times.sunrise),
                    coucher: formatTime(times.sunset),
                    duree: getDuree(times.sunrise, times.sunset),
                    aube: formatTime(times.dawn),
                    crepuscule: formatTime(times.dusk),
                })
            }
        )
    }, [])

    const today = new Date()
    const startOfYear = new Date(today.getFullYear(), 0, 1)
    const jourAnnee = Math.ceil((today.getTime() - startOfYear.getTime()) / 86400000)
    const finAnnee = new Date(today.getFullYear(), 11, 31)
    const joursRestants = Math.ceil((finAnnee.getTime() - today.getTime()) / 86400000)
    const numSemaine = Math.ceil(jourAnnee / 7)

    return (
        <Card title="Éphémérides" emoji="🌅" accent="#FFC8DD">
            {!sun && !error && (
                <p style={{ color: "var(--text-muted)" }}>Calcul en cours...</p>
            )}

            {error && (
                <p style={{ color: "var(--text-muted)" }}>⚠️ {error}</p>
            )}

            {sun && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "4px" }}>

                    {/* Lever / Coucher */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "8px" }}>

                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Lever</p>
                            <p style={{ fontSize: "2rem" }}>🌄</p>
                            <p style={{ fontSize: "1.8rem", fontWeight: 700, fontFamily: "var(--font-poppins)", lineHeight: 1 }}>{sun.lever}</p>
                        </div>

                        {/* Barre de progression du jour */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                            <div style={{
                                width: "3px",
                                height: "60px",
                                background: "linear-gradient(to bottom, #FFF3A3, #FFC8DD)",
                                borderRadius: "4px",
                            }} />
                            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{sun.duree}</p>
                        </div>

                        <div style={{ textAlign: "center" }}>
                            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Coucher</p>
                            <p style={{ fontSize: "2rem" }}>🌇</p>
                            <p style={{ fontSize: "1.8rem", fontWeight: 700, fontFamily: "var(--font-poppins)", lineHeight: 1 }}>{sun.coucher}</p>
                        </div>

                    </div>

                    {/* Infos calendaires */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "14px",
                        borderTop: "1px solid rgba(255,200,221,0.3)",
                        gap: "8px",
                    }}>
                        {[
                            { label: "Jour de l'année", value: jourAnnee },
                            { label: "Semaine", value: `N°${numSemaine}` },
                            { label: "Jours restants", value: joursRestants },
                        ].map(({ label, value }) => (
                            <div key={label} style={{ textAlign: "center", flex: 1 }}>
                                <p style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 700,
                                    fontFamily: "var(--font-poppins)",
                                    color: "var(--text-dark)",
                                    lineHeight: 1,
                                    marginBottom: "4px",
                                }}>
                                    {value}
                                </p>
                                <p style={{
                                    fontSize: "0.65rem",
                                    color: "var(--text-muted)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                }}>
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </Card>
    )
}