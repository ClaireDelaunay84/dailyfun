import Card from "./Card"
import { getSaviezVousDuJour } from "../data/saviezVous"

export default function SaviezVousCard() {
    const fact = getSaviezVousDuJour()
    return (
        <Card title="Le saviez-vous ?" bgColor="#C8B49A" accent="#5C4430">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", padding: "8px 0" }}>
                <div style={{ fontSize: "3.5rem", lineHeight: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.08))" }}>
                    {fact.emoji}
                </div>
                <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-dark)", textAlign: "center" }}>
                    {fact.texte}
                </p>
            </div>
        </Card>
    )
}