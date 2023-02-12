import React from "react";
import Image from "next/image";

interface TestemunhoCardProps {
  img: string;
  testimonial: string;
  name: string;
}

export default function TestemunhoCard({ img, testimonial, name, desc }: TestemunhoCardProps) {
  return (
    <article className="mx-auto w-11/12 rounded-xl bg-white p-4 lg:mb-8 lg:h-80 lg:w-full">
      <div>
        <div>
          <Image height={32} width={32} src="/images/icon-quotest.svg" alt="" className="rounded-lg py-4" />
          <p className="text-sm">{testimonial}</p>
        </div>
      </div>
      <div className="mt-7 flex">
        <Image height={64} width={64} src={img} alt="" className="rounded-lg" />
        <div className="ml-2">
          <p className="mb-0 text-xl font-bold">{name}</p>
          <p className="mb-0">Proprietário Unihosts</p>
        </div>
      </div>
    </article>
  );
}
