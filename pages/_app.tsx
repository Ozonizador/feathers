import Head from "next/head";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { MainProvider } from "../context/MainProvider";
import { createBrowserSupabaseClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ToastContainer } from "react-toastify";
import { MenuSenhorioProvider } from "../context/MenuSenhorioAnuncioProvider";
import { useState } from "react";
import { Database } from "../database.types";

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>());

  return (
    <>
      <SessionContextProvider supabaseClient={supabaseClient}>
        <MainProvider>
          <MenuSenhorioProvider>
            <Head>
              <title>Unihosts</title>
            </Head>
            <Navbar />
            <div className="min-h-screen">
              <Component {...pageProps} />
              <ToastContainer />
            </div>
            <Footer />
          </MenuSenhorioProvider>
        </MainProvider>
      </SessionContextProvider>
    </>
  );
}

export default MyApp;
