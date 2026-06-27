import Header from "../components/Header"

export default function TermsPage() {
    return (
        <main style={{ minHeight: "100vh", background: "#fdf8f3" }}>
            <Header />
            <div style={{ maxWidth: "760px", margin: "0 auto", padding: "16px 24px 0" }}>
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
                }}>Conditions générales d'utilisation</h1>
                <p style={{ fontSize: "0.85rem", color: "#9C8A76", marginBottom: "40px" }}>
                    Dernière mise à jour : juin 2025
                </p>

                <section style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>1. Présentation du service</h2>
                    <p>
                        Dailyfun (<strong>dailyfun.fr</strong>) est un site de contenu culturel quotidien proposant des
                        éphémérides, horoscopes, journées internationales, citations et informations culturelles. L'accès
                        au site est gratuit et ne nécessite aucune inscription.
                    </p>
                </section>

                <section style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>2. Accès au service</h2>
                    <p>
                        Le site est accessible à tout utilisateur disposant d'un accès internet. Dailyfun se réserve le
                        droit de modifier, suspendre ou interrompre le service à tout moment sans préavis.
                    </p>
                </section>

                <section style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>3. Propriété intellectuelle</h2>
                    <p>
                        Le contenu éditorial du site (textes, structure, design) est la propriété de Dailyfun. Les
                        données encyclopédiques proviennent de sources publiques (Wikipédia, Wikimedia) sous licences
                        ouvertes. Les données météorologiques sont fournies par OpenWeatherMap.
                    </p>
                </section>

                <section style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>4. Intégration TikTok</h2>
                    <p>
                        Dailyfun utilise l'API TikTok Content Posting pour publier automatiquement du contenu vidéo sur
                        son propre compte TikTok (<strong>@dailyfun_fr</strong>). Cette intégration concerne uniquement
                        le compte Dailyfun et ne collecte aucune donnée des utilisateurs TikTok visitant ce site.
                    </p>
                </section>

                <section style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>5. Limitation de responsabilité</h2>
                    <p>
                        Les contenus publiés sur Dailyfun sont fournis à titre informatif. Dailyfun ne saurait être
                        tenu responsable d'éventuelles inexactitudes dans les données affichées (horoscopes, éphémérides,
                        données météo).
                    </p>
                </section>

                <section style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>6. Données personnelles</h2>
                    <p>
                        Le traitement des données personnelles est décrit dans notre{" "}
                        <a href="/privacy" style={{ color: "#9E7F5C" }}>Politique de confidentialité</a>.
                    </p>
                </section>

                <section style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>7. Droit applicable</h2>
                    <p>
                        Les présentes CGU sont soumises au droit français. Tout litige sera soumis aux tribunaux compétents
                        de France.
                    </p>
                </section>

                <section style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>8. Contact</h2>
                    <p>
                        Pour toute question relative aux présentes CGU :<br />
                        <a href="mailto:contactdailyfun@gmail.com" style={{ color: "#9E7F5C" }}>contactdailyfun@gmail.com</a>
                    </p>
                </section>

                <p style={{ fontSize: "0.8rem", color: "#9C8A76", borderTop: "1px solid #D9CCBA", paddingTop: "24px" }}>
                    © {new Date().getFullYear()} Dailyfun — Tous droits réservés
                </p>
            </div>
        </main>
    )
}