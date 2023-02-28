import Head from "next/head";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { MainProvider } from "../context/MainProvider";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ToastContainer } from "react-toastify";
import { MenuSenhorioProvider } from "../context/MenuSenhorioAnuncioProvider";
import { useState } from "react";
import { Database } from "../database.types";
import Maintenance from "../components/maintenance/Maintenance";
import { CookiesProvider, useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { CustomFlowbiteTheme, Flowbite } from "flowbite-react";

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

function MyApp({ Component, pageProps }) {
  const [cookies] = useCookies(["test"]);
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>());
  const router = useRouter();

  return (
    <>
      <CookiesProvider>
        {router.asPath == "/joaotest" || process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false" || cookies.test ? (
          <SessionContextProvider supabaseClient={supabaseClient}>
            <MainProvider>
              <MenuSenhorioProvider>
                <Head>
                  <title>Unihosts</title>
                  <meta
                    name="description"
                    content="A UniHosts nasceu da necessidade de organizar e modernizar o processo de gestão de alojamento"
                  ></meta>
                </Head>
                <Navbar />
                <div className="min-h-screen">
                  <Flowbite theme={{ theme }}>
                    <Component {...pageProps} />
                  </Flowbite>
                  <ToastContainer />
                </div>
                <Footer />
              </MenuSenhorioProvider>
            </MainProvider>
          </SessionContextProvider>
        ) : (
          <Maintenance />
        )}
      </CookiesProvider>
    </>
  );
}

export default MyApp;
