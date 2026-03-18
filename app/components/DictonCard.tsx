import Card from "./Card"
import { getDictonDuJour } from "../data/dictons"

export default function DictonCard() {
    const dicton = getDictonDuJour()

    return (
        <Card title="Dicton du jour" emoji="💬" accent="#BDE0FE">
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