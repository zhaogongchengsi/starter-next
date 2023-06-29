// import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "@unocss/reset/tailwind.css";
import "@/styles/index.css";
import "@/styles/unocss.css";
import { Provider } from "jotai";
// import AppMode from "@/components/Mode";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
