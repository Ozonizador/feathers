import Head from "next/head";
import React from "react";


import UnideskHero from "../components/unidesk/Estudante/unideskHero/UnideskHero"
import UnideskOptions from "../components/unidesk/Estudante/unideskOptions/UnideskOptions";

export default function Unidesk() {
  return (
    <div>
      <div>
        {/* é igual para o senhorio . pensar onde colocar isto para o senhorio tambem */}
        <UnideskHero title="Estudante" />
        <UnideskOptions />

      </div>
    </div>
  );
}

