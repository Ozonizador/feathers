import React, { useEffect } from "react";
import Image from "next/image";

interface TestemunhoCardProps {
  img: string;
  testimonial: string;
  name: string;
}

export default function TestemunhoCard({ img, testimonial, name }: TestemunhoCardProps) {
  return (
    <article className="test-card mx-auto w-fit max-w-[320px] rounded-xl bg-white px-6 py-4 lg:mb-8 lg:w-full">
      <div className="h-2/3">
        <div>
          <Image height={32} width={32} src="/images/icon-quotest.svg" alt="" className="rounded-lg py-4" />
          <p className="text-[15px] lg:text-[15px]  ">{testimonial}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center xl:mt-10">
        <Image height={50} width={50} src={img} alt="" className="h-[50px] w-[50px] rounded-lg object-cover" />
        <div className="ml-2">
          <p className="text-md mb-0 font-bold">{name}</p>
          <p className="mb-0">Proprietário Unihosts</p>
        </div>
      </div>
    </article>
  );
}
