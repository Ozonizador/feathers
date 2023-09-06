import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import React from "react";
import ReservasSection from "../../../components/reservas/ReservasSection";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const reservas = () => {
  return <ReservasSection />;
};

export default reservas;

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
