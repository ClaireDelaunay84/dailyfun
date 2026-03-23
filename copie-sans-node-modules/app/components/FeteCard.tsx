import Card from "./Card"
import { getFeteduJour } from "../data/fetes"
import {
    IconMeteo, IconFete, IconMonde, IconSavoir,
    IconCalendrier, IconNaissance, IconDeces,
    IconDicton, IconProverbe, IconSoleil
} from "./Icons"

export default function FeteCard() {
    const fete = getFeteduJour()

    return (
        <Card title="Fête du jour" emoji="🎉" accent="#FDE68A">
            <div style={{ marginTop: "8px" }}>
                <p style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "var(--font-poppins)", lineHeight: 1.1 }}>
                    St {fete.prenom}
                </p>
                <p style={{
                    marginTop: "12px",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    borderLeft: "3px solid #FFB5A733",
                    paddingLeft: "12px"
                }}>
                    {fete.anecdote}
                </p>
            </div>
        </Card>
    )
}