import { NextRequest, NextResponse } from "next/server"

export const revalidate = 86400

// Professions connues du grand public — score de notoriété
const KEYWORDS_NOTORIETE = [
    "acteur", "actrice", "chanteur", "chanteuse", "musicien", "musicienne",
    "réalisateur", "réalisatrice", "président", "première ministre", "roi", "reine", "sportif", "sportive",
    "écrivain", "auteur", "autrice", "philosophe", "scientifique", "physicien",
    "astronaute", "explorateur", "inventeur", "peintre", "sculpteur",
    "comédien", "comédienne", "humoriste", "animateur", "animatrice",
    "mannequin", "top model", "cinéaste", "compositeur", "rappeur", "rappeuse"
]

function scoreNotoriete(page: any): number {
    let score = 0
    // Thumbnail = signal fort de notoriété sur Wikipedia
    if (page.thumbnail?.source) score += 10
    // Description contient un métier connu
    const desc = (page.description ?? "").toLowerCase()
    if (KEYWORDS_NOTORIETE.some(k => desc.includes(k))) score += 9
    // Extract résumé pour détecter les mentions de prix, records, etc.
    const extract = (page.extract ?? "").toLowerCase()
    if (extract.includes("oscar") || extract.includes("grammy") || extract.includes("prix nobel")) score += 5
    if (extract.includes("champion") || extract.includes("record du monde")) score += 3
    return score
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // births | deaths | events
    const today = new Date()
    const MM = String(today.getMonth() + 1).padStart(2, "0")
    const DD = String(today.getDate()).padStart(2, "0")

    try {
        const res = await fetch(
            `https://api.wikimedia.org/feed/v1/wikipedia/fr/onthisday/${type}/${MM}/${DD}`,
            {
                headers: { "User-Agent": "Dailyfun/1.0 (https://dailyfun.fr)" },
                next: { revalidate: 86400 }
            }
        )
        const data = await res.json()

        // Pour births et deaths, on filtre et trie par notoriété
        if (type === "births" || type === "deaths") {
            const items: any[] = data[type] ?? []

            const scores = items
                .map(item => {
                    const page = item.pages?.[0]
                    if (!page) return null
                    return { ...item, _score: scoreNotoriete(page) }
                })
                .filter(Boolean)
                // Minimum : doit avoir au moins un thumbnail OU un métier connu
                .filter(item => item._score >= 9)
                .sort((a, b) => b._score - a._score)
                .slice(0, 10) // on garde les 10 meilleurs, le composant en affiche 3-5

            return NextResponse.json({ [type]: scores })
        }

        // Pour events, on retourne tel quel
        return NextResponse.json(data)
    } catch {
        return NextResponse.json({}, { status: 500 })
    }
}