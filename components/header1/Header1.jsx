import React from "react";
import Image from "next/image"


const Header1 = () => {
  return (
    <header>
      <Image src="/images/icon-profile.svg" alt="Proflile Icon" />
      <p className="fs-400 clr-black-light">
        Perfil &gt; Conta &gt; Informações pessoais
      </p>
    </header>
  );
};

export default Header1;
