import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "./globals.css"

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-jost-var",
})

export const metadata: Metadata = {
    title: "Dailyfun — Ta dose quotidienne de culture",
    description: "Fête du jour, éphémérides, citations, journées internationales et bien plus !",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <head>
            {/* Licorice via CDN Google Fonts — méthode la plus fiable */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Licorice&display=swap" rel="stylesheet" />
        </head>
        <body className={jost.variable}>
        {children}
        </body>
        </html>
    )
}
