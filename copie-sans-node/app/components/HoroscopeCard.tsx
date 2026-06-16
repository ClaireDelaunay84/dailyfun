"use client"
import { useState, useEffect } from "react"

const SIGNES = [
    { id: "belier",     label: "Bélier",     img: "/horoscope/belier.png",     dates: "21 mars – 19 avr." },
    { id: "taureau",    label: "Taureau",    img: "/horoscope/taureau.png",    dates: "20 avr. – 20 mai" },
    { id: "gemeaux",    label: "Gémeaux",    img: "/horoscope/gemeaux.png",    dates: "21 mai – 20 juin" },
    { id: "cancer",     label: "Cancer",     img: "/horoscope/cancer.png",     dates: "21 juin – 22 juil." },
    { id: "lion",       label: "Lion",       img: "/horoscope/leo.png",        dates: "23 juil. – 22 août" },
    { id: "vierge",     label: "Vierge",     img: "/horoscope/vierge.png",     dates: "23 août – 22 sept." },
    { id: "balance",    label: "Balance",    img: "/horoscope/balance.png",    dates: "23 sept. – 22 oct." },
    { id: "scorpion",   label: "Scorpion",   img: "/horoscope/scorpion.png",   dates: "23 oct. – 21 nov." },
    { id: "sagittaire", label: "Sagittaire", img: "/horoscope/sagittaire.png", dates: "22 nov. – 21 déc." },
    { id: "capricorne", label: "Capricorne", img: "/horoscope/capricorne.png", dates: "22 déc. – 19 janv." },
    { id: "verseau",    label: "Verseau",    img: "/horoscope/verseau.png",    dates: "20 janv. – 18 fév." },
    { id: "poissons",   label: "Poissons",   img: "/horoscope/poissons.png",   dates: "19 fév. – 20 mars" },
]

type SigneData = {
    message: string
    conseil: string
    chiffre: number
    couleur: string
    amour: number
    travail: number
    sante: number
    finances: number
}

const INDIGO = "rgba(110,90,170,0.65)"
const INDIGO_SHADOW = "rgba(60,40,120,0.4)"

function Etoiles({ note }: { note: number }) {
    return (
        <div style={{ display: "flex", gap: "2px" }}>
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} style={{
                    fontSize: "14px",
                    color: i <= note ? "#f5c518" : "rgba(255,255,255,0.15)",
                }}>★</span>
            ))}
        </div>
    )
}

function DomainRow({ label, note, emoji }: { label: string; note: number; emoji: string }) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 12px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "8px",
        }}>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                {emoji} {label}
            </span>
            <Etoiles note={note} />
        </div>
    )
}

export default function HoroscopeCard() {
    const [selected, setSelected] = useState<string | null>(null)
    const [signes, setSignes] = useState<Record<string, SigneData>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/horoscope")
            .then(res => res.json())
            .then(data => {
                setSignes(data.signes ?? {});
                setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const signe = SIGNES.find(s => s.id === selected)
    const data = selected ? signes[selected] : null

    // ── Vue grille ──
    if (!selected) {
        return (
            <div style={{ padding: "8px 0" }}>
                <p style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                    textAlign: "center",
                    marginBottom: "20px",
                }}>
                    Choisis ton signe
                </p>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "16px",
                }}>
                    {SIGNES.map(s => (
                        <div
                            key={s.id}
                            onClick={() => setSelected(s.id)}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", cursor: "pointer" }}
                        >
                            <div style={{
                                width: 56, height: 56,
                                borderRadius: Math.round(56 * 0.3),
                                background: INDIGO,
                                boxShadow: `4px 5px 10px ${INDIGO_SHADOW}`,
                                border: "1px solid rgba(255,255,255,0.25)",
                                backdropFilter: "blur(8px)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <img src={s.img} alt={s.label} style={{ width: 34, height: 34, objectFit: "contain" }} />
                            </div>
                            <span style={{
                                fontSize: "10px",
                                color: "rgba(255,255,255,0.75)",
                                textAlign: "center",
                                fontWeight: 500,
                            }}>
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // ── Vue détail ──
    return (
        <div>
            <button
                onClick={() => setSelected(null)}
                style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "8px",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "12px",
                    padding: "6px 12px",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                ← Tous les signes
            </button>

            {loading ? (
                <div style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "24px 0" }}>
                    ✨ Consultation des astres...
                </div>
            ) : data && signe ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                    {/* En-tête */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: "14px",
                        padding: "14px 16px",
                        background: INDIGO,
                        borderRadius: "14px",
                        border: "1px solid rgba(255,255,255,0.2)",
                    }}>
                        <div style={{
                            width: 52, height: 52, borderRadius: 14,
                            background: "rgba(255,255,255,0.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <img src={signe.img} alt={signe.label} style={{ width: 34, height: 34, objectFit: "contain" }} />
                        </div>
                        <div>
                            <div style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>{signe.label}</div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>{signe.dates}</div>
                        </div>
                    </div>

                    {/* Message */}
                    <p style={{
                        fontSize: "14px", lineHeight: 1.75,
                        color: "rgba(255,255,255,0.85)",
                        fontStyle: "italic",
                        margin: 0,
                    }}>
                        {data.message}
                    </p>

                    {/* Domaines */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <DomainRow label="Amour"    note={Number(data.amour    ?? data["amour"]    ?? 0)} emoji="❤️" />
                        <DomainRow label="Travail"  note={Number(data.travail  ?? data["travail"]  ?? 0)} emoji="💼" />
                        <DomainRow label="Santé"    note={Number(data.sante    ?? data["sante"]    ?? 0)} emoji="🌿" />
                        <DomainRow label="Finances" note={Number(data.finances ?? data["finances"] ?? 0)} emoji="💰" />
                    </div>

                    {/* Conseil */}
                    <div style={{
                        padding: "10px 14px",
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: "10px",
                        borderLeft: "3px solid rgba(110,90,170,0.8)",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.75)",
                    }}>
                        💡 {data.conseil}
                    </div>

                    {/* Chiffre + couleur */}
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{
                            flex: 1, textAlign: "center", padding: "10px",
                            background: "rgba(255,255,255,0.06)", borderRadius: "10px",
                        }}>
                            <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>{data.chiffre}</div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>Chiffre du jour</div>
                        </div>
                        <div style={{
                            flex: 1, textAlign: "center", padding: "10px",
                            background: "rgba(255,255,255,0.06)", borderRadius: "10px",
                        }}>
                            <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginTop: "4px" }}>{data.couleur}</div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>Couleur du jour</div>
                        </div>
                    </div>
                </div>
            ) : (
                <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center" }}>Horoscope indisponible.</p>
            )}
        </div>
    )
}