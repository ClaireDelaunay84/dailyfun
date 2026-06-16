"use client"
import { useEffect, useState } from "react"
import styles from "../page.module.css"

type WeatherData = {
    city: string; temp: number; description: string; icon: string
    humidity: number; wind: number
    morning: { temp: number; icon: string }
    afternoon: { temp: number; icon: string }
    evening: { temp: number; icon: string }
}

const ICON_MAP: Record<string, string> = {
    "01": "☀️", "02": "🌤️", "03": "⛅", "04": "☁️",
    "09": "🌧️", "10": "🌦️", "11": "⛈️", "13": "❄️", "50": "🌫️"
}
const getEmoji = (code: string) => ICON_MAP[code.slice(0, 2)] ?? "🌡️"

export default function WeatherCard() {
    const [w, setW] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!navigator.geolocation) { setLoading(false); return }
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords
                    const key = process.env.NEXT_PUBLIC_OPENWEATHER_KEY
                    const res = await fetch(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${key}`
                    )
                    const data = await res.json()
                    if (data.cod !== "200") throw new Error()
                    const today = new Date().toISOString().slice(0, 10)
                    const slots = data.list.filter((d: any) => d.dt_txt.startsWith(today))
                    const get = (h: string) => slots.find((d: any) => d.dt_txt.includes(h)) ?? slots[0]
                    const m = get("09:00"), a = get("15:00"), e = get("21:00")
                    const current = slots[0]
                    setW({
                        city: data.city.name,
                        temp: Math.round(current.main.temp),
                        description: current.weather[0].description,
                        icon: getEmoji(current.weather[0].icon),
                        humidity: current.main.humidity,
                        wind: Math.round(current.wind.speed * 3.6),
                        morning:   { temp: Math.round(m.main.temp), icon: getEmoji(m.weather[0].icon) },
                        afternoon: { temp: Math.round(a.main.temp), icon: getEmoji(a.weather[0].icon) },
                        evening:   { temp: Math.round(e.main.temp), icon: getEmoji(e.weather[0].icon) },
                    })
                } catch { /* silencieux */ }
                finally { setLoading(false) }
            },
            () => setLoading(false)
        )
    }, [])

    if (loading) return (
        <div className={styles.weatherCard}>
            <div className={styles.weatherLabel}>MÉTÉO</div>
            <p style={{ fontSize: 12, opacity: 0.7 }}>📍 Localisation...</p>
        </div>
    )

    if (!w) return (
        <div className={styles.weatherCard}>
            <div className={styles.weatherLabel}>MÉTÉO</div>
            <p style={{ fontSize: 12, opacity: 0.7 }}>⚠️ Localisation refusée</p>
        </div>
    )

    return (
        <div className={styles.weatherCard}>
            <div className={styles.weatherLabel}>MÉTÉO — {w.city.toUpperCase()}</div>
            <div className={styles.weatherMain}>
                <div className={styles.weatherTemp}>{w.temp}°</div>
                <div className={styles.weatherDetail}>
                    {w.icon} {w.description}<br />
                    💨 {w.wind} km/h<br />
                    💧 {w.humidity}%
                </div>
            </div>
            <div className={styles.weatherSlots}>
                {[
                    { label: "Matin",   ...w.morning },
                    { label: "A-midi",  ...w.afternoon },
                    { label: "Soir",    ...w.evening },
                ].map(slot => (
                    <div key={slot.label} className={styles.weatherSlot}>
                        <div className={styles.weatherSlotLabel}>{slot.label}</div>
                        <div style={{ fontSize: 14, margin: "2px 0" }}>{slot.icon}</div>
                        <div className={styles.weatherSlotTemp}>{slot.temp}°</div>
                    </div>
                ))}
            </div>
        </div>
    )
}