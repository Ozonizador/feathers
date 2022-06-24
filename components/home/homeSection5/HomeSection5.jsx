import React from "react";
import HomeSection5Cards from "../homeSection5Cards/HomeSection5Cards";
import Link from "next/link";

import { CgHome } from "react-icons/cg";

export default function HomeSection5() {
  return (
    <section>
      <div className="container-fluid">
        <div className="ycontainer-sm section5">
          <h2 className="bold">Como Funciona?</h2>
          <div className="sec5-card-container">
            <HomeSection5Cards
              img="/images/homeSection2-3.svg"
              heading="Pesquisa"
              text="De forma intuitiva defina a localização, datas e características que pretende para um estadia ideal!"
            />
            <HomeSection5Cards
              img="/images/homeSection5-2.svg"
              heading="Reserva"
              text="Assim que o pedido for confirmado irás agilizar e esclarecer com o senhorio a data de mudança e entrega das chaves."
            />
            <HomeSection5Cards
              img="/images/homeSection5-3.svg"
              heading="Mudança"
              text="O primeiro pagamento só será transferido após verificares a casa, estamos aqui para qualquer questão. Boa estadia!"
            />
          </div>
          <Link href="/4_5" className="btn-contain btn-shadow fs-300 clr-white transition">
            <a>
              Encontrar <CgHome /> um...
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
