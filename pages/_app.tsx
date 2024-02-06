import Head from "next/head";
import { AppProps } from "next/app";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { MainProvider } from "../context/MainProvider";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { ToastContainer } from "react-toastify";
import { MenuSenhorioProvider } from "../context/MenuSenhorioAnuncioProvider";
import { useState } from "react";
import { Database } from "../database.types";
import Maintenance from "../components/maintenance/Maintenance";
import { CookiesProvider, useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import NextNProgress from "nextjs-progressbar";

import { trpc } from "../utils/trpc";

const theme: CustomFlowbiteTheme = {
  carousel: {
    indicators: {
      active: {
        off: "bg-primary-100 hover:bg-primary-300 dark:bg-slate-300 dark:hover:bg-slate-500",
        on: "bg-primary-500 dark:bg-white",
      },
    },
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  const [cookies] = useCookies(["test"]);
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>({}));
  const router = useRouter();

  return (
    <>
      <CookiesProvider>
        {process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true" ? (
          <Maintenance />
        ) : router.asPath.includes("/superadmin") ? (
          <SessionContextProvider supabaseClient={supabaseClient}>
            <MainProvider>
              <MenuSenhorioProvider>
                <Head>
                  <title>Unihosts</title>
                  <meta
                    name="description"
                    content="A UniHosts nasceu da necessidade de organizar e modernizar o processo de gestão de alojamento"
                  ></meta>
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <div className="min-h-screen">
                  <Flowbite theme={{ theme }}>
                    <NextNProgress />
                    <Component {...pageProps} />
                  </Flowbite>
                  <ToastContainer />
                </div>
              </MenuSenhorioProvider>
            </MainProvider>
          </SessionContextProvider>
        ) : (
          <SessionContextProvider supabaseClient={supabaseClient}>
          <MainProvider>
            <MenuSenhorioProvider>
              <Head>
                <title>Unihosts</title>
                <meta
                  name="description"
                  content="A UniHosts nasceu da necessidade de organizar e modernizar o processo de gestão de alojamento"
                ></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
              </Head>
              <Navbar/>
              <div className="min-h-screen">
                <Flowbite theme={{ theme }}>
                  <NextNProgress />
                  <Component {...pageProps} />
                </Flowbite>
                <ToastContainer />
              </div>
              <Footer/>
            </MenuSenhorioProvider>
          </MainProvider>
        </SessionContextProvider>
        )}
      </CookiesProvider>
    </>
  );
}

export default trpc.withTRPC(appWithTranslation(MyApp));
