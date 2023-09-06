import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import React from "react";

import UnideskHero from "../../components/unidesk/Estudante/unideskHero/UnideskHero";
import UnideskOptions from "../../components/unidesk/Estudante/unideskOptions/UnideskOptions";
import UnideskSenhorioOptions from "../../components/unidesk/Senhorio/UnideskOptionsSenhorio/UnideskSenhorioOptions";
import { useGetUserType } from "../../context/MainProvider";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

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
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <UnideskHero title={t("landlord", { count: 1 })} />
        <UnideskSenhorioOptions />
      </div>
    </div>
  );
};

const UnideskEstudante = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <UnideskHero title={t("student", { count: 1 })} />
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
        destination: `auth/login`,
        permanent: false,
        locale: locale,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
