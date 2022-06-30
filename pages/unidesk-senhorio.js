import Head from "next/head";
import React from "react";

import UnideskSenhorioHero from "../components/unidesk/Senhorio/UnideskSehorioHero/UnideskSenhorioHero"
import UnideskSenhorioOptions from "../components/unidesk/Senhorio//UnideskOptionsSenhorio/UnideskSenhorioOptions"

export default function Unidesk() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <UnideskSenhorioHero />
        <UnideskSenhorioOptions />
      </div>
    </div>
  );
}
