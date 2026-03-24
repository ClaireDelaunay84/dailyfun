import Card from "./Card"
import { getFeteduJour } from "../data/fetes"

export default function FeteCard() {
    const fete = getFeteduJour()
    return (
        <Card title="Fête du jour" emoji="🎉" bgColor="#c8ece6" accent="#2d6a5e">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <p style={{
                    fontFamily: "var(--font-licorice)",
                    fontSize: "3rem",
                    color: "#2d6a5e",
                    lineHeight: 1.1,
                }}>
                    {fete.prenom}
                </p>
                <p style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: "var(--text-muted)",
                    fontStyle: "italic",
                    borderLeft: "3px solid #2d6a5e33",
                    paddingLeft: "14px",
                }}>
                    {fete.anecdote}
                </p>
            </div>
        </Card>
    )
}
