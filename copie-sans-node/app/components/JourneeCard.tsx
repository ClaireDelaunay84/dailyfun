"use client"
import { useState, useEffect } from "react"
import Card from "./Card"
import { getJourneesduJour } from "../data/journeesInternationales"

export default function JourneeCard() {
    const journees = getJourneesduJour()
    const [index, setIndex] = useState(0)
    const [flipped, setFlipped] = useState(false)

    useEffect(() => {
        if (journees.length <= 1) return
        const interval = setInterval(() => {
            setFlipped(true)
            setTimeout(() => { setIndex(i => (i + 1) % journees.length); setFlipped(false) }, 600)
        }, 20000)
        return () => clearInterval(interval)
    }, [journees.length])

    const current = journees[index]

    return (
        <div style={{ perspective: "1200px", height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{
                transition: "transform 0.6s ease",
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateX(90deg)" : "rotateX(0deg)",
                transformOrigin: "center center",
                flex: 1, display: "flex", flexDirection: "column",
            }}>
                <Card title="Journée internationale" emoji="🌍" bgColor="#d0e8f8" accent="#2d5a7a">
                    {journees.length > 1 && (
                        <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
                            {journees.map((_, i) => (
                                <div key={i} onClick={() => { setFlipped(true); setTimeout(() => { setIndex(i); setFlipped(false) }, 600) }}
                                     style={{ height: "3px", flex: 1, borderRadius: "4px", background: i === index ? "#2d5a7a" : "#2d5a7a33", cursor: "pointer", transition: "background 0.3s" }}
                                />
                            ))}
                        </div>
                    )}
                    <p style={{ fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-jost)", lineHeight: 1.3, marginBottom: "12px", color: "var(--text-dark)" }}>
                        {current.nom}
                    </p>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)", borderLeft: "3px solid #2d5a7a33", paddingLeft: "12px" }}>
                        {current.description}
                    </p>
                </Card>
            </div>
        </div>
    )
}
