import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"
import Footer from "./components/Footer"

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700", "800", "900"],
    variable: "--font-dm-sans",
})

export const metadata: Metadata = {
    title: "Dailyfun — Ta dose quotidienne de culture",
    description: "Fête du jour, éphémérides, citations, journées internationales et bien plus !",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Qwitcher+Grypen:wght@400;700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&display=swap" rel="stylesheet" />
        </head>
        <body className={dmSans.variable} style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {children}
        <Footer />
        </body>
        </html>
    )
}