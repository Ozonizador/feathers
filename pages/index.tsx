import React from "react";
import BlogSection from "../components/home/Blog/Blog";

import HomeSection1 from "../components/home/homeSection1/HomeSection1";
import HomeSection2 from "../components/home/homeSection2/HomeSection2";
import HomeSection3 from "../components/home/homeSection3/HomeSection3";
import HomeSection4 from "../components/home/homeSection4/HomeSection4";
import HomeSection5 from "../components/home/homeSection5/HomeSection5";
import HomeSection6 from "../components/home/homeSection6/HomeSection6";
import HomeSection7 from "../components/home/homeSection7/HomeSection7";

export default function Home() {
  return (
    <div>
      <HomeSection1 />

      <div className="px-5 lg:px-8 xl:mx-32">
        <HomeSection2 />
        <HomeSection3 />
        <HomeSection4 />
        <HomeSection5 />
        <HomeSection6 />
        <HomeSection7 />
        <BlogSection />
        {/* <HomeParceiros /> */}
      </div>
    </div>
  );
}
