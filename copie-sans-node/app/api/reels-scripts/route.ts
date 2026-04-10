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
    format: "anecdote" | "qa" | "journee"
    accroche: string
    corps: string
    punchline: string
    cta: string
    storySoir: string  // ← AJOUTÉ
}

// ─── Découpage du texte en 2 parties ─────────────────────────────────────────

function splitTexte(texte: string): { corps: string; punchline: string } {
    const match = texte.match(/^(.+?[.!?])\s+(.+)$/)
    if (match) {
        return { corps: match[1].trim(), punchline: match[2].trim() }
    }
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

// ─── Générateurs par format ───────────────────────────────────────────────────

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
        storySoir: genStorySoir(date),  // ← AJOUTÉ
    }
}

function genQA(date: Date): ReelScript {
    const key = formatKey(date)
    const data = saviezVous[key] ?? { emoji: "❓", texte: "Chaque jour recèle une curiosité !" }
    const { corps, punchline } = splitTexte(data.texte)

    const question = corps
        .replace(/^(Le |La |Les |Un |Une |Des )/, "")
        .replace(/\.$/, "")
    const accroche = `${data.emoji} ${question.charAt(0).toUpperCase() + question.slice(1)} — vrai ou faux ?`

    return {
        date: formatDateFr(date),
        format: "qa",
        accroche,
        corps: "👇 Laisse ta réponse en commentaire !",
        punchline: `✅ ${punchline}`,
        cta: "➕ Suis @dailyfun_fr",
        storySoir: genStorySoir(date),  // ← AJOUTÉ
    }
}

function genJournee(date: Date): ReelScript {
    const key = formatKey(date)
    const journees = journeesInternationales[key]
    const j = journees?.[0] ?? {
        nom: "Journée de la curiosité",
        description: "Chaque jour est une occasion d'apprendre quelque chose de nouveau !",
    }
    return {
        date: formatDateFr(date),
        format: "journee",
        accroche: `🌍 AUJOURD'HUI C'EST...`,
        corps: j.description,
        punchline: j.nom,
        cta: "➕ Suis @dailyfun_fr",
        storySoir: genStorySoir(date),  // ← AJOUTÉ
    }
}

// ─── Rotation des formats ─────────────────────────────────────────────────────

function getFormat(dayOfWeek: number): "anecdote" | "qa" | "journee" {
    const map: Record<number, "anecdote" | "qa" | "journee"> = {
        1: "anecdote",
        2: "qa",
        3: "journee",
        4: "anecdote",
        5: "qa",
        6: "journee",
    }
    return map[dayOfWeek] ?? "anecdote"
}

function generateScript(date: Date): ReelScript {
    const fmt = getFormat(date.getDay())
    if (fmt === "anecdote") return genAnecdote(date)
    if (fmt === "qa")       return genQA(date)
    return genJournee(date)
}

// ─── Template HTML email ──────────────────────────────────────────────────────

const COLORS: Record<string, string> = {
    anecdote: "#3d8a78",
    qa:       "#7C3AED",
    journee:  "#0284C7",
}

const LABELS: Record<string, string> = {
    anecdote: "🤯 ANECDOTE",
    qa:       "❓ Q&A",
    journee:  "🌍 JOURNÉE INTERNATIONALE",
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
        <div style="padding:14px 20px;background:#f0fdf4;border-top:2px dashed #bbf7d0;">
            <div style="font-size:11px;font-weight:700;color:#16a34a;letter-spacing:1px;margin-bottom:6px;">🌙 STORY DU SOIR — Question mystère pour tes abonnés</div>
            <div style="font-size:14px;color:#111827;">${s.storySoir}</div>
            <div style="font-size:11px;color:#9ca3af;margin-top:4px;">→ Réponse demain matin dans le Reel</div>
        </div>
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
            🤯 Lun/Jeu = Anecdote &nbsp;·&nbsp; ❓ Mar/Ven = Q&A &nbsp;·&nbsp; 🌍 Mer/Sam = Journée Internationale
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
            scripts.push(generateScript(date))
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