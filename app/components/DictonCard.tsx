import Card from "./Card"
import { getDictonDuJour } from "../data/dictons"

export default function DictonCard() {
    const dicton = getDictonDuJour()
    return (
        <Card title="Dicton du jour" bgColor="#E4D5BC" accent="#5C4430">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "8px 0" }}>
                <span style={{ fontSize: "2.5rem" }}>🌿</span>
                <p style={{
                    fontFamily: "var(--font-licorice)",
                    fontSize: "2.7rem",
                    color: "#5C4430",
                    textAlign: "center",
                    lineHeight: 1,
                }}>
                    "{dicton}"
                </p>
            </div>
        </Card>
    )
}