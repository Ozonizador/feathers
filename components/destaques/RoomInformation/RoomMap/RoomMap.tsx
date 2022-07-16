import React from "react";
import Image from "next/image"

export default function RoomMap() {
    return (
        <section className="my-32">
            <div className="font-bold text-2xl mb-5">Este espaço localiza-se nesta zona</div>

            <div className="w-3/5  rounded-md">

                <Image src="/images/homemap.png" alt="unihosts" height="500" width="1200" className="object-cover"></Image>

            </div>
        </section>
    );
}


