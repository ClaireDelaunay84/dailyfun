import Header from "../components/Header"
export default function Credits() {
    return (
        <main style={{minHeight: "100vh", background: "#fdf8f3"}}>
            <Header/>
            <div style={{maxWidth: "760px", margin: "0 auto", padding: "16px 24px 0"}}>
                <a href="/" style={{
                    fontSize: "13px",
                    color: "#9E7F5C",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                }}>
                    ← Retour au site
                </a>
            </div>
            <div style={{
                maxWidth: "760px", margin: "0 auto", padding: "48px 24px",
                fontFamily: "var(--font-body, sans-serif)", color: "#3A2E22", lineHeight: 1.8,
            }}>
                <h1 style={{
                    fontFamily: "'Qwitcher Grypen', cursive",
                    fontSize: "3rem", color: "#5C4430", marginBottom: "8px",
                }}>Crédits</h1>
                <p style={{fontSize: "0.85rem", color: "#9C8A76", marginBottom: "40px"}}>
                    Ressources utilisées dans Dailyfun
                </p>

                <section style={{marginBottom: "32px"}}>
                    <h2 style={{fontSize: "1rem", fontWeight: 600, marginBottom: "10px"}}>Icônes</h2>
                    <p>
                        Icônes conçues par{" "}
                        <a href="https://www.freepik.com" target="_blank" style={{color: "#9E7F5C"}}>Freepik</a>
                        {" "}depuis{" "}
                        <a href="https://www.flaticon.com/fr/" target="_blank"
                           style={{color: "#9E7F5C"}}>www.flaticon.com</a>
                    </p>
                </section>

                <p style={{fontSize: "0.8rem", color: "#9C8A76", borderTop: "1px solid #D9CCBA", paddingTop: "24px"}}>
                    © {new Date().getFullYear()} Dailyfun — Tous droits réservés
                </p>
            </div>
        </main>
    )
}