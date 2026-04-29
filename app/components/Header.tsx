"use client"
import styles from "../page.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <a href="/" style={{ textDecoration: "none" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                        <span className={styles.headerLogo}>Dailyfun</span>
                        <span className={styles.headerTagline}>Ta dose quotidienne de culture</span>
                    </div>
                </a>
            </div>
            <div className={styles.headerRight}>
                <a href="https://www.buymeacoffee.com/dailyfun" target="_blank" className={styles.supportBtn}>
                    ♡ Soutenir le projet
                </a>
            </div>
        </header>
    )
}