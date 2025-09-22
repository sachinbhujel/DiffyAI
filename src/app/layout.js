/* eslint-disable @next/next/no-page-custom-font */
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarWrapper from "./components/SidebarWrapper";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "DiffyAI | ",
    icons: {
        icon: [{ url: "/favicon.ico" }],
    },
    description: "",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta property="og:title" content="" />
                <meta property="og:description" content="" />
                <meta property="og:image" content="" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />

                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="flex p-2 sm:gap-2 gap-0 h-[100vh] overflow-hidden border">
                    <SidebarWrapper />
                    <div className="flex flex-1 h-full overflow-auto">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
