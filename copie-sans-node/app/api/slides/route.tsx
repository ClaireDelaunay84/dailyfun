import { ImageResponse } from "@vercel/og"
import { getDictonDuJour } from "../../data/dictons"
import { getCitationsDuJour } from "../../data/citations"
import { getFeteduJour } from "../../data/fetes"
import { getSaviezVousDuJour } from "../../data/saviezVous"
import { getJourneesduJour } from "../../data/journeesInternationales"

export const runtime = "edge"

const planning: Record<number, string[]> = {
    1: ["citation", "saviezVous", "journee", "arrive", "cta"],
    2: ["fete", "dicton", "naissance", "saviezVous", "cta"],
    3: ["arrive", "citation", "journee", "deces", "cta"],
    4: ["saviezVous", "fete", "dicton", "naissance", "cta"],
    5: ["citation", "journee", "arrive", "saviezVous", "cta"],
    6: ["naissance", "deces", "dicton", "citation", "cta"],
    0: ["journee", "saviezVous", "fete", "arrive", "cta"],
}

type SlideConfig = {
    bgImage: string
    color: string
    highlight: string
    label: string
    align: "center" | "flex-start" | "flex-end"
}

const slideConfig: Record<string, SlideConfig> = {
    citation:   { bgImage: "bg-02.png",  color: "#7C3AED",  highlight: "rgba(124,58,237,0.9)",   label: "CITATION DU JOUR",        align: "center" },
    saviezVous: { bgImage: "bg-09.png",  color: "#16A34A",  highlight: "rgba(22,163,74,0.9)",    label: "LE SAVIEZ-VOUS ?",        align: "center" },
    journee:    { bgImage: "bg-07.png",  color: "#0284C7",  highlight: "rgba(2,132,199,0.9)",    label: "JOURNEE INTERNATIONALE",  align: "center" },
    arrive:     { bgImage: "bg-08.png",  color: "#CA8A04",  highlight: "rgba(202,138,4,0.9)",    label: "C'EST ARRIVE UN...",      align: "flex-start" },
    fete:       { bgImage: "bg-08.png",  color: "#D97706",  highlight: "rgba(217,119,6,0.9)",    label: "FETE DU JOUR",            align: "flex-start" },
    dicton:     { bgImage: "bg-10.png",  color: "#D97706",  highlight: "rgba(217,119,6,0.9)",    label: "DICTON DU JOUR",          align: "center" },
    naissance:  { bgImage: "bg-01.png",  color: "#7C3AED",  highlight: "rgba(124,58,237,0.9)",   label: "ILS SONT NES UN...",      align: "flex-start" },
    deces:      { bgImage: "bg-09.png",  color: "#E11D48",  highlight: "rgba(225,29,72,0.9)",    label: "ILS SONT PARTIS UN...",   align: "flex-start" },
    cta:        { bgImage: "bg-01.png",  color: "#6366F1",  highlight: "rgba(99,102,241,0.9)",   label: "",                        align: "center" },
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const baseUrl = new URL(request.url).origin
    const slideIndex = parseInt(searchParams.get("slide") ?? "0")
    const today = new Date()
    const dayOfWeek = today.getDay()
    const slides = planning[dayOfWeek] ?? planning[1]
    const slideType = slides[slideIndex] ?? "cta"
    const config = slideConfig[slideType] ?? slideConfig.cta

    const MM = String(today.getMonth() + 1).padStart(2, "0")
    const DD = String(today.getDate()).padStart(2, "0")
    const dateStr = today
        .toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        .replace(/^\w/, c => c.toUpperCase())

    const [fontPoppins, fontNunito] = await Promise.all([
        fetch(new URL("/fonts/Poppins-Bold.ttf", baseUrl)).then(r => r.arrayBuffer()),
        fetch(new URL("/fonts/Nunito-Regular.ttf", baseUrl)).then(r => r.arrayBuffer()),
    ])

    let emoji = ""
    let annee = ""
    let title = ""
    let subtitle = ""

    if (slideType === "citation") {
        const c = getCitationsDuJour()[0]
        title = `"${c.texte}"`
        subtitle = `— ${c.auteur}`
    } else if (slideType === "saviezVous") {
        const s = getSaviezVousDuJour()
        title = s.texte
        emoji = s.emoji
    } else if (slideType === "journee") {
        const j = getJourneesduJour()[0]
        title = j.nom
        subtitle = j.description
        emoji = "🌍"
    } else if (slideType === "fete") {
        const f = getFeteduJour()
        title = f.prenom
        subtitle = f.anecdote
        emoji = "🎉"
    } else if (slideType === "dicton") {
        const d = getDictonDuJour()
        title = `"${d}"`
        emoji = "💬"
    } else if (slideType === "arrive") {
        try {
            const res = await fetch(
                `https://api.wikimedia.org/feed/v1/wikipedia/fr/onthisday/events/${MM}/${DD}`,
                { headers: { "User-Agent": "Dailyfun/1.0 (https://dailyfun.fr)" } }
            )
            const data = await res.json()
            const events = data?.events ?? []
            const sorted = [...events].sort((a: any, b: any) => b.year - a.year)
            const event = sorted[0]
            if (event) { annee = `En ${event.year}`; title = event.text }
        } catch {}
        emoji = "📅"
    } else if (slideType === "naissance") {
        try {
            const res = await fetch(
                `https://api.wikimedia.org/feed/v1/wikipedia/fr/onthisday/births/${MM}/${DD}`,
                { headers: { "User-Agent": "Dailyfun/1.0 (https://dailyfun.fr)" } }
            )
            const data = await res.json()
            const births = data?.births ?? []
            const person = births.filter((b: any) => b.pages?.[0]?.thumbnail?.source)[0] ?? births[0]
            if (person) {
                title = person.pages?.[0]?.titles?.normalized ?? person.text?.split(",")[0]
                subtitle = person.pages?.[0]?.description ?? ""
                annee = `Né(e) en ${person.year}`
            }
        } catch {}
        emoji = "🎂"
    } else if (slideType === "deces") {
        try {
            const res = await fetch(
                `https://api.wikimedia.org/feed/v1/wikipedia/fr/onthisday/deaths/${MM}/${DD}`,
                { headers: { "User-Agent": "Dailyfun/1.0 (https://dailyfun.fr)" } }
            )
            const data = await res.json()
            const deaths = data?.deaths ?? []
            const person = deaths.filter((b: any) => b.pages?.[0]?.thumbnail?.source)[0] ?? deaths[0]
            if (person) {
                title = person.pages?.[0]?.titles?.normalized ?? person.text?.split(",")[0]
                subtitle = person.pages?.[0]?.description ?? ""
                annee = `Parti(e) en ${person.year}`
            }
        } catch {}
        emoji = "🕯️"
    }

    const isCentered = config.align === "center"
    const textAlign = isCentered ? "center" : "left"

    return new ImageResponse(
        (
            <div style={{ width: 1080, height: 1080, position: "relative", display: "flex" }}>

                {/* Image de fond */}
                <img
                    src={`${baseUrl}/${config.bgImage}`}
                    style={{ position: "absolute", top: 0, left: 0, width: "1080px", height: "1080px", objectFit: "cover" }}
                />

                {/* Overlay noir uniquement sur toute l'image */}
                <div style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "1080px",
                    height: "1080px",
                    background: "rgba(0,0,0,0.65)",
                    display: "flex",
                }} />

                {/* Logo haut gauche — fond noir se fond avec l'overlay */}
                <div style={{ position: "absolute", top: "50px", left: "60px", display: "flex" }}>
                    <img
                        src={`${baseUrl}/logo-dailyfun-ss-fond.png`}
                        style={{ height: "110px", objectFit: "contain", display: "flex" }}
                    />
                </div>

                {/* Zone contenu centrale */}
                <div style={{
                    position: "absolute",
                    top: "200px",
                    bottom: "130px",
                    left: "70px",
                    right: "70px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: config.align,
                    gap: "24px",
                }}>

                    {/* Label section */}
                    {config.label && (
                        <div style={{
                            background: "rgba(255,255,255,0.12)",
                            border: "1.5px solid rgba(255,255,255,0.3)",
                            borderRadius: "30px",
                            padding: "10px 30px",
                            display: "flex",
                        }}>
                            <div style={{
                                fontSize: "22px",
                                fontWeight: 700,
                                color: "white",
                                letterSpacing: "4px",
                                fontFamily: "Poppins",
                                display: "flex",
                            }}>
                                {config.label}
                            </div>
                        </div>
                    )}

                    {/* Emoji */}
                    {emoji && slideType !== "cta" && (
                        <div style={{ fontSize: "80px", lineHeight: 1, display: "flex" }}>
                            {emoji}
                        </div>
                    )}

                    {/* Année */}
                    {annee && (
                        <div style={{ background: config.highlight, borderRadius: "8px", padding: "8px 22px", display: "flex" }}>
                            <div style={{ fontSize: "30px", fontWeight: 700, color: "white", fontFamily: "Poppins", display: "flex" }}>
                                {annee}
                            </div>
                        </div>
                    )}

                    {/* Titre principal */}
                    {title && slideType !== "cta" && (
                        <div style={{
                            fontSize: slideType === "citation" || slideType === "dicton" ? "46px" : "54px",
                            fontWeight: 700,
                            color: "white",
                            lineHeight: 1.3,
                            fontStyle: slideType === "citation" || slideType === "dicton" ? "italic" : "normal",
                            fontFamily: slideType === "citation" || slideType === "dicton" ? "Nunito" : "Poppins",
                            textAlign: textAlign as any,
                            maxWidth: "940px",
                            display: "flex",
                            flexWrap: "wrap",
                            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
                        }}>
                            {title}
                        </div>
                    )}

                    {/* Sous-titre */}
                    {subtitle && (
                        <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "900px" }}>
                            <div style={{
                                fontSize: "32px",
                                color: "rgba(255,255,255,0.85)",
                                lineHeight: 1.5,
                                fontFamily: "Nunito",
                                textAlign: textAlign as any,
                                background: "rgba(255,255,255,0.1)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                padding: "8px 18px",
                                borderRadius: "8px",
                                display: "flex",
                                flexWrap: "wrap",
                            }}>
                                {subtitle}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    {slideType === "cta" && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "28px" }}>
                            <div style={{ fontSize: "36px", color: "rgba(255,255,255,0.75)", fontFamily: "Nunito", display: "flex" }}>
                                Ta dose quotidienne de culture
                            </div>
                            <div style={{ fontSize: "96px", fontWeight: 700, color: "white", fontFamily: "Poppins", textShadow: "0 4px 30px rgba(0,0,0,0.5)", display: "flex" }}>
                                Dailyfun
                            </div>
                            <div style={{ background: "white", borderRadius: "50px", padding: "22px 64px", display: "flex" }}>
                                <div style={{ fontSize: "40px", fontWeight: 700, color: "#6366F1", fontFamily: "Poppins", display: "flex" }}>
                                    dailyfun.fr
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Date fixée tout en bas centrée */}
                <div style={{
                    position: "absolute",
                    bottom: "48px",
                    left: 0, right: 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "18px",
                }}>
                    <div style={{ width: "70px", height: "1px", background: "rgba(255,255,255,0.4)", display: "flex" }} />
                    <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.8)", fontFamily: "Nunito", letterSpacing: "1px", display: "flex" }}>
                        {dateStr}
                    </div>
                    <div style={{ width: "70px", height: "1px", background: "rgba(255,255,255,0.4)", display: "flex" }} />
                </div>

            </div>
        ),
        {
            width: 1080,
            height: 1080,
            fonts: [
                { name: "Poppins", data: fontPoppins, weight: 700, style: "normal" },
                { name: "Nunito", data: fontNunito, weight: 400, style: "normal" },
            ],
        }
    )
}