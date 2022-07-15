import React, { useEffect } from "react";

import HomeSection1 from "../components/home/homeSection1/HomeSection1";
import HomeSection2 from "../components/home/homeSection2/HomeSection2";
import HomeSection3 from "../components/home/homeSection3/HomeSection3";
import HomeSection4 from "../components/home/homeSection4/HomeSection4";
import HomeSection5 from "../components/home/homeSection5/HomeSection5";
import HomeSection6 from "../components/home/homeSection6/HomeSection6";
import HomeSection7 from "../components/home/homeSection7/HomeSection7";
import Blog from "../components/home/Blog/Blog";
import HomeParceiros from "../components/home/homeParceiros/HomeParceiros";
import { useUser } from "@supabase/auth-helpers-react";
import { checkProfileAndCreate } from "../services/profileService";

export default function Home() {
  const { user } = useUser();

  const checkUserProfile = async (userID) => {
    // check if profile exists else create
    const { data, error } = await checkProfileAndCreate(userID);
  };

  useEffect(() => {
    if (user) {
      checkUserProfile(user.id);
    }
  }, [user]);

  return (
    <div>
      <div>
        <HomeSection1 />
        <HomeSection2 />
        <HomeSection3 />
        <HomeSection4 />
        <HomeSection5 />
        <HomeSection6 />
        <HomeSection7 />
        <Blog />
        <HomeParceiros />
      </div>
    </div>
  );
}