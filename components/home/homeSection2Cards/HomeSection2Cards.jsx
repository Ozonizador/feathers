import React from "react";
import Image from "next/image";
// import "./HomeSection2Cards.css";

const HomeSection2Cards = ({ img, heading, text}) => {
    return (
        <article className="ycard">
            <Image src={img} alt="" height={32} width={32}></Image>
            <div>
                <h2 className="fs500 clr-black-light">{heading}</h2>
                <p className="fs-300 clr-black-extralight">{text}</p>
            </div>
        </article>
    );
};

export default HomeSection2Cards;
