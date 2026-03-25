import { NextRequest, NextResponse } from "next/server"

export const revalidate = 86400 // cache 24h

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
                next: { revalidate: 86400 } // cache Next.js 24h
            }
        )
        const data = await res.json()
        return NextResponse.json(data)
    } catch {
        return NextResponse.json({}, { status: 500 })
    }
}