import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
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
            <link href="https://fonts.googleapis.com/css2?family=Qwitcher+Grypen:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        </head>
        <body className={dmSans.variable}>
        {children}
        </body>
        </html>
    )
}