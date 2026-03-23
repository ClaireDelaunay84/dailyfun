import type { Metadata } from "next"
import { Poppins, Nunito } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
    variable: "--font-poppins",
})

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    variable: "--font-nunito",
})

export const metadata: Metadata = {
    title: "Dailyfun — Votre dose quotidienne",
    description: "Météo, éphémérides, fêtes du jour et bien plus !",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
        <body className={`${poppins.variable} ${nunito.variable}`}>
        {children}
        </body>
        </html>
    )
}