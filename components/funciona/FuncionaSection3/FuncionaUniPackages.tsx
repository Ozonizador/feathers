import React from "react";

import FuncionaSection3Card from "./FuncionaSection3Card";

const FuncionaUniPackages = () => {
  return (
    <section className="container-fluid bg-terciary-300 pt-10 pb-1">
      <div className="container mx-auto mt-14 text-center">
        <p className="mb-10 text-primary-500 underline underline-offset-1">
          Não tem tempo ou não está perto da sua propriedade? A UniHosts tem a solução!
        </p>
        <h1 className="text-5xl font-bold lg:text-6xl">Conheça Os Nossos Unipackages</h1>

        <div className="mt-16 mb-5 grid grid-cols-1 flex-row gap-10 lg:grid-cols-3">
          <FuncionaSection3Card
            img="/images/image1.png"
            heading="Nós somos o senhorio por si!"
            text="De forma a libertar as preocupações durante o ano letivo, asseguramos o acompanhamento personalizado aos estudantes, de modo a garantir a manutenção da casa e respetiva harmonia entre os inquilinos."
          />

          <FuncionaSection3Card
            img="/images/image2.png"
            heading="Pagamentos seguros"
            text="Os pagamentos das rendas dos inquilinos são feitos de forma segura e transparente. Temos também uma proteção contra saídas antecipadas do hóspede para que não haja imprevistos!"
          />

          <FuncionaSection3Card
            img="/images/image3.png"
            heading="Acesso total à UniDesk"
            text="Através da nossa plataforma poderá verificar os hospedes atuais, respetivas informações contratuais, todas as transações, eventuais reparações existentes e adicionar despesas se aplicável"
          />
        </div>
      </div>
    </section>
  );
};

export default FuncionaUniPackages;
