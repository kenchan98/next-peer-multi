

import Providers from './providers';
import localFont from "next/font/local";
import "./globals.css";

const ibmM = localFont({
  src: "./fonts/IBMM.woff2",
  variable: "--font-ibm-m",
  weight: "100 900",
});

const ibmBI = localFont({
  src: "./fonts/IBMBI.woff2",
  variable: "--font-ibm-bi",
  weight: "100 900",
});

const ibmR = localFont({
  src: "./fonts/IBMR.woff2",
  variable: "--font-ibm-r",
  weight: "100 900",
});

const ibmSB = localFont({
  src: "./fonts/IBMSB.woff",
  variable: "--font-ibm-sb",
  weight: "100 900",
});

const ibmB = localFont({
  src: "./fonts/IBMB.woff",
  variable: "--font-ibm-b",
  weight: "100 900",
});

export const metadata = {
  title: "Picture Pit Stop",
  description: "a fun word puzzle game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ibmBI.variable} ${ibmR.variable} ${ibmM.variable} ${ibmB.variable} antialiased`} >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
