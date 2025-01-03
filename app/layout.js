import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";

import AdminMenu from "@/components/AdminMenu";
import Link from "next/link";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Upasana Foundation",
  description:
    "Upasana Foundation is a non-profit organization that aims to provide spiritual well-being to the society.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} dark:bg-url('/texture-pattern-dark.svg') bg-url('/texture-pattern-light.svg')`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignedIn>
              <AdminMenu />
            </SignedIn>

            <Navbar />

            <div className="fixed right-6 bottom-6 z-50">
              <Link target="_blank" href={`https://wa.me/${"+919482330850"}`}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBuTSKJXT0jrs3q-rT87uhekCyyWY_FX_RC5CK4O0IDA&s"
                  className="max-w-[50px] rounded-full"
                  alt="whatsapp-floating-btn"
                />
              </Link>
            </div>
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
