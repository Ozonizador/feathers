import React from "react";
import Image from "next/image";

export default function HomeSection5Cards(props) {
    return (
        <article className="sec5-article">
            <Image src={props.img} alt="" height={32} width={32} />
            <h3 className="clr-black-light fs-700">{props.heading}</h3>
            <p className="fs-600" style={{ color: "#7D8A97" }}>
                {props.text}
            </p>
        </article>
    );
}
