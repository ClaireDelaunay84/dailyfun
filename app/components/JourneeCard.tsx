"use client"
import { useState, useEffect } from "react"
import Card from "./Card"
import { getJourneesduJour } from "../data/journeesInternationales"

export default function JourneeCard() {
    const journees = getJourneesduJour()
    const [index, setIndex] = useState(0)
    const [fading, setFading] = useState(false)
    const [touchStartX, setTouchStartX] = useState<number | null>(null)

    useEffect(() => {
        if (journees.length <= 1) return
        const interval = setInterval(() => {
            setIndex(i => (i + 1) % journees.length)
        }, 20000)
        return () => clearInterval(interval)
    }, [journees.length])

    const goTo = (i: number) => {
        setFading(true)
        setTimeout(() => { setIndex(i); setFading(false) }, 300)
    }
    const goPrev = () => goTo((index - 1 + journees.length) % journees.length)
    const goNext = () => goTo((index + 1) % journees.length)

    const current = journees[index]

    return (
        <Card title="Journée internationale" bgColor="#D6CEC4" accent="#5C4430">
            {journees.length > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <button onClick={goPrev} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #D9CCBA", background: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#9E7F5C" }}>‹</button>
                    <div style={{ display: "flex", gap: "6px", flex: 1, justifyContent: "center" }}>
                        {journees.map((_, i) => (
                            <button key={i} onClick={() => goTo(i)} style={{ width: i === index ? "22px" : "10px", height: "10px", borderRadius: "20px", background: i === index ? "#9E7F5C" : "#9E7F5C33", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
                        ))}
                    </div>
                    <button onClick={goNext} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #D9CCBA", background: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#9E7F5C" }}>›</button>
                </div>
            )}
            <div
                onTouchStart={e => setTouchStartX(e.touches[0].clientX)}
                onTouchEnd={e => {
                    if (touchStartX === null) return
                    const diff = touchStartX - e.changedTouches[0].clientX
                    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev()
                    setTouchStartX(null)
                }}
                style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s ease", display: "flex", flexDirection: "column", gap: "12px" }}
            >
                <p style={{ fontFamily: "var(--font-licorice)", fontSize: "2.4rem", color: "#5C4430", lineHeight: 1.2 }}>
                    {current.nom}
                </p>
                <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-muted)", borderLeft: "3px solid #C8B49A", paddingLeft: "14px" }}>
                    {current.description}
                </p>
            </div>
        </Card>
    )
}