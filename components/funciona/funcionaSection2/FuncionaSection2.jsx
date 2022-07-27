import React from "react";

import Link from "next/link";
import FuncionaSection2Card from "../funcionaSection2/FuncionaSection2Card";

const FuncionaSection2 = () => {
  return (
    <section className="container my-20  lg:mx-auto">
      <div className="container mx-auto flex flex-row justify-between  ">
        <FuncionaSection2Card
          img="/images/img1.png"
          icon="/images/img11.png"
          heading="Criar o anúncio"
          text="Elabore o seu anúncio o mais completo possível - ter uma descrição simples e conciso é importante. Defina as duas regras e detalhes da propriedade para que os inquilinos saibam exatamente o que esperar."
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/22.png"
          icon="/images/2.png"
          heading="Defina as condições de arrendamento"
          text="Decidir se a sua propriedade possui ou não despesas incluídas (se sim, quais delas) é uma das coisas que os inquilinos mais perguntam - antecipe
                    esse tipo de perguntas e coloque o valor conforme o que pretende. Ainda nas condições estabeleça a sua política de cancelamento - Azares
                    acontecem! Podem escolher a sua política de entre as 3 que temos disponíveis. Esta informação será exibida no seu anúncio."
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/33.png"
          icon="/images/3.png"
          heading="Adicione fotografias da propriedade"
          text="Está comprovado que anúncios com boas fotos têm umma maior visibilidade. Procure fazer fotos de todos os cantos, áreas, bem como
                    todas as divisões. As fotografias vão ser a porta de entrada da sua casa!"
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/44.png"
          icon="/images/4.png"
          heading="Receba pedidos de reserva"
          text="Sempre que houver alguém interessado este enviará um pedido de reserva com aquilo que procura. Estes pedidos de reserva podem ser aceites ou recusados até 24h, a partir deste tempo já não é possível aceitar a reserva."
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/55.png"
          icon="/images/5.png"
          heading="Reserva confirmada"
          text="Após confirmar a reserva procure dar o máximo de informações e indicações ao seu novo inquilino."
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/66.png"
          icon="/images/6.png"
          heading="Receba os seus novos inquilinos"
          text="É importante que receba as pessoas para que se possam conhecer e esclarecer eventuais dúvidas. Assinar contratos e preparar os restantes meses pode também ser um dos tópicos."
        />
      </div>

      <div className="container mx-auto flex flex-row  justify-between  ">
        <FuncionaSection2Card
          img="/images/77.png"
          icon="/images/7.png"
          heading="Receba o seu primeiro pagamento"
          text="Quando a reserva é confirmada debitamos ao inquilino a primeira renda e guardamos este valor até 24h após a entrada. Após garantir que tudo está correto, o dinheiro é libertado para o seu cartão, que deve adicionar nos métodos de pagamento."
        />
      </div>
      <Link href="" className="mb-24">
        <a className="mx-auto   flex w-11/12 justify-center rounded-md bg-primary-500 py-3 text-white duration-200 ease-in  hover:text-white hover:drop-shadow-xl lg:w-52">
          Criar o anúncio
        </a>
      </Link>
    </section>
  );
};

export default FuncionaSection2;
