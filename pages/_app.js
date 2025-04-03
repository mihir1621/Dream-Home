import "@/styles/globals.css";
import Head from "next/head";
import OurServices from "@/components/OurServices";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>
      <div className="relative min-h-screen flex flex-col">
        <Component {...pageProps} />
        <div className="mt-10">
          <OurServices />
        </div>
      </div>
    </>
  );
}
