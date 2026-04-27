import { NextResponse } from "next/server"

export const revalidate = 86400

export async function GET() {
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) return NextResponse.json({ films: [] }, { status: 500 })

    const today = new Date()
    const jourDuMois = today.getDate()

    const toutesLesAnnees = [
        1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989,
        1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005,
        2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2099, 2020, 2021, 2022, 2023, 2024, 2025
    ]

    const offset = (jourDuMois - 1) % toutesLesAnnees.length
    const anneesCibles = [
        ...toutesLesAnnees.slice(offset, offset + 5),
        ...toutesLesAnnees.slice(0, Math.max(0, offset + 5 - toutesLesAnnees.length))
    ]

    const fmt = (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

    const candidats: any[] = []

    await Promise.all(
        anneesCibles.map(async (annee) => {
            // Essaie d'abord ±5 jours, fallback ±14 jours si rien trouvé
            for (const fenetre of [5, 14]) {
                try {
                    const dateMin = new Date(annee, today.getMonth(), today.getDate() - fenetre)
                    const dateMax = new Date(annee, today.getMonth(), today.getDate() + fenetre)

                    const res = await fetch(
                        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=fr-FR&sort_by=popularity.desc&vote_count.gte=1000&primary_release_date.gte=${fmt(dateMin)}&primary_release_date.lte=${fmt(dateMax)}&page=1`,
                        { next: { revalidate: 86400 } }
                    )
                    const data = await res.json()
                    if (data.results?.[0]) {
                        candidats.push(data.results[0])
                        break // on a trouvé, pas besoin du fallback
                    }
                } catch { /* continue */ }
            }
        })
    )

    const dedup = Array.from(new Map(candidats.map(f => [f.id, f])).values())
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 3)

    const MM = String(today.getMonth() + 1).padStart(2, "0")
    const DD = String(today.getDate()).padStart(2, "0")

    const films = await Promise.all(
        dedup.map(async (film: any) => {
            try {
                const credRes = await fetch(
                    `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${apiKey}&language=fr-FR`,
                    { next: { revalidate: 86400 } }
                )
                const cred = await credRes.json()
                const realisateur = cred.crew?.find((c: any) => c.job === "Director")?.name ?? null
                const acteurs = cred.cast?.slice(0, 3).map((a: any) => a.name) ?? []
                const ov = film.overview ?? ""
                return {
                    id: film.id,
                    titre: film.title,
                    titreOriginal: film.original_title !== film.title ? film.original_title : null,
                    annee: film.release_date?.split("-")[0] ?? "?",
                    affiche: film.poster_path
                        ? `https://image.tmdb.org/t/p/w342${film.poster_path}`
                        : null,
                    synopsis:  ov,
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
        films: films.filter(Boolean),
        date: `${DD}/${MM}`,
    })
}