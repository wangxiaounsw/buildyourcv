import type { Metadata } from "next";
import {
  Inter,
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
  Merriweather,
  Playfair_Display,
  Source_Code_Pro,
} from "next/font/google";
import "./globals.css";

// Load Google Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], variable: "--font-source-code" });

export const metadata: Metadata = {
  title: "BuildYourCV - Create Professional Resumes",
  description: "Open source CV builder based on JSON Resume standard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable}
          ${roboto.variable}
          ${openSans.variable}
          ${lato.variable}
          ${montserrat.variable}
          ${merriweather.variable}
          ${playfair.variable}
          ${sourceCodePro.variable}
          antialiased
        `}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
