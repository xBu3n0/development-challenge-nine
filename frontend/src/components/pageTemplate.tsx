import { Inter } from "next/font/google";
import "../app/globals.css";
import AuthProvider from "./authProvider";
import Header from "./header";
import Footer from "./footer";

const inter = Inter({ subsets: ["latin"] });

interface TemplateOptions {
  auth: boolean;
}

export default function RootLayout({auth}: TemplateOptions) {
  return ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <html lang="en">
        <body className={inter.className}>
          <AuthProvider redirect={auth}>
            {children}
          </AuthProvider>
        </body>
      </html>
    )
  }
}
