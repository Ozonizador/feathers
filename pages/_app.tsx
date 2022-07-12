import Head from "next/head";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import "../styles/globals.css";
import { MainProvider } from "../context/MainProvider";

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
