import { NextResponse } from "next/server"
import { Resend } from "resend"
import { saviezVous } from "../../data/saviezVous"

const resend = new Resend(process.env.RESEND_API_KEY)

// ─── Helpers dates ────────────────────────────────────────────────────────────

function getNextMonday(): Date {
    const today = new Date()
    const day = today.getDay()
    const daysUntilMonday = day === 0 ? 1 : 8 - day
    const monday = new Date(today)
    monday.setDate(today.getDate() + daysUntilMonday)
    monday.setHours(0, 0, 0, 0)
    return monday
}

function formatKey(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, "0")
    const dd = String(date.getDate()).padStart(2, "0")
    return `${mm}-${dd}`
}

function formatDateFr(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    }).replace(/^\w/, c => c.toUpperCase())
}

// ─── Types ────────────────────────────────────────────────────────────────────

type ReelScript = {
    date: string
    format: "anecdote" | "qa" | "film"
    accroche: string
    corps: string
    punchline: string
    cta: string
    storySoir: string
    filmMeta?: FilmMeta
}

type FilmMeta = {
    titre: string
    annee: string
    realisateur: string | null
    acteurs: string[]
    affiche: string | null
    anecdote: string
}

// ─── Découpage du texte ───────────────────────────────────────────────────────

function splitTexte(texte: string): { corps: string; punchline: string } {
    const match = texte.match(/^(.+?[.!?])\s+(.+)$/)
    if (match) return { corps: match[1].trim(), punchline: match[2].trim() }
    const mid = texte.lastIndexOf(" ", Math.floor(texte.length / 2))
    return {
        corps: texte.substring(0, mid).trim(),
        punchline: texte.substring(mid).trim(),
    }
}

// ─── Story du soir ────────────────────────────────────────────────────────────

function genStorySoir(date: Date): string {
    const tomorrow = new Date(date)
    tomorrow.setDate(date.getDate() + 1)
    const key = formatKey(tomorrow)
    const data = saviezVous[key] ?? { emoji: "❓", texte: "Rendez-vous demain !" }
    const { corps } = splitTexte(data.texte)
    return `${data.emoji} "${corps}" — Vrai ou faux ?`
}

// ─── Générateurs ─────────────────────────────────────────────────────────────

function genAnecdote(date: Date): ReelScript {
    const key = formatKey(date)
    const data = saviezVous[key] ?? { emoji: "🤓", texte: "Chaque jour recèle une curiosité !" }
    const { corps, punchline } = splitTexte(data.texte)
    return {
        date: formatDateFr(date),
        format: "anecdote",
        accroche: `${data.emoji} TU SAVAIS QUE... ?`,
        corps,
        punchline,
        cta: "➕ Suis @dailyfun_fr",
        storySoir: genStorySoir(date),
    }
}

function genQA(date: Date): ReelScript {
    const key = formatKey(date)
    const data = saviezVous[key] ?? { emoji: "❓", texte: "Chaque jour recèle une curiosité !" }
    const { corps, punchline } = splitTexte(data.texte)
    const question = corps.replace(/^(Le |La |Les |Un |Une |Des )/, "").replace(/\.$/, "")
    const accroche = `${data.emoji} ${question.charAt(0).toUpperCase() + question.slice(1)} — vrai ou faux ?`
    return {
        date: formatDateFr(date),
        format: "qa",
        accroche,
        corps: "👇 Laisse ta réponse en commentaire !",
        punchline: `✅ ${punchline}`,
        cta: "➕ Suis @dailyfun_fr",
        storySoir: genStorySoir(date),
    }
}

async function generateAnecdote(titre: string, annee: string, realisateur: string | null): Promise<string> {
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
                    content: `Donne-moi UNE seule anecdote courte, surprenante et marquante sur le film "${titre}" (${annee})${realisateur ? ` de ${realisateur}` : ""}. 
Maximum 2 phrases. En français. Commence directement par l'anecdote, sans introduction. 
Style : fait choc, chiffre inattendu, anecdote de tournage, acteur remplacé, budget explosé, record battu, etc.
Réponds UNIQUEMENT avec l'anecdote, rien d'autre.`,
                }],
            }),
        })
        const data = await res.json()
        return data.content?.[0]?.text?.trim() ?? "💡 [Ajoute une anecdote sur ce film]"
    } catch {
        return "💡 [Ajoute une anecdote sur ce film]"
    }
}

async function genFilm(date: Date): Promise<ReelScript> {
    const apiKey = process.env.TMDB_API_KEY
    const MM = String(date.getMonth() + 1).padStart(2, "0")
    const DD = String(date.getDate()).padStart(2, "0")
    const jour = date.getDate()
    const mois = date.toLocaleDateString("fr-FR", { month: "long" })

    let filmMeta: FilmMeta | undefined = undefined

    if (apiKey) {
        try {
            // On cherche le film le plus populaire sorti ce jour-là sur les 40 dernières années
            const decades = [1980, 1990, 2000, 2010, 2015, 2020]
            let bestFilm: any = null

            for (const decade of decades) {
                const dateDebut = `${decade}-${MM}-${String(Math.max(1, parseInt(DD) - 10)).padStart(2, "0")}`
                const dateFin   = `${decade + 9}-${MM}-${String(Math.min(28, parseInt(DD) + 10)).padStart(2, "0")}`
                const res = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=revenue.desc&primary_release_date.gte=${dateDebut}&primary_release_date.lte=${dateFin}&page=1`,
                    { next: { revalidate: 86400 } }
                )
                const data = await res.json()
                if (data.results?.[0] && (!bestFilm || data.results[0].revenue > bestFilm.revenue)) {
                    bestFilm = data.results[0]
                }
            }

            if (bestFilm) {
                const credRes = await fetch(
                    `https://api.themoviedb.org/3/movie/${bestFilm.id}/credits?api_key=${apiKey}&language=fr-FR`,
                    { next: { revalidate: 86400 } }
                )
                const cred = await credRes.json()
                const anecdote = await generateAnecdote(bestFilm.title, bestFilm.release_date?.split("-")[0] ?? "?", cred.crew?.find((c: any) => c.job === "Director")?.name ?? null)
                filmMeta = {
                    titre: bestFilm.title,
                    annee: bestFilm.release_date?.split("-")[0] ?? "?",
                    realisateur: cred.crew?.find((c: any) => c.job === "Director")?.name ?? null,
                    acteurs: cred.cast?.slice(0, 3).map((a: any) => a.name) ?? [],
                    affiche: bestFilm.poster_path
                        ? `https://image.tmdb.org/t/p/w342${bestFilm.poster_path}`
                        : null,
                    anecdote,
                }
            }
        } catch {
            // TMDB indisponible, on génère un script vide à compléter
        }
    }

    const titre = filmMeta?.titre ?? "[TITRE DU FILM]"
    const annee = filmMeta?.annee ?? "[ANNÉE]"
    const real  = filmMeta?.realisateur ?? "[RÉALISATEUR]"
    const acteurs = filmMeta?.acteurs?.join(" · ") ?? "[ACTEURS]"
    const anecdote = filmMeta?.anecdote ?? "💡 [Ajoute une anecdote sur ce film]"

    return {
        date: formatDateFr(date),
        format: "film",
        accroche: `🎬 UN ${jour} ${mois.toUpperCase()}... CE FILM SORTAIT EN SALLES`,
        corps: `${titre} (${annee}) — de ${real}`,
        punchline: anecdote,
        cta: "🎬 Abonne-toi @dailyfun_fr pour ta dose de culture",
        storySoir: genStorySoir(date),
        filmMeta,
    }
}

// ─── Rotation ─────────────────────────────────────────────────────────────────

function getFormat(dayOfWeek: number): "anecdote" | "qa" | "film" {
    const map: Record<number, "anecdote" | "qa" | "film"> = {
        1: "anecdote",  // Lundi
        2: "qa",        // Mardi
        3: "film",      // Mercredi
        4: "anecdote",  // Jeudi
        5: "qa",        // Vendredi
        6: "film",      // Samedi
    }
    return map[dayOfWeek] ?? "anecdote"
}

async function generateScript(date: Date): Promise<ReelScript> {
    const fmt = getFormat(date.getDay())
    if (fmt === "anecdote") return genAnecdote(date)
    if (fmt === "qa")       return genQA(date)
    return genFilm(date)
}

// ─── Template HTML email ──────────────────────────────────────────────────────

const COLORS: Record<string, string> = {
    anecdote: "#3d8a78",
    qa:       "#7C3AED",
    film:     "#1e3a5f",
}

const LABELS: Record<string, string> = {
    anecdote: "🤯 ANECDOTE",
    qa:       "❓ Q&A",
    film:     "🎬 FILM DU JOUR",
}

function scriptBlock(s: ReelScript): string {
    const color = COLORS[s.format]
    const label = LABELS[s.format]

    const row = (time: string, segment: string, content: string, bold = false) => `
        <tr>
            <td style="padding:10px 14px;width:140px;vertical-align:top;border-right:1px solid #e5e7eb;">
                <div style="font-size:11px;color:#9ca3af;">${time}</div>
                <div style="font-size:13px;font-weight:700;color:#374151;">${segment}</div>
            </td>
            <td style="padding:10px 16px;font-size:15px;color:${bold ? color : "#111827"};font-weight:${bold ? "700" : "400"};">
                ${content}
            </td>
        </tr>
        <tr><td colspan="2" style="height:4px;background:#f9fafb;"></td></tr>
    `

    // Bloc CapCut uniquement pour les films
    const afficheRow = s.filmMeta?.affiche
        ? `<tr>
                <td style="padding:8px 0;color:#6b7280;font-weight:600;">🖼️ Affiche</td>
                <td style="padding:8px 0;"><img src="${s.filmMeta.affiche}" alt="${s.filmMeta?.titre ?? ""}" style="height:80px;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.2);" /></td>
           </tr>`
        : ""

    const capCutBlock = s.format === "film"
        ? `<div style="padding:14px 20px;background:#eff6ff;border-top:2px dashed #bfdbfe;">
            <div style="font-size:11px;font-weight:700;color:#1e40af;letter-spacing:1px;margin-bottom:8px;">🎬 INSTRUCTIONS CAPCUT</div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;color:#374151;">
                <tr>
                    <td style="padding:4px 0;width:120px;color:#6b7280;font-weight:600;">🖼️ Fond</td>
                    <td style="padding:4px 0;">Affiche du film en fond flouté (cherche "${s.filmMeta?.titre ?? "le film"}" sur Google Images) — ou fond uni #0f172a (bleu nuit cinéma)</td>
                </tr>
                <tr>
                    <td style="padding:4px 0;color:#6b7280;font-weight:600;">✨ Animation</td>
                    <td style="padding:4px 0;">Texte : apparition slide-in de gauche + fade out. Titre du film en grand, gras, blanc.</td>
                </tr>
                <tr>
                    <td style="padding:4px 0;color:#6b7280;font-weight:600;">🎵 Son</td>
                    <td style="padding:4px 0;">Son cinématique/dramatique dans la biblio Instagram — cherche "cinematic" ou "epic". Luminosité vidéo : -65.</td>
                </tr>
                <tr>
                    <td style="padding:4px 0;color:#6b7280;font-weight:600;">🎨 Couleur texte</td>
                    <td style="padding:4px 0;">Blanc pour le titre, doré #f5a623 pour l'année et le réalisateur</td>
                </tr>
                <tr>
                    <td style="padding:4px 0;color:#6b7280;font-weight:600;">🎭 Acteurs</td>
                    <td style="padding:4px 0;">${s.filmMeta?.acteurs?.join(" · ") ?? "—"}</td>
                </tr>
                ${afficheRow}
            </table>
            <div style="margin-top:10px;padding:10px;background:#dbeafe;border-radius:8px;font-size:13px;color:#1e40af;">
                💡 <strong>Anecdote générée :</strong> ${s.filmMeta?.anecdote ?? "—"}<br/>
                <span style="font-size:11px;color:#3b82f6;margin-top:4px;display:block;">→ Tu peux la modifier si tu en connais une meilleure !</span>
            </div>
           </div>`
        : `<div style="padding:14px 20px;background:#f0fdf4;border-top:2px dashed #bbf7d0;">
            <div style="font-size:11px;font-weight:700;color:#16a34a;letter-spacing:1px;margin-bottom:6px;">🌙 STORY DU SOIR — Question mystère pour tes abonnés</div>
            <div style="font-size:14px;color:#111827;">${s.storySoir}</div>
            <div style="font-size:11px;color:#9ca3af;margin-top:4px;">→ Réponse demain matin dans le Reel</div>
           </div>`

    return `
    <div style="margin-bottom:28px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        <div style="background:${color};padding:12px 20px;display:flex;align-items:center;gap:12px;">
            <span style="color:white;font-weight:700;font-size:15px;">${s.date}</span>
            <span style="color:rgba(255,255,255,0.75);font-size:13px;">— ${label}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;background:white;">
            ${row("0 → 4 sec",  "ACCROCHE",  s.accroche)}
            ${row("4 → 9 sec",  "CORPS",     s.corps)}
            ${row("9 → 14 sec", "PUNCHLINE", s.punchline, true)}
            ${row("14 → 18 sec","CTA",       s.cta)}
        </table>
        ${capCutBlock}
    </div>`
}

function buildEmail(scripts: ReelScript[], weekLabel: string): string {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;">
<div style="max-width:680px;margin:32px auto;padding:0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

    <!-- Header -->
    <div style="text-align:center;padding:32px 0 24px;">
        <div style="font-size:32px;font-weight:800;color:#3d8a78;">🎬 Dailyfun</div>
        <div style="font-size:18px;color:#374151;margin-top:6px;">Scripts Reels — ${weekLabel}</div>
        <div style="margin-top:12px;padding:10px 20px;background:white;border-radius:30px;display:inline-block;font-size:13px;color:#6b7280;">
            🤯 Lun/Jeu = Anecdote &nbsp;·&nbsp; ❓ Mar/Ven = Q&A &nbsp;·&nbsp; 🎬 Mer/Sam = Film du jour
        </div>
    </div>

    <!-- Scripts -->
    ${scripts.map(scriptBlock).join("")}

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0;color:#9ca3af;font-size:12px;border-top:1px solid #e5e7eb;">
        Dailyfun · Scripts générés automatiquement chaque dimanche soir
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
        const monday = getNextMonday()
        const scripts: ReelScript[] = []

        for (let i = 0; i < 6; i++) {
            const date = new Date(monday)
            date.setDate(monday.getDate() + i)
            scripts.push(await generateScript(date))
        }

        const satDate = new Date(monday)
        satDate.setDate(monday.getDate() + 5)
        const weekLabel = `Semaine du ${formatDateFr(monday)} au ${formatDateFr(satDate)}`

        const html = buildEmail(scripts, weekLabel)

        await resend.emails.send({
            from: "Dailyfun Scripts <onboarding@resend.dev>",
            to: process.env.SCRIPTS_EMAIL!,
            subject: `🎬 Scripts Reels — ${weekLabel}`,
            html,
        })

        return NextResponse.json({ success: true, week: weekLabel, scripts: scripts.length })
    } catch (error) {
        console.error("Erreur génération scripts:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}