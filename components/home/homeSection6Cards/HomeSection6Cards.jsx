import React from "react";
import Image from "next/image";

export default function HomeSection6Cards({ img, testimonial, name, desc }) {
  return (
    <article className="  bg-white rounded-xl lg:h-80 p-4 lg:w-96 lg:mb-8">
      {/* <div>
        <Image height={32} width={32} src="/images/icon-quotest.svg" alt="" style={{ width: "42px" }} className="py-4" />
        <p className="text-xl">{testimonial}</p>
      </div>
      <div className="mt-10">
        <Image height={64} width={64} src={img} alt="" />
        <div>
          <p className="mb-0 text-xl font-bold">{name}</p>
          <p className="mb-0">{desc}</p>
        </div>
      </div> */}

      <div className="">
        <div>
          <Image height={32} width={32} src="/images/icon-quotest.svg" alt="" style={{ width: "42px" }} className="py-4" />

          <p className="text-sm">{testimonial}</p>

        </div>
      </div>
      <div className="mt-7 flex">
        <Image height={64} width={64} src={img} alt="" />
        <div className="ml-2">
          <p className="mb-0 text-xl font-bold">{name}</p>
          <p className="mb-0">{desc}</p>
        </div>
      </div>
    </article>
  );
}
