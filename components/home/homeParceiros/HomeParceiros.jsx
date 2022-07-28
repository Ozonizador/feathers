import Image from "next/image";
import React from "react";

export default function HomeParceiros() {
  return (
    <section>
      <div className="block lg:hidden">
        <div className="container mx-auto w-11/12 ">
          <h2 className="mt-28 mb-10 text-center text-primary-500 text-2xl">Os nossos parceiros</h2>
          <div className="flex flex-col -mt-12">
            <div className="flex flex-row justify-between w-full gap-8 ">
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand1.jpg"
                  alt="brand1"
                  objectFit="contain"
                  height="100%"
                  width="100%"
                ></Image>
              </div>
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand2.jpg"
                  alt="brand2"
                  objectFit="contain"
                  height="100%"
                  width="100%"
                ></Image>
              </div>
            </div>


            <div className="flex flex-row justify-between w-full gap-8 ">
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand3.jpg"
                  alt="brand3"
                  objectFit="contain"
                  height="50%"
                  width="50%"
                ></Image>
              </div>
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand4.jpg"
                  alt="brand4"
                  objectFit="contain"
                  height="50%"
                  width="50%"
                ></Image>
              </div>
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand5.jpg"
                  alt="brand5"
                  objectFit="contain"
                  height="50%"
                  width="50%"
                ></Image>
              </div>
            </div>

            <div className="flex flex-row justify-center w-full text-center">
              <div className="flex-1">
                <Image
                  layout="fixed"
                  src="/images/brand6.jpg"
                  alt="brand6"
                  objectFit="contain"
                  height="100%"
                  width="100%"
                ></Image>
              </div>

            </div>
          </div>
        </div>
      </div>




      <div className="hidden lg:block">
        <div className="container mx-auto ">
          <h2 className="mt-28 mb-10 text-center text-primary-500 text-2xl">Os nossos parceiros</h2>
          <div className="mt-2 mb-3 grid grid-cols-1 gap-12 px-10 pb-5 lg:grid-cols-6">
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
    </section >
  );
}
