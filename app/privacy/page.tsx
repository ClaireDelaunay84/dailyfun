export default function PrivacyPage() {
    return (
        <main style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "48px 24px",
            fontFamily: "var(--font-body, sans-serif)",
            color: "#3A2E22",
            lineHeight: 1.8,
        }}>
            <h1 style={{
                fontFamily: "'Mr De Haviland', cursive",
                fontSize: "3rem",
                color: "#5C4430",
                marginBottom: "8px",
            }}>Politique de confidentialité</h1>

            <p style={{ fontSize: "0.85rem", color: "#9C8A76", marginBottom: "40px" }}>
                Dernière mise à jour : avril 2025
            </p>

            <section style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>1. Présentation</h2>
                <p>
                    Dailyfun (<strong>dailyfun.fr</strong>) est un site de contenu culturel quotidien. Il ne nécessite
                    aucune inscription, aucun compte utilisateur et ne collecte aucune donnée personnelle identifiante.
                </p>
            </section>

            <section style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>2. Données collectées</h2>
                <p>
                    Dailyfun collecte uniquement la <strong>géolocalisation de votre appareil</strong>, et uniquement
                    si vous l'autorisez explicitement, afin d'afficher la météo de votre localité. Cette donnée est
                    utilisée en temps réel et n'est jamais stockée ni transmise à des tiers.
                </p>
                <p style={{ marginTop: "10px" }}>
                    Aucune autre donnée personnelle (nom, email, adresse IP, cookies de tracking) n'est collectée.
                </p>
            </section>

            <section style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>3. Cookies</h2>
                <p>
                    Dailyfun n'utilise pas de cookies publicitaires ni de traceurs. Des cookies techniques strictement
                    nécessaires au fonctionnement du site peuvent être déposés par le navigateur, conformément à
                    l'exemption prévue par la réglementation RGPD.
                </p>
            </section>

            <section style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>4. Services tiers</h2>
                <p>Dailyfun utilise les services suivants :</p>
                <ul style={{ marginTop: "10px", paddingLeft: "20px" }}>
                    <li style={{ marginBottom: "6px" }}>
                        <strong>OpenWeatherMap</strong> — pour récupérer les données météo à partir de votre localisation.
                        Leur politique de confidentialité est disponible sur{" "}
                        <a href="https://openweathermap.org/privacy-policy" target="_blank" style={{ color: "#9E7F5C" }}>
                            openweathermap.org
                        </a>
                    </li>
                    <li style={{ marginBottom: "6px" }}>
                        <strong>Wikimedia / Wikipédia</strong> — pour récupérer des données encyclopédiques publiques
                        (naissances, décès, événements historiques, images).
                    </li>
                    <li>
                        <strong>Vercel</strong> — hébergement du site. Des logs techniques anonymisés peuvent être
                        générés par l'infrastructure d'hébergement.
                    </li>
                </ul>
            </section>

            <section style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>5. Vos droits (RGPD)</h2>
                <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit
                    d'accès, de rectification et de suppression de vos données. Dans la mesure où Dailyfun ne collecte
                    aucune donnée personnelle identifiante, ces droits s'exercent de fait automatiquement.
                </p>
                <p style={{ marginTop: "10px" }}>
                    Pour toute question, vous pouvez nous contacter par email à l'adresse indiquée ci-dessous.
                </p>
            </section>

            <section style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>6. Suppression de données</h2>
                <p>
                    Dailyfun ne stockant aucune donnée personnelle, aucune procédure de suppression n'est nécessaire.
                    Si vous avez autorisé la géolocalisation dans votre navigateur, vous pouvez révoquer cette
                    autorisation à tout moment dans les paramètres de votre navigateur.
                </p>
            </section>

            <section style={{ marginBottom: "32px" }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "10px" }}>7. Contact</h2>
                <p>
                    Pour toute question relative à cette politique de confidentialité :<br />
                    <a href="mailto:clairedelaunay84@gmail.com" style={{ color: "#9E7F5C" }}>clairedelaunay84@gmail.com</a>
                </p>
            </section>

            <p style={{ fontSize: "0.8rem", color: "#9C8A76", borderTop: "1px solid #D9CCBA", paddingTop: "24px" }}>
                © {new Date().getFullYear()} Dailyfun — Tous droits réservés
            </p>
        </main>
    )
}