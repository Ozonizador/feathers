import Head from "next/head";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { UserProvider } from "@supabase/auth-helpers-react";

import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { MainProvider } from "../context/MainProvider";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { ToastContainer } from "react-toastify";
import { MenuSenhorioProvider } from "../context/MenuSenhorioAnuncioProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider autoRefreshToken={true} supabaseClient={supabaseClient}>
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
      </UserProvider>
    </>
  );
}

export default MyApp;
