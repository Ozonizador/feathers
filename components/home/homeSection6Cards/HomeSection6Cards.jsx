import React from "react";
import Image from "next/image"

export default function HomeSection6Cards(props) {
    return (
        <article className="sec6-article">
            <div>
                <Image height={32} width={32} src="/images/icon-quotest.svg" alt="" style={{ width: "42px" }} />
                <p className="fs-400 clr-black-main lead-para">
                    {props.testimonial}
                </p>
            </div>
            <div className="profile">
                <Image
                height={32} width={32}
                    src={props.img}
                    alt=""
                    style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "20px",
                    }}
                />
                <div>
                    <p
                        className="fs-400 clr-black-main bold"
                        style={{ marginBottom: "0" }}
                    >
                        {props.name}
                    </p>
                    <p className="fs-200" style={{ marginBottom: "0" }}>
                        {props.desc}
                    </p>
                </div>
            </div>
        </article>
    );
}
