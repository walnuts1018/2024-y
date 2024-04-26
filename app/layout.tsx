import type { Metadata } from "next";
import "./globals.css";
import { Nunito, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "./header/header";
import { StyledEngineProvider } from "@mui/material/styles";

const NunitoFont = Nunito({
  subsets: ["latin"],
  variable: "--font-Nunito",
});
const NotoFont = Noto_Sans_JP({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-Noto",
});

const title = "Y";
const description = "「ナウ」を見つけよう / Y";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s - ${title}`,
  },
  description: description,
  openGraph: {
    title: title,
    description,
    siteName: title,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: title,
    description,
    site: "@walnuts1018",
    creator: "@walnuts1018",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${NunitoFont.variable} ${NotoFont.variable}`}>
        <StyledEngineProvider injectFirst>
          <div className="font-Noto">{children}</div>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
