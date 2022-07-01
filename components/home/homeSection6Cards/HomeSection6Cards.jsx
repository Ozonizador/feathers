import React from "react";
import Image from "next/image";

export default function HomeSection6Cards({ img, testimonial, name, desc }) {
  return (
    <article className="sec6-article">
      <div>
        <Image
          height={32}
          width={32}
          src="/images/icon-quotest.svg"
          alt=""
          style={{ width: "42px" }}
        />
        <p className="text-xl">{testimonial}</p>
      </div>
      <div>
        <Image height={64} width={64} src={img} alt="" />
        <div>
          <p className="mb-0 text-xl font-bold">{name}</p>
          <p className="mb-0">{desc}</p>
        </div>
      </div>
    </article>
  );
}
