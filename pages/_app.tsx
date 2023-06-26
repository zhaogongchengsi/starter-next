// import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "@unocss/reset/tailwind.css";
import "@/styles/index.css";
import "@/styles/unocss.css";
import { Provider } from "jotai";
import AppMode from "@/components/Mode";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <AppMode>
        <Component {...pageProps} />
      </AppMode>
    </Provider>
  );
};

export default App;
