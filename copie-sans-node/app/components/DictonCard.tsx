import Card from "./Card"
import { getDictonDuJour } from "../data/dictons"

export default function DictonCard() {
    const dicton = getDictonDuJour()

    return (
        <Card title="Dicton du jour" emoji="💭" bgColor="#e4ecdc" accent="#4a5a2a">
            <p style={{
                fontSize: "1rem",
                fontStyle: "italic",
                lineHeight: 1.8,
                color: "var(--text-dark)",
                textAlign: "center",
                padding: "8px 4px",
            }}>
                "{dicton}"
            </p>
        </Card>
    )
}
