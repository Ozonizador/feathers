import Image from "next/image";
import React from "react";

const HomeParceiros = () => {
  return (
    <section>
      <div className="block lg:hidden">
        <div className="container mx-auto w-11/12 ">
          <h2 className="mb-10 mt-28 text-center text-2xl text-primary-500">Os nossos parceiros</h2>
          <div className="-mt-12 flex flex-col">
            <div className="flex w-full flex-row justify-between gap-8 ">
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand1.jpg"
                  alt="brand1"
                  style={{ objectFit: "contain" }}
                ></Image>
              </div>
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand2.jpg"
                  alt="brand2"
                  style={{ objectFit: "contain" }}
                ></Image>
              </div>
            </div>

            <div className="flex w-full flex-row justify-between gap-8 ">
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand3.jpg"
                  alt="brand3"
                  style={{ objectFit: "contain" }}
                ></Image>
              </div>
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand4.jpg"
                  alt="brand4"
                  style={{ objectFit: "contain" }}
                ></Image>
              </div>
              <div className="flex-1">
                <Image
                  layout="responsive"
                  src="/images/brand5.jpg"
                  alt="brand5"
                  style={{ objectFit: "contain" }}
                ></Image>
              </div>
            </div>

            <div className="flex w-full flex-row justify-center text-center">
              <div className="flex-1">
                <Image layout="fixed" src="/images/brand6.jpg" alt="brand6" style={{ objectFit: "contain" }}></Image>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div>
          <h2 className="mb-10 mt-28 text-center text-2xl text-primary-500">Os nossos parceiros</h2>
          <div className="mb-3 mt-2 grid grid-cols-1 gap-12 px-10 pb-5 lg:grid-cols-6">
            <Image layout="responsive" src="/images/brand1.jpg" alt="brand1" style={{ objectFit: "contain" }}></Image>

            <Image layout="responsive" src="/images/brand2.jpg" alt="brand2" style={{ objectFit: "contain" }}></Image>

            <Image layout="responsive" src="/images/brand3.jpg" alt="brand3" style={{ objectFit: "contain" }}></Image>

            <Image layout="responsive" src="/images/brand4.jpg" alt="brand4" style={{ objectFit: "contain" }}></Image>

            <Image layout="responsive" src="/images/brand5.jpg" alt="brand5" style={{ objectFit: "contain" }}></Image>

            <Image layout="responsive" src="/images/brand6.jpg" alt="brand6" style={{ objectFit: "contain" }}></Image>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeParceiros;
