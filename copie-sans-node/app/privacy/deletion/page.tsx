import Header from "../../components/Header"

export default function DataDeletionPage() {
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
                }}>Suppression des données</h1>
                <p style={{fontSize: "0.85rem", color: "#9C8A76", marginBottom: "40px"}}>
                    Dernière mise à jour : avril 2025
                </p>

                <section style={{marginBottom: "32px"}}>
                    <h2 style={{fontSize: "1rem", fontWeight: 600, marginBottom: "10px"}}>
                        Dailyfun ne stocke aucune donnée personnelle
                    </h2>
                    <p>
                        Dailyfun (<strong>dailyfun.fr</strong>) ne collecte ni ne stocke aucune donnée personnelle
                        identifiante. Aucun compte utilisateur n'est créé, aucun email n'est enregistré.
                    </p>
                </section>

                <section style={{marginBottom: "32px"}}>
                    <h2 style={{fontSize: "1rem", fontWeight: 600, marginBottom: "10px"}}>Géolocalisation</h2>
                    <p>
                        Si vous avez autorisé la géolocalisation pour afficher la météo, cette donnée est utilisée
                        uniquement en temps réel et n'est jamais stockée. Pour révoquer cette autorisation :
                    </p>
                    <ul style={{marginTop: "10px", paddingLeft: "20px"}}>
                        <li style={{marginBottom: "6px"}}><strong>Chrome</strong> — Paramètres → Confidentialité →
                            Paramètres des sites → Localisation
                        </li>
                        <li style={{marginBottom: "6px"}}><strong>Safari</strong> — Préférences → Sites web →
                            Localisation
                        </li>
                        <li><strong>Firefox</strong> — Paramètres → Vie privée → Permissions → Localisation</li>
                    </ul>
                </section>

                <section style={{marginBottom: "32px"}}>
                    <h2 style={{fontSize: "1rem", fontWeight: 600, marginBottom: "10px"}}>Demande de suppression</h2>
                    <p>
                        Pour toute demande relative à vos données, contactez-nous à :{" "}
                        <a href="mailto:clairedelaunay84@gmail.com" style={{color: "#9E7F5C"}}>
                            clairedelaunay84@gmail.com
                        </a>
                    </p>
                    <p style={{marginTop: "10px"}}>
                        Nous vous répondrons dans un délai de 30 jours conformément au RGPD.
                    </p>
                </section>

                <p style={{fontSize: "0.8rem", color: "#9C8A76", borderTop: "1px solid #D9CCBA", paddingTop: "24px"}}>
                    © {new Date().getFullYear()} Dailyfun — Tous droits réservés
                </p>
            </div>
        </main>
    )
}