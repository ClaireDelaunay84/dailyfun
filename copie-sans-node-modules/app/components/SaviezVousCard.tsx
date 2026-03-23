import Card from "./Card"
import { getSaviezVousDuJour } from "../data/saviezVous"

export default function SaviezVousCard() {
    const fact = getSaviezVousDuJour()

    return (
        <Card title="Le saviez-vous ?" emoji="🧠" accent="#BBF7D0">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div style={{
                    fontSize: "3.5rem",
                    lineHeight: 1,
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                }}>
                    {fact.emoji}
                </div>
                <p style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: "var(--text-dark)",
                    textAlign: "center",
                }}>
                    {fact.texte}
                </p>
            </div>
        </Card>
    )
}