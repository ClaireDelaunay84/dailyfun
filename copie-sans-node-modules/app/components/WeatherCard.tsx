"use client"

import { useEffect, useState } from "react"
import Card from "./Card"

type WeatherPeriod = {
    temp: number
    description: string
    icon: string
}

type WeatherData = {
    city: string
    morning: WeatherPeriod
    afternoon: WeatherPeriod
    humidity: number
    wind: number
}

const ICON_MAP: Record<string, string> = {
    "01": "☀️", "02": "🌤️", "03": "⛅", "04": "☁️",
    "09": "🌧️", "10": "🌦️", "11": "⛈️", "13": "❄️", "50": "🌫️"
}

function getEmoji(iconCode: string) {
    const key = iconCode.slice(0, 2)
    return ICON_MAP[key] ?? "🌡️"
}

export default function WeatherCard() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Géolocalisation non supportée")
            setLoading(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords
                    const key = process.env.NEXT_PUBLIC_OPENWEATHER_KEY
                    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${key}`
                    const res = await fetch(url)
                    const data = await res.json()

                    if (data.cod !== "200") throw new Error(data.message)

                    // On cherche les créneaux matin (9h) et après-midi (15h)
                    const todayStr = new Date().toISOString().slice(0, 10)
                    const slots = data.list.filter((d: any) =>
                        d.dt_txt.startsWith(todayStr)
                    )

                    const morning = slots.find((d: any) => d.dt_txt.includes("09:00")) ?? slots[0]
                    const afternoon = slots.find((d: any) => d.dt_txt.includes("15:00")) ?? slots[1] ?? slots[0]

                    setWeather({
                        city: data.city.name,
                        morning: {
                            temp: Math.round(morning.main.temp),
                            description: morning.weather[0].description,
                            icon: getEmoji(morning.weather[0].icon),
                        },
                        afternoon: {
                            temp: Math.round(afternoon.main.temp),
                            description: afternoon.weather[0].description,
                            icon: getEmoji(afternoon.weather[0].icon),
                        },
                        humidity: morning.main.humidity,
                        wind: Math.round(morning.wind.speed * 3.6),
                    })
                } catch (e) {
                    setError("Impossible de récupérer la météo")
                } finally {
                    setLoading(false)
                }
            },
            () => {
                setError("Localisation refusée")
                setLoading(false)
            }
        )
    }, [])

    return (
        <Card title="Météo" emoji="⛅" accent="#C8B6FF">
            {loading && (
                <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
                    📍 Localisation en cours...
                </p>
            )}

            {error && (
                <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>⚠️ {error}</p>
            )}

            {weather && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px"}}>

                    {/* Ville */}
                    <div style={{display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap"}}>
                        <p style={{color: "var(--text-muted)", fontSize: "0.85rem", flex: 1}}>
                            📍 {weather.city}
                        </p>
                        <span style={{
                            background: "#C8B6FF22",
                            borderRadius: "8px",
                            padding: "3px 8px",
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            whiteSpace: "nowrap"
                        }}>
                         💨 {weather.wind} km/h
                        </span>
                        <span style={{
                            background: "#C8B6FF22",
                            borderRadius: "8px",
                            padding: "3px 8px",
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            whiteSpace: "nowrap"
                        }}>
                        💧 {weather.humidity}%
                        </span>
                    </div>

                    {/* Matin / Après-midi */}
                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px"}}>
                        {[
                            {label: "Matin", data: weather.morning},
                            {label: "Après-midi", data: weather.afternoon},
                        ].map(({label, data}) => (
                            <div key={label} style={{
                                background: "#C8B6FF11",
                                borderRadius: "14px",
                                padding: "12px",
                                textAlign: "center",
                            }}>
                                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase" }}>{label}</p>
                                <p style={{ fontSize: "2rem", margin: "0" }}>{data.icon}</p>
                                <p style={{ fontSize: "1.6rem", fontWeight: 700, fontFamily: "var(--font-poppins)" }}>{data.temp}°</p>
                                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px", textTransform: "capitalize" }}>{data.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    )
}