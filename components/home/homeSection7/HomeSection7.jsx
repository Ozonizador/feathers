import React from "react";
import Link from "next/link";

export default function HomeSection7() {
  return (
    <section>
      <div className="container-fluid">
        <div className="ycontainer-sm bg-light section7">
          <div className="sec7-left">
            <h2 className="bold clr-black-extralight">Tem Uma Propriedade?</h2>
            <p className="fs-600 clr-black-light">
              Comece já a anunciar e rentabilize o seu imóvel!
            </p>
            <Link href="/" className="fs-300 btn-contain transition">
              Anunciar
            </Link>
          </div>
          <div className="sec7-right">
            <Link href="/7" className="fs-300 clr-white">
              Quero saber mais...
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
