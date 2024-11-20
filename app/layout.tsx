import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/components/minikit-provider";
import dynamic from "next/dynamic";
import NextAuthProvider from "@/components/next-auth-provider";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenOpinions",
  description: "Where truth meets privacy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    },
  );
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <WagmiProvider config={wagmiConfig}> */}
        <NextAuthProvider>
          <ErudaProvider>
            <MiniKitProvider>
              <NextUIProvider>
                <Navbar />
                {children}
              </NextUIProvider>
            </MiniKitProvider>
          </ErudaProvider>
        </NextAuthProvider>
        {/* </WagmiProvider> */}
      </body>
    </html>
  );
}
