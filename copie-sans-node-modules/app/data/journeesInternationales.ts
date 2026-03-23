import { journeesA } from "./journeesInternationalesA"
import { journeesB } from "./journeesInternationalesB"

type JourneeInternationale = {
    nom: string
    description: string
}

export const journeesInternationales: Record<string, JourneeInternationale[]> = {
    ...journeesA,
    ...journeesB,
}

export function getJourneesduJour(): JourneeInternationale[] {
    const today = new Date()
    const key = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
    return journeesInternationales[key] ?? [
        { nom: "Journée de la curiosité", description: "Chaque jour est une occasion d'apprendre quelque chose de nouveau !" }
    ]
}