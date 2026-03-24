import type { Metadata } from "next"
import { Poppins, Nunito, Jost, Licorice } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
    variable: "--font-poppins-var",
})

const nunito = Nunito({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
    variable: "--font-nunito-var",
})

const jost = Jost({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-jost-var",
})

const licorice = Licorice({
    subsets: ["latin"],
    weight: "400",
    variable: "--font-licorice-var",
})

export const metadata: Metadata = {
    title: "Dailyfun — Ta dose quotidienne de culture",
    description: "Fête du jour, éphémérides, citations, journées internationales et bien plus !",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
        <body className={`${poppins.variable} ${nunito.variable} ${jost.variable} ${licorice.variable}`}>
        {children}
        </body>
        </html>
    )
}
