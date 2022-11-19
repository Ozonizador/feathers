import React from "react";
import BlogSection from "../components/home/Blog/Blog";
import ExploreCity from "../components/home/ExploreCity/ExploreCity";
import HomeSection1 from "../components/home/homeSection1/HomeSection1";
import HomeSection2 from "../components/home/homeSection2/HomeSection2";
import HomeSection3 from "../components/home/homeSection3/HomeSection3";
import HomeSection5 from "../components/home/homeSection5/HomeSection5";
import TestemunhosComponent from "../components/home/TestemunhosComponent/TestemunhosComponent";
import HomeSection7 from "../components/home/HomeSection7/HomeSection7";

const Home = () => {
  return (
    <div>
      <HomeSection1 />
      <div className="px-5 lg:px-8 xl:mx-32">
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
