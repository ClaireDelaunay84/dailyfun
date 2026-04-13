import { NextResponse } from "next/server"
import { Resend } from "resend"
import { saviezVous } from "../../data/saviezVous"
import { journeesInternationales } from "../../data/journeesInternationales"

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
    format: "anecdote" | "film"
    accroche: string
    corps: string
    punchline: string
    cta: string
    storySoir: string
    storyArrive: string
    filmMeta?: FilmMeta
    journeeIntl?: JourneeIntl
}

type FilmMeta = {
    titre: string
    annee: string
    realisateur: string | null
    acteurs: string[]
    affiche: string | null
    anecdote: string
}

type JourneeIntl = {
    nom: string
    description: string
    emoji: string
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

// ─── Story C'est arrivé un... ─────────────────────────────────────────────────

function genStoryArrive(date: Date): string {
    const key = formatKey(date)
    const data = saviezVous[key] ?? { emoji: "📅", texte: "Chaque jour a son histoire !" }
    const jour = date.getDate()
    const mois = date.toLocaleDateString("fr-FR", { month: "long" }).toUpperCase()
    return `📅 UN ${jour} ${mois}... ${data.texte}`
}

// ─── Journée internationale ───────────────────────────────────────────────────

function getJourneeIntl(date: Date): JourneeIntl {
    const key = formatKey(date)
    const journees = journeesInternationales[key]
    const j = journees?.[0] ?? { nom: "Journée de la curiosité", description: "Chaque jour est une occasion d'apprendre quelque chose de nouveau !", emoji: "🌍" }
    return { nom: j.nom, description: j.description, emoji: "🌍" }
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
        storyArrive: genStoryArrive(date),
        journeeIntl: getJourneeIntl(date),
    }
}

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
            const decades = [1980, 1990, 2000, 2010, 2015, 2020]
            let bestFilm: { id: number; title: string; revenue: number; release_date: string; poster_path: string | null } | null = null

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
                const anecdote = await generateAnecdoteFilm(
                    bestFilm.title,
                    bestFilm.release_date?.split("-")[0] ?? "?",
                    cred.crew?.find((c: { job: string; name: string }) => c.job === "Director")?.name ?? null
                )
                filmMeta = {
                    titre: bestFilm.title,
                    annee: bestFilm.release_date?.split("-")[0] ?? "?",
                    realisateur: cred.crew?.find((c: { job: string; name: string }) => c.job === "Director")?.name ?? null,
                    acteurs: (cred.cast as { name: string }[])?.slice(0, 3).map(a => a.name) ?? [],
                    affiche: bestFilm.poster_path
                        ? `https://image.tmdb.org/t/p/w342${bestFilm.poster_path}`
                        : null,
                    anecdote,
                }
            }
        } catch {
            // TMDB indisponible
        }
    }

    const titre = filmMeta?.titre ?? "[TITRE DU FILM]"
    const annee = filmMeta?.annee ?? "[ANNÉE]"
    const real  = filmMeta?.realisateur ?? "[RÉALISATEUR]"
    const anecdote = filmMeta?.anecdote ?? "💡 [Ajoute une anecdote sur ce film]"

    return {
        date: formatDateFr(date),
        format: "film",
        accroche: `🎬 UN ${jour} ${mois.toUpperCase()}... CE FILM SORTAIT EN SALLES`,
        corps: `${titre} (${annee}) — de ${real}`,
        punchline: anecdote,
        cta: "🎬 Abonne-toi @dailyfun_fr pour ta dose de culture",
        storySoir: genStorySoir(date),
        storyArrive: genStoryArrive(date),
        filmMeta,
        journeeIntl: getJourneeIntl(date),
    }
}

// ─── Rotation ─────────────────────────────────────────────────────────────────

function getFormat(dayOfWeek: number): "anecdote" | "film" {
    const map: Record<number, "anecdote" | "film"> = {
        0: "film",      // Dimanche
        1: "film",      // Lundi
        2: "anecdote",  // Mardi
        3: "film",      // Mercredi
        4: "anecdote",  // Jeudi
        5: "film",      // Vendredi
        6: "anecdote",  // Samedi
    }
    return map[dayOfWeek] ?? "film"
}

async function generateScript(date: Date): Promise<ReelScript> {
    const fmt = getFormat(date.getDay())
    if (fmt === "anecdote") return genAnecdote(date)
    return genFilm(date)
}

// ─── Template HTML email ──────────────────────────────────────────────────────

const COLORS: Record<string, string> = {
    anecdote: "#3d8a78",
    film:     "#1e3a5f",
}

function jourBlock(s: ReelScript, isJourneeIntlDay: boolean): string {
    const color = COLORS[s.format]
    const formatLabel = s.format === "film" ? "🎬 FILM DU JOUR" : "🧠 ANECDOTE"

    const row = (time: string, segment: string, content: string, bold = false) => `
        <tr>
            <td style="padding:10px 14px;width:140px;vertical-align:top;border-right:1px solid #e5e7eb;">
                <div style="font-size:11px;color:#9ca3af;">${time}</div>
                <div style="font-size:13px;font-weight:700;color:#374151;">${segment}</div>
            </td>
            <td style="padding:10px 16px;font-size:14px;color:${bold ? color : "#111827"};font-weight:${bold ? "700" : "400"};">
                ${content}
            </td>
        </tr>
        <tr><td colspan="2" style="height:3px;background:#f9fafb;"></td></tr>
    `

    // ── Affiche (film) ──
    const afficheRow = s.filmMeta?.affiche
        ? `<tr><td style="padding:6px 0;color:#6b7280;font-weight:600;">🖼️ Affiche</td><td style="padding:6px 0;"><img src="${s.filmMeta.affiche}" alt="${s.filmMeta?.titre ?? ""}" style="height:70px;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.2);" /></td></tr>`
        : ""

    // ── Bloc CapCut Reel 21h ──
    const capCutReel = s.format === "film"
        ? `<div style="padding:12px 20px;background:#eff6ff;border-top:2px dashed #bfdbfe;">
            <div style="font-size:11px;font-weight:700;color:#1e40af;letter-spacing:1px;margin-bottom:8px;">🎬 CAPCUT — REEL 21h FILM</div>
            <table style="width:100%;border-collapse:collapse;font-size:12px;color:#374151;">
                <tr><td style="padding:3px 0;width:120px;color:#6b7280;font-weight:600;">🖼️ Fond</td><td>Affiche "<strong>${s.filmMeta?.titre ?? "le film"}</strong>" flouté — luminosité <strong>-65</strong> — fallback fond <strong>#0f172a</strong></td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🔤 Typo</td><td>Poppins Bold — titre <strong>blanc grand</strong>, année + réal en <strong>doré #f5a623</strong></td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">✨ Effets</td><td>Accroche : slide-in gauche → Corps : fade in → Punchline : mot à mot → CTA : fade in</td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🎵 Son</td><td>Biblio Instagram → <strong>"cinematic"</strong> ou <strong>"epic"</strong> — volume 30%</td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🎭 Acteurs</td><td>${s.filmMeta?.acteurs?.join(" · ") ?? "—"}</td></tr>
                ${afficheRow}
            </table>
            <div style="margin-top:8px;padding:8px;background:#dbeafe;border-radius:6px;font-size:12px;color:#1e40af;">
                💡 <strong>Anecdote :</strong> ${s.filmMeta?.anecdote ?? "—"}
                <span style="display:block;font-size:11px;color:#3b82f6;margin-top:3px;">→ Modifiable si tu en connais une meilleure</span>
            </div>
           </div>`
        : `<div style="padding:12px 20px;background:#f0fdf4;border-top:2px dashed #bbf7d0;">
            <div style="font-size:11px;font-weight:700;color:#16a34a;letter-spacing:1px;margin-bottom:8px;">🧠 CAPCUT — REEL 21h ANECDOTE</div>
            <table style="width:100%;border-collapse:collapse;font-size:12px;color:#374151;">
                <tr><td style="padding:3px 0;width:120px;color:#6b7280;font-weight:600;">🖼️ Fond</td><td>Template CapCut vert existant — fond <strong>#3d8a78</strong></td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🔤 Typo</td><td>Poppins Bold blanc — accroche grande, corps et punchline taille moyenne</td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">✨ Effets</td><td>Accroche : machine à écrire → Corps : slide-in → Punchline : surbrillance jaune</td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🎵 Son</td><td>Biblio Instagram → <strong>"curious"</strong> ou <strong>"light documentary"</strong> — volume 25%</td></tr>
            </table>
           </div>`

    // ── Bloc Journée Internationale ──
    const j = s.journeeIntl
    const capCutJournee = isJourneeIntlDay && j
        ? `<div style="padding:12px 20px;background:#fff7ed;border-top:2px dashed #fed7aa;">
            <div style="font-size:11px;font-weight:700;color:#c2410c;letter-spacing:1px;margin-bottom:8px;">🌍 CAPCUT — REEL 9h JOURNÉE INTERNATIONALE</div>
            <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:4px;">${j.emoji} ${j.nom}</div>
            <div style="font-size:12px;color:#374151;margin-bottom:8px;">${j.description}</div>
            <table style="width:100%;border-collapse:collapse;font-size:12px;color:#374151;">
                <tr><td style="padding:3px 0;width:120px;color:#6b7280;font-weight:600;">🖼️ Fond</td><td>Template CapCut bleu existant — fond <strong>#0284C7</strong></td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🔤 Typo</td><td>Poppins Bold blanc — nom journée en grand, description en Nunito Regular</td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">✨ Effets</td><td>Fade in "AUJOURD'HUI C'EST..." → slide-in nom → apparition description</td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🎵 Son</td><td>Biblio Instagram → <strong>"uplifting"</strong> ou <strong>"world"</strong> — volume 25%</td></tr>
                <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">📝 Script</td><td><strong>0→3s</strong> AUJOURD'HUI C'EST... | <strong>3→10s</strong> ${j.emoji} ${j.nom} | <strong>10→16s</strong> ${j.description} | <strong>16→18s</strong> Abonne-toi @dailyfun_fr</td></tr>
            </table>
           </div>`
        : ""

    // ── Bloc Story ──
    const storyBlock = `<div style="padding:12px 20px;background:#fdf4ff;border-top:2px dashed #e9d5ff;">
        <div style="font-size:11px;font-weight:700;color:#7e22ce;letter-spacing:1px;margin-bottom:8px;">📅 STORY "C'EST ARRIVÉ UN..." — Chaque soir</div>
        <div style="font-size:13px;font-weight:600;color:#111827;margin-bottom:8px;">${s.storyArrive}</div>
        <table style="width:100%;border-collapse:collapse;font-size:12px;color:#374151;">
            <tr><td style="padding:3px 0;width:120px;color:#6b7280;font-weight:600;">📱 Format</td><td>Story 9:16 — 7 secondes max</td></tr>
            <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🖼️ Fond</td><td>Photo en rapport avec le fait — ou fond <strong>#1a1a2e</strong> (nuit historique)</td></tr>
            <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🔤 Typo</td><td>Poppins Bold blanc — date en petit doré en haut, fait en grand au centre</td></tr>
            <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">✨ Effets</td><td>Texte mot à mot — simple et rapide</td></tr>
            <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">🎵 Son</td><td>Optionnel — ambiance discrète, volume max 15%</td></tr>
            <tr><td style="padding:3px 0;color:#6b7280;font-weight:600;">➕ Sticker</td><td>Sticker <strong>Question</strong> → "Tu savais ?" pour provoquer des réponses</td></tr>
        </table>
        <div style="margin-top:8px;padding:8px;background:#f3e8ff;border-radius:6px;font-size:12px;color:#7e22ce;">
            🌙 <strong>Teaser demain :</strong> ${s.storySoir}
        </div>
       </div>`

    return `
    <div style="margin-bottom:32px;border:2px solid #e5e7eb;border-radius:14px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

        <!-- En-tête -->
        <div style="background:${color};padding:14px 20px;display:flex;align-items:center;justify-content:space-between;">
            <span style="color:white;font-weight:700;font-size:17px;">${s.date}</span>
            <span style="color:rgba(255,255,255,0.85);font-size:13px;font-weight:600;">${formatLabel}</span>
        </div>

        <!-- Badges planning -->
        <div style="padding:10px 20px;background:#f9fafb;border-bottom:1px solid #e5e7eb;display:flex;gap:8px;flex-wrap:wrap;">
            <span style="font-size:11px;background:#e0f2fe;color:#0369a1;padding:3px 12px;border-radius:20px;font-weight:600;">🖼️ 8h30 Slider auto</span>
            ${isJourneeIntlDay ? `<span style="font-size:11px;background:#fff7ed;color:#c2410c;padding:3px 12px;border-radius:20px;font-weight:600;">🌍 9h Journée Intl</span>` : ""}
            <span style="font-size:11px;background:${color}22;color:${color};padding:3px 12px;border-radius:20px;font-weight:600;">${s.format === "film" ? "🎬" : "🧠"} 21h Reel</span>
            <span style="font-size:11px;background:#f3e8ff;color:#7e22ce;padding:3px 12px;border-radius:20px;font-weight:600;">📅 Soir Story</span>
        </div>

        <!-- Script Reel 21h -->
        <div style="padding:8px 20px 4px;background:#f9fafb;border-bottom:1px solid #f0f0f0;">
            <div style="font-size:10px;font-weight:700;color:#9ca3af;letter-spacing:1.5px;">SCRIPT REEL 21h</div>
        </div>
        <table style="width:100%;border-collapse:collapse;background:white;">
            ${row("0 → 4 sec",  "ACCROCHE",  s.accroche)}
            ${row("4 → 9 sec",  "CORPS",     s.corps)}
            ${row("9 → 14 sec", "PUNCHLINE", s.punchline, true)}
            ${row("14 → 18 sec","CTA",       s.cta)}
        </table>

        ${capCutReel}
        ${capCutJournee}
        ${storyBlock}
    </div>`
}

function buildEmail(scripts: ReelScript[], weekLabel: string): string {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;">
<div style="max-width:700px;margin:32px auto;padding:0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

    <!-- Header -->
    <div style="text-align:center;padding:32px 0 24px;">
        <div style="font-size:32px;font-weight:800;color:#3d8a78;">🎬 Dailyfun</div>
        <div style="font-size:18px;color:#374151;margin-top:6px;">Planning complet — ${weekLabel}</div>
        <div style="margin-top:16px;padding:16px 20px;background:white;border-radius:12px;text-align:left;font-size:13px;color:#374151;">
            <div style="font-weight:700;margin-bottom:8px;color:#111827;">📅 Planning semaine :</div>
            <div style="margin-bottom:4px;">🖼️ <strong>8h30 tous les jours</strong> — Slider automatique (Make.com)</div>
            <div style="margin-bottom:4px;">🌍 <strong>9h Mar / Jeu / Sam</strong> — Reel Journée Internationale</div>
            <div style="margin-bottom:4px;">🎬 <strong>21h Lun / Mer / Ven / Dim</strong> — Reel Film du jour</div>
            <div style="margin-bottom:4px;">🧠 <strong>21h Mar / Jeu / Sam</strong> — Reel Anecdote</div>
            <div>📅 <strong>Chaque soir</strong> — Story "C'est arrivé un..."</div>
        </div>
    </div>

    <!-- Jours -->
    ${scripts.map((s, i) => {
        const isJourneeIntlDay = [1, 3, 5].includes(i) // i=1 mardi, i=3 jeudi, i=5 samedi
        return jourBlock(s, isJourneeIntlDay)
    }).join("")}

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0;color:#9ca3af;font-size:12px;border-top:1px solid #e5e7eb;">
        Dailyfun · Planning généré automatiquement chaque dimanche soir
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

        for (let i = 0; i < 7; i++) {
            const date = new Date(monday)
            date.setDate(monday.getDate() + i)
            scripts.push(await generateScript(date))
        }

        const dimDate = new Date(monday)
        dimDate.setDate(monday.getDate() + 6)
        const weekLabel = `Semaine du ${formatDateFr(monday)} au ${formatDateFr(dimDate)}`

        const html = buildEmail(scripts, weekLabel)

        await resend.emails.send({
            from: "Dailyfun Scripts <onboarding@resend.dev>",
            to: process.env.SCRIPTS_EMAIL!,
            subject: `📅 Planning Dailyfun — ${weekLabel}`,
            html,
        })

        return NextResponse.json({ success: true, week: weekLabel, scripts: scripts.length })
    } catch (error) {
        console.error("Erreur génération scripts:", error)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }
}