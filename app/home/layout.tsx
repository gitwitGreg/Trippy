import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import './global.css'
import BottomBar from "../components/BottomBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trippy Home screen",
  description: "Your real travel guide",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="flex gap-4 flex-col justify-between">
        {children}
      </main>
  );
}