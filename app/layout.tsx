import "@unocss/reset/tailwind.css";
import "@/styles/index.css";
import "@/styles/unocss.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Next.js Blueprint",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
