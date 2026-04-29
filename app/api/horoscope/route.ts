import { NextResponse } from "next/server"

export const revalidate = 86400

export async function GET() {
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return NextResponse.json({ signes: {} }, { status: 500 })

    const today = new Date()
    const dateStr = today.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })

    try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
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
        const signes = JSON.parse(cleaned)

        return NextResponse.json({ signes, date: dateStr })
    } catch (e) {
        console.error("ERREUR horoscope:", e)
        return NextResponse.json({ signes: {} }, { status: 500 })
    }
}