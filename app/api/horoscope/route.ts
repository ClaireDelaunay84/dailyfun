import { NextResponse } from "next/server"
import { unstable_cache } from "next/cache"

// Force dynamic (pas de cache statique au niveau de la route)
export const dynamic = "force-dynamic"

async function fetchHoroscope(dateStr: string, dateKey: string) {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return {}

    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        cache: "no-store", // ← important : empêche Next.js de cacher le fetch lui-même
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 3000,
            messages: [{
                role: "user",
                content: `Tu es un astrologue professionnel réaliste. Génère l'horoscope du jour (${dateStr}) pour les 12 signes. Sois VARIÉ : certains signes ont une bonne journée, d'autres une journée difficile, d'autres mitigée. Ne sois pas systématiquement positif. Réponds UNIQUEMENT en JSON strict sans markdown ni backticks. Format exact pour chaque signe : {"belier":{"message":"2 phrases réalistes sur la journée, peut inclure des mises en garde","conseil":"1 conseil concret","chiffre":7,"couleur":"Rouge","amour":3,"travail":4,"sante":2,"finances":5},...} Les notes amour/travail/sante/finances sont des entiers entre 1 et 5. Varie les notes : ne mets pas que des 4 et 5, certains signes peuvent avoir des 1 ou 2 dans certains domaines. Les 12 signes à inclure : belier, taureau, gemeaux, cancer, lion, vierge, balance, scorpion, sagittaire, capricorne, verseau, poissons. Réponds UNIQUEMENT avec le JSON.`,
            }],
        }),
    })

    const data = await res.json()
    const text = data.content?.[0]?.text?.trim() ?? "{}"
    const cleaned = text.replace(/```json|```/g, "").trim()
    return JSON.parse(cleaned)
}

export async function GET() {
    const today = new Date()
    // Clé unique par jour (Paris timezone)
    const dateKey = today.toLocaleDateString("fr-FR", {
        timeZone: "Europe/Paris",
        year: "numeric", month: "2-digit", day: "2-digit",
    })
    const dateStr = today.toLocaleDateString("fr-FR", {
        timeZone: "Europe/Paris",
        weekday: "long", day: "numeric", month: "long",
    })

    try {
        // Cache lié à la date → nouveau cache chaque jour automatiquement
        const getCached = unstable_cache(
            () => fetchHoroscope(dateStr, dateKey),
            [`horoscope-${dateKey}`],  // ← clé change chaque jour
            { revalidate: 86400 }
        )

        const signes = await getCached()
        return NextResponse.json({ signes, date: dateStr })
    } catch (e) {
        console.error("ERREUR horoscope:", e)
        return NextResponse.json({ signes: {} }, { status: 500 })
    }
}