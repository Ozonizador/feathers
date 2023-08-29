import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import React from "react";

import UnideskHero from "../../components/unidesk/Estudante/unideskHero/UnideskHero";
import UnideskOptions from "../../components/unidesk/Estudante/unideskOptions/UnideskOptions";
import UnideskSenhorioOptions from "../../components/unidesk/Senhorio/UnideskOptionsSenhorio/UnideskSenhorioOptions";
import { useGetUserType } from "../../context/MainProvider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Unidesk() {
  const { userAppMode } = useGetUserType();
  return (
    <div>
      {userAppMode === "LANDLORD" && <UnideskSenhorio />}
      {userAppMode === "TENANT" && <UnideskEstudante />}
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
      ...(await serverSideTranslations(locale ?? "pt", ["navbar", "footer"])),
    },
  };
};
