import "./globals.css";

import { Silkscreen } from "next/font/google";

import NextAuthSessionProvider from "./_providers/sessionProvider";
import Navbar from "./_components/Navbar";
import Bottom from "./_components/Bottom";
import CookiesConsent from "./_components/CookiesConsent";
import { SocialList } from "./_template_data/Social";

const silkScreen = Silkscreen({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
  display: "swap",
});

export const metadata = {
  icons: {
    icon: "/descope.jpeg",
  },
  title: "SecforIT CTF - Stefanini | DEV Talks 2025",
  description: "Test your skills, solve the puzzles, and crack the codes. Can you capture all the flags?",
};

// Create SVG logo as a string to use as data URL
const createSVGLogo = (color: string = "#37c598") => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="none"/>
      <!-- Laptop -->
      <rect x="20" y="30" width="50" height="30" rx="3" stroke="${color}" stroke-width="2" fill="none"/>
      <rect x="15" y="60" width="60" height="5" rx="2" stroke="${color}" stroke-width="2" fill="none"/>
      <!-- Lock -->
      <circle cx="75" cy="40" r="12" stroke="${color}" stroke-width="2" fill="none"/>
      <rect x="68" y="45" width="14" height="10" rx="1" stroke="${color}" stroke-width="1.5" fill="none"/>
      <rect x="70" y="38" width="10" height="10" rx="5" stroke="${color}" stroke-width="1.5" fill="none"/>
      <circle cx="75" cy="50" r="1.5" fill="${color}"/>
      <!-- Binary -->
      <text x="25" y="42" font-family="monospace" font-size="4" fill="${color}">1011</text>
      <text x="25" y="48" font-family="monospace" font-size="4" fill="${color}">0101</text>
      <text x="25" y="54" font-family="monospace" font-size="4" fill="${color}">1100</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create logo data URLs
  const logoBlack = createSVGLogo("#262d3b");
  const logoWhite = createSVGLogo("#37c598");

  return (
    <html lang="en">
      <body className={silkScreen.className}>
        <NextAuthSessionProvider>
          <Navbar Logo={logoBlack} />
          <div>{children}</div>
          <Bottom Logo={logoWhite} SocialList={SocialList} />
          <CookiesConsent />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}