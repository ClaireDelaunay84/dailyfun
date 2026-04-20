import Card from "./Card"
import { getFeteduJour } from "../data/fetes"

export default function FeteCard() {
    const fete = getFeteduJour()
    return (
        <Card title="Fête du jour" bgColor="#EAE0D0" accent="#5C4430">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <p style={{
                    fontFamily: "var(--font-licorice)",
                    fontSize: "3rem",
                    color: "#5C4430",
                    lineHeight: 1.1,
                }}>
                    {fete.prenom}
                </p>
                <p style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    borderLeft: "3px solid #C8B49A",
                    paddingLeft: "14px",
                }}>
                    {fete.anecdote}
                </p>
            </div>
        </Card>
    )
}