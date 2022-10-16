import React from "react";

import { MenuSectionCard } from "../../components/MenuSectionCard";

const UnideskOptions = () => {
  return (
    <section className="container mx-auto my-32 flex flex-col gap-7 lg:flex-row">
      <MenuSectionCard
        topIcon={{ text: "Minha estadia", image: "/images/icon-pg14-1.svg" }}
        options={[
          {
            link: "/unidesk/estudante/stay",
            blocked: false,
            text: "Informações gerais",
          },
          {
            blocked: true,
            text: "Renda",
          },
          {
            blocked: true,
            text: "Reparações",
          },
          {
            blocked: true,
            text: "Despesas",
          },
          {
            blocked: true,
            text: "Informações contratuais",
          },
        ]}
      />

      <MenuSectionCard
        topIcon={{ link: "/unidesk/estudante/favourites", text: "Favoritos", image: "/images/icon-pg14-2.svg" }}
        options={[]}
      />

      <MenuSectionCard
        topIcon={{ text: "Caixa de entrada", image: "/images/icon-pg14-3.svg", link: "/unidesk/inbox" }}
        options={[]}
      />

      <MenuSectionCard
        topIcon={{ link: "/unidesk/notifications", text: "Notificações", image: "/images/icon-pg14-4.svg" }}
        options={[]}
      />
    </section>
  );
};

export default UnideskOptions;
