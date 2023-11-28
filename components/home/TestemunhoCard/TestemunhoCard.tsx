import React from "react";
import Image from "next/image";

interface TestemunhoCardProps {
  img: string;
  testimonial: string;
  name: string;
}

export default function TestemunhoCard({ img, testimonial, name }: TestemunhoCardProps) {
  return (
    <article className="mx-auto w-fit max-w-[300px] rounded-xl bg-white px-4 py-2 lg:mb-8 lg:h-80 lg:w-full">
      <div className="h-2/3">
        <div>
          <Image height={32} width={32} src="/images/icon-quotest.svg" alt="" className="rounded-lg py-4" />
          <p className="text-sm">{testimonial}</p>
        </div>
      </div>
      <div className="mt-6 flex">
        <Image height={64} width={64} src={img} alt="" className="h-20 w-16 rounded-lg" />
        <div className="ml-2">
          <p className="mb-0 text-xl font-bold">{name}</p>
          <p className="mb-0">Proprietário Unihosts</p>
        </div>
      </div>
    </article>
  );
}
