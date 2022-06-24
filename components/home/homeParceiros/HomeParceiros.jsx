import Image from "next/image";
import React from "react";

export default function HomeParceiros() {
  return (
    <section>
      <div>
        <div className="px-5">
          <h2 className="py-5 text-center text-primary-500">Os nossos parceiros</h2>
          <div className="mt-2 mb-3 grid grid-cols-1 gap-8 px-5 pb-5 lg:grid-cols-6">
            <Image
              layout="responsive"
              src="/images/brand1.jpg"
              alt="brand1"
              objectFit="contain"
              height="50%"
              width="50%"
            ></Image>

            <Image
              layout="responsive"
              src="/images/brand2.jpg"
              alt="brand2"
              objectFit="contain"
              height="50%"
              width="50%"
            ></Image>

            <Image
              layout="responsive"
              src="/images/brand3.jpg"
              alt="brand3"
              objectFit="contain"
              height="50%"
              width="50%"
            ></Image>

            <Image
              layout="responsive"
              src="/images/brand4.jpg"
              alt="brand4"
              objectFit="contain"
              height="50%"
              width="50%"
            ></Image>

            <Image
              layout="responsive"
              src="/images/brand5.jpg"
              alt="brand5"
              objectFit="contain"
              height="50%"
              width="50%"
            ></Image>

            <Image
              layout="responsive"
              src="/images/brand6.jpg"
              alt="brand6"
              objectFit="contain"
              height="50%"
              width="50%"
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
}
