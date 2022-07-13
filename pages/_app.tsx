import Head from "next/head";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { UserProvider, useUser } from "@supabase/auth-helpers-react";

import "../styles/globals.css";
import { MainProvider } from "../context/MainProvider";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider supabaseClient={supabaseClient}>
        <MainProvider>
          <Head>
            <title>Unihosts</title>
          </Head>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </MainProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
