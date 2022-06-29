import Head from "next/head";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Head>
          <title>Unihosts</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default MyApp;
