import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();

  return <Component {...pageProps} key={locale} />;
}

export default appWithTranslation(MyApp);