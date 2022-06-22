import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";

export default function HomeSection3() {
    return (
        <section>
            <div className="container-fluid ">
                <div className="ycontainer-sm section3">
                    <header className="sec3-header">
                        <h2 className="fs-900 clr-black-main">
                            Os quartos em destaque na tua área
                        </h2>
                        <Link
                            href="/4_5"
                            className="button transition btn-shadow fs-200 clr-black-light"
                        >
                            <a>
                            Ver Mais{" "}
                            <div className="arrow">
                                <BsArrowRightShort className="clr-acc" />
                            </div>
                            </a>
                        </Link>
                    </header>
                    <div className="sec3-card-container">
                        <article className="transition uplift sec3-article sec3-card1">
                            <h2 className="fs-500 clr-white">Quarto Privado</h2>
                            <p className="price fs-700 clr-white bold">
                                &euro;320
                            </p>
                        </article>
                        <article className="transition uplift sec3-article sec3-card2">
                            <h2 className="fs-500 clr-white">Quarto Privado</h2>
                            <p className="price fs-700 clr-white bold">
                                &euro;320
                            </p>
                        </article>
                        <article className="transition uplift sec3-article sec3-card3">
                            <h2 className="fs-500 clr-white">Quarto Privado</h2>
                            <p className="price fs-700 clr-white bold">
                                &euro;320
                            </p>
                        </article>
                        <article className="transition uplift sec3-article sec3-card4">
                            <h2 className="fs-500 clr-white">Quarto Privado</h2>
                            <p className="price fs-700 clr-white bold">
                                &euro;320
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}
