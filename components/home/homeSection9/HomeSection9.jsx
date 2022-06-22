import Image from "next/image";
import React from "react";
// import "./HomeSection9.css";

export default function HomeSection9() {
    return (
        <section>
            <div className="container-fluid">
                <div className="ycontainer-sm section9">
                    <h2 className="fs-600 clr-acc">Os nossos parceiros</h2>
                    <div className="brands">
                        <Image height={32} width={32} src="/images/brand1.jpg" alt="brand1"></Image>

                        <Image height={32} width={32} src="/images/brand2.jpg" alt="brand2"></Image>

                        <Image height={32} width={32} src="/images/brand3.jpg" alt="brand3"></Image>

                        <Image height={32} width={32} src="/images/brand4.jpg" alt="brand4"></Image>
                        <div className="emptydiv2"></div>
                        <Image height={32} width={32} src="/images/brand5.jpg" alt="brand5"></Image>
                        <div className="emptydiv1"></div>
                        <div className="emptydiv1"></div>
                        <Image height={32} width={32} src="/images/brand6.jpg" alt="brand6"></Image>
                    </div>
                </div>
            </div>
        </section>
    );
}
