import Image from "next/image";
import React from "react";

export default function HomeParceiros() {
  return (
    <section>
      <div>
        <div>
          <h2 className="py-5 text-center text-primary-500">Os nossos parceiros</h2>
          <div className="mt-2 mb-3 flex flex-1 justify-around py-5">
            <Image layout="fill" src="/images/brand1.jpg" alt="brand1"></Image>
            <Image layout="fill" src="/images/brand2.jpg" alt="brand2"></Image>
            <Image layout="fill" src="/images/brand3.jpg" alt="brand3"></Image>
            <Image layout="fill" src="/images/brand4.jpg" alt="brand4"></Image>
            <Image layout="fill" src="/images/brand5.jpg" alt="brand5"></Image>
            <Image layout="fill" src="/images/brand6.jpg" alt="brand6"></Image>
          </div>
        </div>
      </div>
    </section>
  );
}
