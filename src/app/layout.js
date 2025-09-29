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
    title: "DiffyAI | Multi Model Lightweight AI Chat App",
    icons: {
        icon: [{ url: "/favicon.ico" }],
    },
    description: "DiffyAI lets you easily compare responses from multiple AI models, like OpenAI GPT, Claude, Gemini, LLaMA, and more - all side by side in one place.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta property="og:title" content="DiffyAI | Multi Model Lightweight AI Chat App" />
                <meta property="og:description" content="DiffyAI lets you easily compare responses from multiple AI models, like OpenAI GPT, Claude, Gemini, LLaMA, and more - all side by side in one place." />
                <meta property="og:image" content="/diffy-ai-img-1.png" />
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
                {/* <script defer src="https://cloud.umami.is/script.js" data-website-id="1ad05d53-142a-4cda-9dac-11f8aa3900aa"></script> */}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="flex p-2 sm:gap-2 gap-0 h-screen overflow-hidden">
                    <SidebarWrapper />
                    <div className="flex flex-1 h-full w-full overflow-auto custom-scrollbar">{children}</div>
                </div>
            </body>
        </html>
    );
}
