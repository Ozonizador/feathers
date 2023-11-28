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

const Home = () => {
  return (
    <div className="px-8 xl:pl-20 xl:pr-20">
      <HomeSection1 />
      <div className="lg:px-8 xl:mx-24 xl:px-5">
        <HomeSection2 />
        <HomeSection3 />
        <ExploreCity />
        <HomeSection5 />
        <TestemunhosComponent />
        <HomeSection7 />
        <BlogSection />
        {/* <HomeParceiros /> */}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
