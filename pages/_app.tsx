import Head from "next/head";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import "../styles/globals.css";
// import 'tw-elements';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider supabaseClient={supabaseClient}>
        <Head>
          <title>Unihosts</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
    </>
  );
}

export default MyApp;
