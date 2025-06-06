import "./globals.css";

import { Silkscreen } from "next/font/google";

import NextAuthSessionProvider from "./_providers/sessionProvider";
import Navbar from "./_components/Navbar";

import LogoBlack from "./_assets/logo/icons8-pixel-heart-100 (black).png";
import LogoWhite from "./_assets/logo/icons8-pixel-heart-100.png";

import Bottom from "./_components/Bottom";
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
  title: "SecForIT CTF | Stefanini | DevTalks 2025",
  description: "Created by stefanini's security team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={silkScreen.className}>
        <NextAuthSessionProvider>
          <Navbar Logo={LogoBlack.src} />
          <div>{children}</div>
          <Bottom Logo={LogoWhite.src} SocialList={SocialList} />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}