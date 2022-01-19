import "@/styles/globals.css";
import type { AppProps } from "next/app";

const Noop = (props: any) => {
  return props?.children;
};

function MyApp({ Component, pageProps }: AppProps) {
  const Layout = Component?.Layout ?? Noop;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
