import Head from "next/head";
import React from "react";
import Faqs from "../components/faqs/Faqs";

import UnideskHero from "../components/unidesk/unideskHero/UnideskHero";

export default function Unidesk() {
  return (
    <div>
      <div>
        {/* é igual para o senhorio . pensar onde colocar isto para o senhorio tambem */}
        <UnideskHero title="Estudante" />
      </div>
    </div>
  );
}
