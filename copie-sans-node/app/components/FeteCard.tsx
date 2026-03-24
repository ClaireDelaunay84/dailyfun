import Card from "./Card"
import { getFeteduJour } from "../data/fetes"

export default function FeteCard() {
    const fete = getFeteduJour()

    return (
        <Card title="Fête du jour" emoji="🎉" bgColor="#c8ece6" accent="#3d8a78">
            <div style={{ marginTop: "8px" }}>
                <p style={{
                    fontSize: "2rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-jost)",
                    lineHeight: 1.1,
                    color: "var(--text-dark)",
                }}>
                    {fete.prenom}
                </p>
                <p style={{
                    marginTop: "12px",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    borderLeft: "3px solid #3d8a7833",
                    paddingLeft: "12px",
                }}>
                    {fete.anecdote}
                </p>
            </div>
        </Card>
    )
}
