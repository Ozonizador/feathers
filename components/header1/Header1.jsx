import React from "react";
import Profile from "../../Assets/images/icon-profile.svg";


import "./Header1.css";

const Header1 = () => {
  return (
    <header>
      <img src={Profile} alt="Proflile Icon" />
      <p className="fs-400 clr-black-light">
        Perfil &gt; Conta &gt; Informações pessoais
      </p>
    </header>
  );
};

export default Header1;
