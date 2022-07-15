import React from "react";

import UnideskHero from "../components/unidesk/Estudante/unideskHero/UnideskHero";
import UnideskOptions from "../components/unidesk/Estudante/unideskOptions/UnideskOptions";
import UnideskSenhorioHero from "../components/unidesk/Senhorio/UnideskSehorioHero/UnideskSenhorioHero";
import UnideskSenhorioOptions from "../components/unidesk/Senhorio//UnideskOptionsSenhorio/UnideskSenhorioOptions";
import { useGetUserType } from "../context/MainProvider";

export default function Unidesk() {
  const { toggleUserType } = useGetUserType();
  return (
    <div>
      {toggleUserType === "SENHORIO" && <UnideskSenhorio />}
      {toggleUserType === "ESTUDANTE" && <UnideskEstudante />}
    </div>
  );
}

const UnideskSenhorio = () => {
  return (
    <div>
      <div>
        <UnideskSenhorioHero />
        <UnideskSenhorioOptions />
      </div>
    </div>
  );
};

const UnideskEstudante = () => {
  return (
    <div>
      <div>
        {/* é igual para o senhorio . pensar onde colocar isto para o senhorio tambem */}
        <UnideskHero title="Estudante" />
        <UnideskOptions />
      </div>
    </div>
  );
};
