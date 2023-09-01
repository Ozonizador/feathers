import React from "react";

import FuncionaSection1 from "../components/funciona/FuncionaSection1";
import FuncionaSection2 from "../components/funciona/funcionaSection2/FuncionaSection2";
import FuncionaUniPackages from "../components/funciona/FuncionaSection3/FuncionaUniPackages";
import FuncionaOptions from "../components/funciona/FuncionaOptions/FuncionaOptions";
import FuncionaOndeEstamos from "../components/funciona/FuncionaOndeEstamos/FuncionaOndeEstamos";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <div>
      <FuncionaSection1 />
      <FuncionaSection2 />
      <FuncionaUniPackages />
      <FuncionaOptions />
      <FuncionaOndeEstamos />
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
}
