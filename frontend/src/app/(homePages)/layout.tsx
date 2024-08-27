import RootLayout from "@/components/pageTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Homepage',
  description: 'Home page'
}

export default RootLayout({auth: false});
