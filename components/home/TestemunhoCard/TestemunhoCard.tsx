import React from "react";
import Image from "next/image";

interface TestemunhoCardProps {
  img: string;
  testimonial: string;
  name: string;
  desc: string;
}

export default function TestemunhoCard({ img, testimonial, name, desc }: TestemunhoCardProps) {
  return (
    <article className="rounded-xl bg-white p-4 lg:mb-8 lg:h-80 lg:w-96">
      <div>
        <div>
          <Image
            height={32}
            width={32}
            src="/images/icon-quotest.svg"
            alt=""
            style={{ width: "42px" }}
            className="py-4"
          />

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
