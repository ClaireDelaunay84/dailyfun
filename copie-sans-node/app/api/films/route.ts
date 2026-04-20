import { NextRequest, NextResponse } from "next/server"

export const revalidate = 86400

export async function GET(request: NextRequest) {
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) return NextResponse.json({ films: [] }, { status: 500 })

    const today = new Date()
    const MM = String(today.getMonth() + 1).padStart(2, "0")
    const DD = String(today.getDate()).padStart(2, "0")

    // On cherche des films sortis ce jour-là dans différentes décennies
    const decades = [1980, 1990, 2000, 2010, 2020]
    const filmsParDecennie: any[] = []

    for (const decade of decades) {
        const dateDebut = `${decade}-${MM}-${String(Math.max(1, parseInt(DD) - 7)).padStart(2, "0")}`
        const dateFin   = `${decade + 9}-${MM}-${String(Math.min(28, parseInt(DD) + 7)).padStart(2, "0")}`

        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=revenue.desc&primary_release_date.gte=${dateDebut}&primary_release_date.lte=${dateFin}&page=1`,
                { next: { revalidate: 86400 } }
            )
            const data = await res.json()
            if (data.results?.[0]) {
                filmsParDecennie.push(data.results[0])
            }
        } catch {
            // on continue si une décennie échoue
        }
    }

    // Pour chaque film, on récupère les crédits (réalisateur + acteurs)
    const filmsAvecCredits = await Promise.all(
        filmsParDecennie.slice(0, 3).map(async (film: any) => {
            try {
                const credRes = await fetch(
                    `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${apiKey}&language=fr-FR`,
                    { next: { revalidate: 86400 } }
                )
                const cred = await credRes.json()
                const realisateur = cred.crew?.find((c: any) => c.job === "Director")?.name ?? null
                const acteurs = cred.cast?.slice(0, 3).map((a: any) => a.name) ?? []
                return {
                    id: film.id,
                    titre: film.title,
                    titreOriginal: film.original_title !== film.title ? film.original_title : null,
                    annee: film.release_date?.split("-")[0] ?? "?",
                    affiche: film.poster_path
                        ? `https://image.tmdb.org/t/p/w342${film.poster_path}`
                        : null,
                    synopsis: film.overview ?? "",
                    note: film.vote_average ? Math.round(film.vote_average * 10) / 10 : null,
                    realisateur,
                    acteurs,
                }
            } catch {
                return null
            }
        })
    )

    return NextResponse.json({
        films: filmsAvecCredits.filter(Boolean),
        date: `${DD}/${MM}`,
    })
}