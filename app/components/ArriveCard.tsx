"use client"
import { useState, useEffect } from "react"
import Card from "./Card"

type Evenement = { annee: number; texte: string; imageUrl: string | null }

export default function ArriveCard() {
    const [evenements, setEvenements] = useState<Evenement[]>([])
    const [index, setIndex] = useState(0)
    const [fading, setFading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [touchStartX, setTouchStartX] = useState<number | null>(null)

    const today = new Date()
    const jour = today.getDate()
    const mois = today.toLocaleDateString("fr-FR", { month: "long" })
    const MM = String(today.getMonth()+1).padStart(2,"0")
    const DD = String(today.getDate()).padStart(2,"0")

    useEffect(() => {
        fetch(`https://api.wikimedia.org/feed/v1/wikipedia/fr/onthisday/events/${MM}/${DD}`)
            .then(r => r.json()).then(data => {
            const sorted = [...(data?.events??[])].sort((a:any,b:any)=>b.year-a.year)
            const step = Math.floor(sorted.length/5)
            setEvenements([0,1,2,3,4].map(i=>sorted[i*step]??sorted[i]).filter(Boolean).map((e:any)=>({
                annee: e.year, texte: e.text,
                imageUrl: e.pages?.[0]?.thumbnail?.source?.replace(/\/\d+px-/,"/400px-")??null
            })))
            setLoading(false)
        }).catch(()=>setLoading(false))
    }, [MM, DD])

    useEffect(() => {
        if (evenements.length <= 1) return
        const interval = setInterval(() => {
            setIndex(i => (i + 1) % evenements.length)
        }, 20000)
        return () => clearInterval(interval)
    }, [evenements.length])

    const goTo = (i: number) => { setFading(true); setTimeout(() => { setIndex(i); setFading(false) }, 300) }
    const goPrev = () => goTo((index - 1 + evenements.length) % evenements.length)
    const goNext = () => goTo((index + 1) % evenements.length)

    const current = evenements[index]

    return (
        <Card title={`C'est arrivé un ${jour} ${mois}`} emoji="📅" bgColor="#c8ece6" accent="#2d6a5e">

            {/* ── NAVIGATION ── */}
            {evenements.length > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>

                    <button onClick={goPrev} style={{
                        width: "34px", height: "34px", borderRadius: "50%",
                        border: "1.5px solid #2d6a5e44", background: "rgba(255,255,255,0.7)",
                        cursor: "pointer", fontSize: "16px", display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0,
                        color: "#2d6a5e", transition: "background 0.2s",
                    }}>‹</button>

                    <div style={{ display: "flex", gap: "6px", flex: 1, justifyContent: "center" }}>
                        {evenements.map((_, i) => (
                            <button key={i} onClick={() => goTo(i)} style={{
                                width: i === index ? "22px" : "10px",
                                height: "10px", borderRadius: "20px",
                                background: i === index ? "#2d6a5e" : "#2d6a5e33",
                                border: "none", cursor: "pointer", padding: 0,
                                transition: "all 0.3s ease",
                            }} />
                        ))}
                    </div>

                    <button onClick={goNext} style={{
                        width: "34px", height: "34px", borderRadius: "50%",
                        border: "1.5px solid #2d6a5e44", background: "rgba(255,255,255,0.7)",
                        cursor: "pointer", fontSize: "16px", display: "flex",
                        alignItems: "center", justifyContent: "center", flexShrink: 0,
                        color: "#2d6a5e", transition: "background 0.2s",
                    }}>›</button>

                </div>
            )}

            {/* ── CONTENU avec swipe ── */}
            {loading ? <p style={{ color: "var(--text-muted)" }}>Chargement...</p> : current ? (
                <div
                    onTouchStart={e => setTouchStartX(e.touches[0].clientX)}
                    onTouchEnd={e => {
                        if (touchStartX === null) return
                        const diff = touchStartX - e.changedTouches[0].clientX
                        if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev()
                        setTouchStartX(null)
                    }}
                    style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s", display: "flex", gap: "16px", alignItems: "flex-start" }}
                >
                    <div style={{ width: "80px", height: "80px", borderRadius: "14px", flexShrink: 0, overflow: "hidden", background: "rgba(45,106,94,0.1)", border: "2px solid #2d6a5e22", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {current.imageUrl
                            ? <img src={current.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            : <span style={{ fontSize: "2.5rem" }}>📅</span>
                        }
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "var(--font-licorice)", fontSize: "1.8rem", color: "#2d6a5e", lineHeight: 1, marginBottom: "8px" }}>En {current.annee}</p>
                        <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--text-dark)" }}>{current.texte}</p>
                    </div>
                </div>
            ) : <p style={{ color: "var(--text-muted)" }}>Aucun événement trouvé.</p>}

        </Card>
    )
}