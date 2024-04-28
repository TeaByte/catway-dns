import "~/styles/globals.css";

import { Rubik } from "next/font/google";

import { Toaster } from "~/components/ui/sonner";
import AuthProvider from "./_components/auth-provider";
import TopNav from "./_components/top-nav";
import Footer from "./_components/footer";

const font = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Catway DNS",
  description:
    "Just like a cat finding its way home, Cat DNS ensures your devices and services are always reachable.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: [
    "Dynamic DNS",
    "Free DNS service",
    "Cat DNS",
    "Dynamic IP address",
    "Custom subdomains",
    "DNS management",
    "Home network access",
    "Dynamic IP management",
    "Personalized subdomains",
    "Reliable DNS service",
    "Free domain name service",
    "Free domain",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`dark ${font.className}`}>
        <AuthProvider>
          <TopNav />
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
