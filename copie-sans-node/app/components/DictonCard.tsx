import Card from "./Card"
import { getDictonDuJour } from "../data/dictons"

export default function DictonCard() {
    const dicton = getDictonDuJour()
    return (
        <Card title="Dicton du jour" emoji="💭" bgColor="#e4ecdc" accent="#4a5a2a">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "8px 0" }}>
                <span style={{ fontSize: "2.5rem" }}>🌿</span>
                <p style={{
                    fontFamily: "var(--font-licorice)",
                    fontSize: "1.8rem",
                    color: "#4a5a2a",
                    textAlign: "center",
                    lineHeight: 1.4,
                }}>
                    "{dicton}"
                </p>
            </div>
        </Card>
    )
}
