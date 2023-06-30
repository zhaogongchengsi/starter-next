import "@unocss/reset/tailwind.css";
import "@/styles/index.css";
import "@/styles/unocss.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
