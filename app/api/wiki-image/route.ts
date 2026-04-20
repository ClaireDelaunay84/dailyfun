import { NextRequest, NextResponse } from "next/server"

export const revalidate = 86400

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url")
    if (!url) return NextResponse.json({ error: "missing url" }, { status: 400 })

    try {
        const res = await fetch(url, {
            headers: {
                "User-Agent": "Dailyfun/1.0 (https://dailyfun.fr; contact@dailyfun.fr)",
            },
            next: { revalidate: 86400 },
        })

        if (!res.ok) return NextResponse.json({ error: "fetch failed" }, { status: res.status })

        const buffer = await res.arrayBuffer()
        const contentType = res.headers.get("content-type") ?? "image/jpeg"

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=86400",
            },
        })
    } catch {
        return NextResponse.json({ error: "error" }, { status: 500 })
    }
}