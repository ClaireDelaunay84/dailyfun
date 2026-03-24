"use client"
import { useState, useEffect } from "react"
import Card from "./Card"
import { getJourneesduJour } from "../data/journeesInternationales"

export default function JourneeCard() {
    const journees = getJourneesduJour()
    const [index, setIndex] = useState(0)
    const [fading, setFading] = useState(false)

    useEffect(() => {
        if (journees.length <= 1) return
        const interval = setInterval(() => {
            setFading(true)
            setTimeout(() => { setIndex(i => (i + 1) % journees.length); setFading(false) }, 300)
        }, 20000)
        return () => clearInterval(interval)
    }, [journees.length])

    const goTo = (i: number) => {
        setFading(true)
        setTimeout(() => { setIndex(i); setFading(false) }, 300)
    }

    const current = journees[index]

    return (
        <Card title="Journée internationale" emoji="🌍" bgColor="#d0e8f8" accent="#2d5a7a">
            {journees.length > 1 && (
                <div style={{ display: "flex", gap: "6px", marginBottom: "18px" }}>
                    {journees.map((_, i) => (
                        <div key={i} onClick={() => goTo(i)} style={{
                            height: "3px", flex: 1, borderRadius: "4px", cursor: "pointer",
                            background: i === index ? "#2d5a7a" : "#2d5a7a22",
                            transition: "background 0.3s",
                        }} />
                    ))}
                </div>
            )}
            <div style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s ease", display: "flex", flexDirection: "column", gap: "12px" }}>
                <p style={{ fontFamily: "var(--font-licorice)", fontSize: "2.4rem", color: "#2d5a7a", lineHeight: 1.2 }}>
                    {current.nom}
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-muted)", borderLeft: "3px solid #2d5a7a33", paddingLeft: "14px" }}>
                    {current.description}
                </p>
            </div>
        </Card>
    )
}
