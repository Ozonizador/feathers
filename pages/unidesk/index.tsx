import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import React from "react";

import UnideskHero from "../../components/unidesk/Estudante/unideskHero/UnideskHero";
import UnideskOptions from "../../components/unidesk/Estudante/unideskOptions/UnideskOptions";
import UnideskSenhorioOptions from "../../components/unidesk/Senhorio/UnideskOptionsSenhorio/UnideskSenhorioOptions";
import { useGetUserType } from "../../context/MainProvider";

export default function Unidesk() {
  const { toggleUserType } = useGetUserType();
  return (
    <div>
      {toggleUserType === "LANDLORD" && <UnideskSenhorio />}
      {toggleUserType === "TENANT" && <UnideskEstudante />}
    </div>
  );
}

const UnideskSenhorio = () => {
  return (
    <div>
      <div>
        <UnideskHero title="Senhorio" />
        <UnideskSenhorioOptions />
      </div>
    </div>
  );
};

const UnideskEstudante = () => {
  return (
    <div>
      <div>
        <UnideskHero title="Estudante" />
        <UnideskOptions />
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
