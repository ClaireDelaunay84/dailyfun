import { NextResponse } from "next/server"
import { Resend } from "resend"
import { saviezVous } from "../../data/saviezVous"
import { journeesInternationales } from "../../data/journeesInternationales"

const resend = new Resend(process.env.RESEND_API_KEY)

const TMDB_GENRES: Record<number, string> = {
    28: "Action", 12: "Aventure", 16: "Animation", 35: "Comédie",
    80: "Crime", 99: "Documentaire", 18: "Drame", 10751: "Famille",
    14: "Fantastique", 36: "Histoire", 27: "Horreur", 10402: "Musique",
    9648: "Mystère", 10749: "Romance", 878: "Science-Fiction",
    10770: "Téléfilm", 53: "Thriller", 10752: "Guerre", 37: "Western",
}

// ─── Types ────────────────────────────────────────────────────────────────────

type JourneeIntl = {
    nom: string
    description: string
    emoji: string
}

type FilmMeta = {
    titre: string
    annee: string
    realisateur: string | null
    acteurs: string[]
    affiche: string | null
    anecdote: string
    genres: string[]
}

type MusiqueMeta = {
    titre: string
    artiste: string
    annee: string
    anecdote: string
    jour: number
    mois: string
}

type SaviezMeta = {
    emoji: string
    texte: string
    corps: string
    punchline: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatKey(date: Date): string {
    return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

function formatDateFr(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
        weekday: "long", day: "numeric", month: "long",
    }).replace(/^\w/, c => c.toUpperCase())
}

function splitTexte(texte: string): { corps: string; punchline: string } {
    const match = texte.match(/^(.+?[.!?])\s+(.+)$/)
    if (match) return { corps: match[1].trim(), punchline: match[2].trim() }
    const mid = texte.lastIndexOf(" ", Math.floor(texte.length / 2))
    return { corps: texte.substring(0, mid).trim(), punchline: texte.substring(mid).trim() }
}

// ─── Format du soir selon le jour ─────────────────────────────────────────────

function getFormatSoir(day: number): "film" | "saviez" | "musique" {
    const map: Record<number, "film" | "saviez" | "musique"> = {
        0: "saviez",
        1: "film",
        2: "saviez",
        3: "film",
        4: "musique",
        5: "saviez",
        6: "film",
    }
    return map[day] ?? "film"
}

// ─── Journée internationale ───────────────────────────────────────────────────

function getJourneeIntl(date: Date): JourneeIntl {
    const key = formatKey(date)
    const journees = journeesInternationales[key]
    const j = journees?.[0]
    return {
        nom: j?.nom ?? "Journée de la curiosité",
        description: j?.description ?? "Chaque jour est une occasion d'apprendre quelque chose de nouveau !",
        emoji: "🌍",
    }
}

// ─── Saviez-vous ──────────────────────────────────────────────────────────────

function genSaviez(date: Date): SaviezMeta {
    const key = formatKey(date)
    const data = saviezVous[key] ?? { emoji: "🤓", texte: "Chaque jour recèle une curiosité !" }
    const { corps, punchline } = splitTexte(data.texte)
    return { emoji: data.emoji, texte: data.texte, corps, punchline }
}

// ─── Film ─────────────────────────────────────────────────────────────────────

async function generateAnecdoteFilm(titre: string, annee: string, realisateur: string | null): Promise<string> {
    const anthropicKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicKey) return "💡 [Ajoute une anecdote sur ce film]"
    try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": anthropicKey,
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 150,
                messages: [{
                    role: "user",
                    content: `Donne-moi UNE seule anecdote courte, surprenante et marquante sur le film "${titre}" (${annee})${realisateur ? ` de ${realisateur}` : ""}. Maximum 2 phrases. En français. Commence directement par l'anecdote, sans introduction. Style : fait choc, chiffre inattendu, anecdote de tournage, acteur remplacé, budget explosé, record battu, etc. Réponds UNIQUEMENT avec l'anecdote, rien d'autre.`,
                }],
            }),
        })
        const data = await res.json()
        return data.content?.[0]?.text?.trim() ?? "💡 [Ajoute une anecdote sur ce film]"
    } catch {
        return "💡 [Ajoute une anecdote sur ce film]"
    }
}

async function genFilm(date: Date): Promise<FilmMeta | null> {
    const apiKey = process.env.TMDB_API_KEY
    const MM = String(date.getMonth() + 1).padStart(2, "0")
    const DD = String(date.getDate()).padStart(2, "0")

    if (!apiKey) return null

    try {
        const annees = Array.from({ length: 55 }, (_, i) => 1970 + i)
        let bestFilm: {
            id: number
            title: string
            popularity: number
            release_date: string
            poster_path: string | null
            genre_ids: number[]
        } | null = null

        for (const annee of annees) {
            const dateExacte = `${annee}-${MM}-${DD}`
            const res = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&primary_release_date.gte=${dateExacte}&primary_release_date.lte=${dateExacte}&page=1`,
                { next: { revalidate: 86400 } }
            )
            const data = await res.json()
            const film = data.results?.[0]
            if (film && (!bestFilm || film.popularity > bestFilm.popularity)) bestFilm = film
        }

        if (!bestFilm) return null

        const credRes = await fetch(
            `https://api.themoviedb.org/3/movie/${bestFilm.id}/credits?api_key=${apiKey}&language=fr-FR`,
            { next: { revalidate: 86400 } }
        )
        const cred = await credRes.json()
        const realisateur = cred.crew?.find((c: { job: string; name: string }) => c.job === "Director")?.name ?? null
        const anecdote = await generateAnecdoteFilm(
            bestFilm.title,
            bestFilm.release_date?.split("-")[0] ?? "?",
            realisateur
        )

        return {
            titre: bestFilm.title,
            annee: bestFilm.release_date?.split("-")[0] ?? "?",
            realisateur,
            acteurs: (cred.cast as { name: string }[])?.slice(0, 3).map((a: { name: string }) => a.name) ?? [],
            affiche: bestFilm.poster_path ? `https://image.tmdb.org/t/p/w342${bestFilm.poster_path}` : null,
            anecdote,
            genres: ((bestFilm.genre_ids ?? []) as number[]).map((id: number) => TMDB_GENRES[id]).filter((g): g is string => Boolean(g)),
        }
    } catch {
        return null
    }
}

// ─── Musique ──────────────────────────────────────────────────────────────────

async function genMusique(date: Date): Promise<MusiqueMeta> {
    const jour = date.getDate()
    const mois = date.toLocaleDateString("fr-FR", { month: "long" })
    const anthropicKey = process.env.ANTHROPIC_API_KEY

    if (!anthropicKey) return {
        titre: "[TITRE DE L'ALBUM/SINGLE]",
        artiste: "[ARTISTE]",
        annee: "[ANNÉE]",
        anecdote: "💡 [Ajoute une anecdote sur cette sortie musicale]",
        jour,
        mois,
    }

    try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": anthropicKey,
                "anthropic-version": "2023-06-01",
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 200,
                messages: [{
                    role: "user",
                    content: `Cite UN album ou single musical célèbre et reconnu sorti un ${jour} ${mois} (n'importe quelle année entre 1960 et 2010). Réponds UNIQUEMENT en JSON strict sans markdown, format : {"titre":"...","artiste":"...","annee":"...","anecdote":"..."}. L'anecdote doit être une phrase courte et surprenante sur cette sortie musicale.`,
                }],
            }),
        })
        const data = await res.json()
        const text = data.content?.[0]?.text?.trim() ?? "{}"
        const parsed = JSON.parse(text.replace(/```json|```/g, "").trim())
        return { ...parsed, jour, mois }
    } catch {
        return {
            titre: "[TITRE DE L'ALBUM/SINGLE]",
            artiste: "[ARTISTE]",
            annee: "[ANNÉE]",
            anecdote: "💡 [Ajoute une anecdote sur cette sortie musicale]",
            jour,
            mois,
        }
    }
}

// ─── Template HTML ────────────────────────────────────────────────────────────

function buildDailyEmail(
    date: Date,
    journee: JourneeIntl,
    formatSoir: "film" | "saviez" | "musique",
    soirData: FilmMeta | null | SaviezMeta | MusiqueMeta
): string {
    const dateStr = formatDateFr(date)
    const jour = date.getDate()
    const mois = date.toLocaleDateString("fr-FR", { month: "long" }).toUpperCase()

    // ── Journée internationale ──
    const journeeBlock = `
    <div style="margin-bottom:24px;border:2px solid #fed7aa;border-radius:14px;overflow:hidden;">
        <div style="background:#ea580c;padding:14px 20px;">
            <span style="color:white;font-weight:700;font-size:17px;">🌍 9h — Journée Internationale</span>
            <span style="color:rgba(255,255,255,0.8);font-size:12px;margin-left:12px;">TikTok + Instagram</span>
        </div>
        <div style="padding:16px 20px;background:white;">
            <div style="font-size:20px;font-weight:700;color:#111827;margin-bottom:8px;">${journee.emoji} ${journee.nom}</div>
            <div style="font-size:14px;color:#374151;margin-bottom:16px;line-height:1.6;">${journee.description}</div>
            <table style="width:100%;border-collapse:collapse;font-size:12px;background:#fff7ed;border-radius:8px;overflow:hidden;">
                <tr style="border-bottom:1px solid #fed7aa;">
                    <td style="padding:8px 12px;width:130px;font-weight:700;color:#c2410c;">📱 Slide 1</td>
                    <td style="padding:8px 12px;color:#374151;">Fond orange/coloré — texte : <strong>"AUJOURD'HUI C'EST..."</strong></td>
                </tr>
                <tr style="border-bottom:1px solid #fed7aa;">
                    <td style="padding:8px 12px;font-weight:700;color:#c2410c;">📱 Slide 2</td>
                    <td style="padding:8px 12px;color:#374151;"><strong>${journee.emoji} ${journee.nom}</strong> — grand texte centré</td>
                </tr>
                <tr style="border-bottom:1px solid #fed7aa;">
                    <td style="padding:8px 12px;font-weight:700;color:#c2410c;">📱 Slide 3</td>
                    <td style="padding:8px 12px;color:#374151;">${journee.description}</td>
                </tr>
                <tr>
                    <td style="padding:8px 12px;font-weight:700;color:#c2410c;">📱 Slide 4</td>
                    <td style="padding:8px 12px;color:#374151;"><strong>CTA :</strong> "Abonne-toi @dailyfun_fr pour ta dose de culture 🌍"</td>
                </tr>
            </table>
            <div style="margin-top:12px;padding:10px;background:#ffedd5;border-radius:6px;font-size:12px;color:#9a3412;">
                🎵 <strong>Son :</strong> "uplifting" ou "world" — volume 25% &nbsp;|&nbsp; ✨ <strong>Effets :</strong> Fade in accroche → slide-in nom → apparition description
            </div>
        </div>
    </div>`

    // ── Soir Film ──
    const buildFilmBlock = (film: FilmMeta | null): string => {
        const titre = film?.titre ?? "[TITRE DU FILM]"
        const annee = film?.annee ?? "[ANNÉE]"
        const real = film?.realisateur ?? "[RÉALISATEUR]"
        const acteurs = film?.acteurs?.join(" · ") ?? "—"
        const anecdote = film?.anecdote ?? "💡 [Ajoute une anecdote sur ce film]"
        const genresBadges = film?.genres?.map(g =>
            `<span style="font-size:11px;background:#1e3a5f22;color:#1e3a5f;padding:2px 10px;border-radius:20px;font-weight:600;margin-right:4px;">${g}</span>`
        ).join("") ?? ""

        return `
        <div style="margin-bottom:24px;border:2px solid #bfdbfe;border-radius:14px;overflow:hidden;">
            <div style="background:#1e3a5f;padding:14px 20px;">
                <span style="color:white;font-weight:700;font-size:17px;">🎬 Soir — Film sorti un ${jour} ${mois}</span>
                <span style="color:rgba(255,255,255,0.8);font-size:12px;margin-left:12px;">TikTok + Instagram</span>
            </div>
            <div style="padding:16px 20px;background:white;">
                ${genresBadges ? `<div style="margin-bottom:10px;">${genresBadges}</div>` : ""}
                <div style="font-size:20px;font-weight:700;color:#111827;margin-bottom:4px;">${titre} (${annee})</div>
                <div style="font-size:14px;color:#374151;margin-bottom:4px;">🎥 <strong>${real}</strong></div>
                <div style="font-size:13px;color:#6b7280;margin-bottom:16px;">🎭 ${acteurs}</div>
                ${film?.affiche ? `<img src="${film.affiche}" alt="${titre}" style="height:80px;border-radius:6px;box-shadow:0 2px 8px rgba(0,0,0,0.2);margin-bottom:16px;" />` : ""}
                <table style="width:100%;border-collapse:collapse;font-size:12px;background:#eff6ff;border-radius:8px;overflow:hidden;">
                    <tr style="border-bottom:1px solid #bfdbfe;">
                        <td style="padding:8px 12px;width:130px;font-weight:700;color:#1e40af;">🎬 0→4s</td>
                        <td style="padding:8px 12px;color:#374151;font-weight:700;">UN ${jour} ${mois}... CE FILM SORTAIT EN SALLES</td>
                    </tr>
                    <tr style="border-bottom:1px solid #bfdbfe;">
                        <td style="padding:8px 12px;font-weight:700;color:#1e40af;">📽️ 4→9s</td>
                        <td style="padding:8px 12px;color:#374151;"><strong>${titre}</strong> (${annee}) — de ${real}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #bfdbfe;">
                        <td style="padding:8px 12px;font-weight:700;color:#1e40af;">💡 9→14s</td>
                        <td style="padding:8px 12px;color:#1e40af;font-weight:700;">${anecdote}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 12px;font-weight:700;color:#1e40af;">🔔 14→18s</td>
                        <td style="padding:8px 12px;color:#374151;">🎬 Abonne-toi @dailyfun_fr pour ta dose de culture</td>
                    </tr>
                </table>
                <div style="margin-top:12px;padding:10px;background:#dbeafe;border-radius:6px;font-size:12px;color:#1e40af;">
                    🖼️ <strong>Fond :</strong> Affiche "${titre}" flouée — luminosité -65 &nbsp;|&nbsp; 🎵 <strong>Son :</strong> "cinematic" ou "epic" — volume 30%
                </div>
            </div>
        </div>`
    }

    // ── Soir Saviez-vous ──
    const buildSaviezBlock = (s: SaviezMeta): string => `
        <div style="margin-bottom:24px;border:2px solid #bbf7d0;border-radius:14px;overflow:hidden;">
            <div style="background:#16a34a;padding:14px 20px;">
                <span style="color:white;font-weight:700;font-size:17px;">🧠 Soir — Le saviez-vous ?</span>
                <span style="color:rgba(255,255,255,0.8);font-size:12px;margin-left:12px;">TikTok + Instagram</span>
            </div>
            <div style="padding:16px 20px;background:white;">
                <div style="font-size:28px;margin-bottom:12px;">${s.emoji}</div>
                <table style="width:100%;border-collapse:collapse;font-size:12px;background:#f0fdf4;border-radius:8px;overflow:hidden;">
                    <tr style="border-bottom:1px solid #bbf7d0;">
                        <td style="padding:8px 12px;width:130px;font-weight:700;color:#16a34a;">🎯 0→4s</td>
                        <td style="padding:8px 12px;color:#374151;font-weight:700;">${s.emoji} TU SAVAIS QUE... ?</td>
                    </tr>
                    <tr style="border-bottom:1px solid #bbf7d0;">
                        <td style="padding:8px 12px;font-weight:700;color:#16a34a;">📝 4→9s</td>
                        <td style="padding:8px 12px;color:#374151;">${s.corps}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #bbf7d0;">
                        <td style="padding:8px 12px;font-weight:700;color:#16a34a;">💥 9→14s</td>
                        <td style="padding:8px 12px;color:#16a34a;font-weight:700;">${s.punchline}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 12px;font-weight:700;color:#16a34a;">🔔 14→18s</td>
                        <td style="padding:8px 12px;color:#374151;">➕ Suis @dailyfun_fr</td>
                    </tr>
                </table>
                <div style="margin-top:12px;padding:10px;background:#dcfce7;border-radius:6px;font-size:12px;color:#15803d;">
                    🖼️ <strong>Fond :</strong> Template CapCut vert — fond #3d8a78 &nbsp;|&nbsp; 🎵 <strong>Son :</strong> "curious" ou "light documentary" — volume 25%
                </div>
            </div>
        </div>`

    // ── Soir Musique ──
    const buildMusiqueBlock = (m: MusiqueMeta): string => `
        <div style="margin-bottom:24px;border:2px solid #f5d0fe;border-radius:14px;overflow:hidden;">
            <div style="background:#7e22ce;padding:14px 20px;">
                <span style="color:white;font-weight:700;font-size:17px;">🎵 Soir — Musique sortie un ${m.jour} ${m.mois.toUpperCase()}</span>
                <span style="color:rgba(255,255,255,0.8);font-size:12px;margin-left:12px;">TikTok + Instagram</span>
            </div>
            <div style="padding:16px 20px;background:white;">
                <div style="font-size:20px;font-weight:700;color:#111827;margin-bottom:4px;">${m.titre} — ${m.artiste}</div>
                <div style="font-size:14px;color:#6b7280;margin-bottom:16px;">📅 Sorti en ${m.annee}</div>
                <table style="width:100%;border-collapse:collapse;font-size:12px;background:#fdf4ff;border-radius:8px;overflow:hidden;">
                    <tr style="border-bottom:1px solid #f5d0fe;">
                        <td style="padding:8px 12px;width:130px;font-weight:700;color:#7e22ce;">🎵 0→4s</td>
                        <td style="padding:8px 12px;color:#374151;font-weight:700;">UN ${m.jour} ${m.mois.toUpperCase()}... CETTE MUSIQUE SORTAIT</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f5d0fe;">
                        <td style="padding:8px 12px;font-weight:700;color:#7e22ce;">🎤 4→9s</td>
                        <td style="padding:8px 12px;color:#374151;"><strong>${m.titre}</strong> — ${m.artiste} (${m.annee})</td>
                    </tr>
                    <tr style="border-bottom:1px solid #f5d0fe;">
                        <td style="padding:8px 12px;font-weight:700;color:#7e22ce;">💡 9→14s</td>
                        <td style="padding:8px 12px;color:#7e22ce;font-weight:700;">${m.anecdote}</td>
                    </tr>
                    <tr>
                        <td style="padding:8px 12px;font-weight:700;color:#7e22ce;">🔔 14→18s</td>
                        <td style="padding:8px 12px;color:#374151;">🎵 Abonne-toi @dailyfun_fr pour ta dose de culture</td>
                    </tr>
                </table>
                <div style="margin-top:12px;padding:10px;background:#f3e8ff;border-radius:6px;font-size:12px;color:#7e22ce;">
                    🖼️ <strong>Fond :</strong> Pochette d'album flouée ou fond sombre #1a0030 &nbsp;|&nbsp; 🎵 <strong>Son :</strong> Extrait du morceau si possible — volume 40%
                </div>
            </div>
        </div>`

    const formatLabel = formatSoir === "film" ? "🎬 Film sorti ce jour"
        : formatSoir === "musique" ? "🎵 Musique sortie ce jour"
            : "🧠 Le saviez-vous ?"

    const soirBlock = formatSoir === "film"
        ? buildFilmBlock(soirData as FilmMeta | null)
        : formatSoir === "saviez"
            ? buildSaviezBlock(soirData as SaviezMeta)
            : buildMusiqueBlock(soirData as MusiqueMeta)

    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;">
<div style="max-width:700px;margin:32px auto;padding:0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

    <div style="text-align:center;padding:32px 0 24px;">
        <div style="font-size:32px;font-weight:800;color:#3d8a78;">📱 Dailyfun</div>
        <div style="font-size:20px;color:#374151;margin-top:6px;">${dateStr}</div>
        <div style="margin-top:16px;padding:14px 20px;background:white;border-radius:12px;text-align:left;font-size:13px;color:#374151;border-left:4px solid #3d8a78;">
            <div style="font-weight:700;margin-bottom:6px;color:#111827;">📅 Programme du jour :</div>
            <div style="margin-bottom:4px;">🖼️ <strong>8h</strong> — Slider éphémérides (Make.com auto)</div>
            <div style="margin-bottom:4px;">🌍 <strong>9h</strong> — Journée internationale (TikTok + Instagram)</div>
            <div>${formatSoir === "film" ? "🎬" : formatSoir === "musique" ? "🎵" : "🧠"} <strong>Soir</strong> — ${formatLabel} (TikTok + Instagram)</div>
        </div>
    </div>

    ${journeeBlock}
    ${soirBlock}

    <div style="text-align:center;padding:24px 0;color:#9ca3af;font-size:12px;border-top:1px solid #e5e7eb;">
        Dailyfun · Script quotidien généré automatiquement à 6h
    </div>
</div>
</body></html>`
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization")
    const { searchParams } = new URL(request.url)
    const tokenParam = searchParams.get("token")

    const isVercelCron = authHeader === `Bearer ${process.env.CRON_SECRET}`
    const isManualCall = tokenParam === process.env.CRON_SECRET

    if (!isVercelCron && !isManualCall) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
        const today = new Date()
        const formatSoir = getFormatSoir(today.getDay())
        const journee = getJourneeIntl(today)

        let soirData: FilmMeta | null | SaviezMeta | MusiqueMeta = null
        if (formatSoir === "film") soirData = await genFilm(today)
        else if (formatSoir === "saviez") soirData = genSaviez(today)
        else if (formatSoir === "musique") soirData = await genMusique(today)

        const html = buildDailyEmail(today, journee, formatSoir, soirData)

        await resend.emails.send({
            from: "Dailyfun Scripts <onboarding@resend.dev>",
            to: process.env.SCRIPTS_EMAIL!,
            subject: `📱 Dailyfun — ${formatDateFr(today)}`,
            html,
        })

        return NextResponse.json({ success: true, date: formatDateFr(today), format: formatSoir })
    } catch (error) {
        console.error("Erreur script quotidien:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}