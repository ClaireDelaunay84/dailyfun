import { NextRequest, NextResponse } from "next/server"
import sharp from "sharp"

// ⚠️ Node.js runtime obligatoire pour sharp (pas edge)
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const slide = searchParams.get("slide") ?? "0"

    // 1. Récupère l'image PNG depuis la route existante
    const pngUrl = `${origin}/api/slides?slide=${slide}`
    const pngRes = await fetch(pngUrl)

    if (!pngRes.ok) {
        return new NextResponse("Erreur lors de la génération du slide", { status: 500 })
    }

    const pngBuffer = Buffer.from(await pngRes.arrayBuffer())

    // 2. Convertit en JPEG avec sharp (qualité 90)
    const jpegBuffer = await sharp(pngBuffer)
        .jpeg({ quality: 90 })
        .toBuffer()

    // 3. Retourne le JPEG avec les bons headers
    return new NextResponse(new Uint8Array(jpegBuffer), {
        status: 200,
        headers: {
            "Content-Type": "image/jpeg",
            "Cache-Control": "public, max-age=no-store",
        },
    })
}