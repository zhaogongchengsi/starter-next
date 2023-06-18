import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import '@/styles/index.css'
import "@/styles/unocss.css";
import '@unocss/reset/tailwind.css'
import { Provider } from "jotai";
import AppMode from "@/components/Mode";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider>
        <AppMode>
          <Component {...pageProps} />
        </AppMode>
      </Provider>
    </SessionProvider>
  );
};

export default App;
