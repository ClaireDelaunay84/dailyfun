"use client"
import { useState, useEffect } from "react"
import Card from "./Card"
import { getCitationsDuJour } from "../data/citations"

export default function CitationCard() {
    const citations = getCitationsDuJour()
    const [index, setIndex] = useState(0)
    const [fading, setFading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [touchStartX, setTouchStartX] = useState<number | null>(null)

    useEffect(() => {
        if (citations.length <= 1) return
        const interval = setInterval(() => {
            setIndex(i => (i + 1) % citations.length)
        }, 20000)
        return () => clearInterval(interval)
    }, [citations.length])

    useEffect(() => {
        const auteur = citations[index]?.auteur
        if (!auteur) return
        setImageUrl(null)
        fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(auteur)}`)
            .then(r => r.json()).then(d => setImageUrl(d?.thumbnail?.source ?? null)).catch(() => {})
    }, [index, citations])

    const goTo = (i: number) => {
        setFading(true)
        setTimeout(() => { setIndex(i); setFading(false) }, 300)
    }
    const goPrev = () => goTo((index - 1 + citations.length) % citations.length)
    const goNext = () => goTo((index + 1) % citations.length)

    const current = citations[index]

    return (
        <Card title="Citation du jour" bgColor="#EAE0D0" accent="#5C4430">
            {citations.length > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <button onClick={goPrev} style={{ width: "34px", height: "34px", borderRadius: "50%", border: "1.5px solid #D9CCBA", background: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#9E7F5C" }}>‹</button>
                    <div style={{ display: "flex", gap: "6px", flex: 1, justifyContent: "center" }}>
                        {citations.map((_, i) => (
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
                style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s ease", display: "flex", gap: "18px", alignItems: "flex-start" }}
            >
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", flexShrink: 0, overflow: "hidden", background: "rgba(158,127,92,0.12)", border: "2px solid #D9CCBA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {imageUrl
                        ? <img src={imageUrl} alt={current.auteur} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                        : <span style={{ fontSize: "1.8rem" }}>✍️</span>
                    }
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "var(--font-licorice)", fontSize: "2.7rem", color: "#5C4430", lineHeight: 1, marginBottom: "10px" }}>
                        "{current.texte}"
                    </p>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#9E7F5C", letterSpacing: "0.5px" }}>
                        — {current.auteur}
                    </p>
                </div>
            </div>
        </Card>
    )
}