import React from "react";
import Image from "next/image";
import HomeInputFeild from "../homeInputFeild/HomeInputFeild";

export default function HomeSection1() {
  return (
    <section>
      <div className="flex justify-center  bg-[url('/images//furniture5.jpg')] bg-cover py-52 ">
        <div className="flex flex-col px-10 align-middle md:container">
          <h1 className="text-6xl  font-bold leading-snug text-white">
            {" "}
            A tua{" "}
            <Image
              className="display: top-40;  relative  left-0 inline-block"
              src="/images/icon-home.svg"
              alt=""
              height={64}
              width={64}
            />
            à distancia de um
            <br />
            click!
          </h1>
          <div className="flex flex-col lg:flex-row">
            <HomeInputFeild />
          </div>
        </div>
      </div>
    </section>
  );
}
