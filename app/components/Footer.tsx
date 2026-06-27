export default function Footer() {
    return (
        <footer style={{
            textAlign: "center",
            padding: "24px 16px 32px",
            fontSize: "0.75rem",
            color: "#9C8A76",
            borderTop: "1px solid #E8DDD0",
            marginTop: "auto",
        }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginBottom: "8px" }}>
                <a href="/privacy" style={{ color: "#9E7F5C", textDecoration: "none" }}>Confidentialité</a>
                <a href="/terms" style={{ color: "#9E7F5C", textDecoration: "none" }}>CGU</a>
                <a href="/privacy/deletion" style={{ color: "#9E7F5C", textDecoration: "none" }}>Suppression des données</a>
                <a href="/credits" style={{ color: "#9E7F5C", textDecoration: "none" }}>Crédits</a>
            </div>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Dailyfun — Tous droits réservés</p>
        </footer>
    )
}