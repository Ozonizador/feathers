import React from "react";
import BlogSection from "../components/home/Blog/Blog";
import ExploreCity from "../components/home/ExploreCity/ExploreCity";
import HomeSection1 from "../components/home/homeSection1/HomeSection1";
import HomeSection2 from "../components/home/homeSection2/HomeSection2";
import HomeSection3 from "../components/home/homeSection3/HomeSection3";
import HomeSection5 from "../components/home/homeSection5/HomeSection5";
import TestemunhosComponent from "../components/home/TestemunhosComponent/TestemunhosComponent";
import HomeSection7 from "../components/home/HomeSection7/HomeSection7";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";
import { GENERAL_ADMIN_URL } from "../models/paths";

const Home = () => {
  return (
    <div className="">
      <HomeSection1 />
      <div className="mx-6 lg:mx-0 lg:px-8 xl:mx-32 xl:px-5">
        <HomeSection2 />
        <HomeSection3 />
      </div>
      <div className="bg-terciary-300">
        <div className="mx-6 lg:mx-0 lg:p-8 xl:mx-32 xl:px-5">
          <ExploreCity />
        </div>
      </div>
      <div className="mx-6 lg:mx-0 lg:px-8 xl:mx-32 xl:px-5">
        <HomeSection5 />
      </div>
      <TestemunhosComponent />
      <div className="mx-6 lg:mx-0 lg:px-8 xl:mx-32 xl:px-5">
        <HomeSection7 />
        <BlogSection />
        {/* <HomeParceiros /> */}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const router = useRouter();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { data, error } = await supabase.from("profiles").select().eq("id", session.user.id).single();
    if (data && (!data.name || !data.surname || !data.nationality || !data.town)) {
      router.push(GENERAL_ADMIN_URL);
    } else if (data && !data[0].email) {
      await supabase.from("profiles").update({email: session.user.email}).eq("id", session.user.id);
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
