import "./globals.css";

import { Silkscreen } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
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
    icon: "/logosec.png",
  },
  title: "Stefanini CTF by SecForIT",
  description: "Created by hackers for hackers.",
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
                <Analytics />
      </body>
    </html>
  );
}
