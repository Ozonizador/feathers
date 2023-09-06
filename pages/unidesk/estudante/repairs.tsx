import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import React from "react";

import InfoPessoais from "../../../components/conta/InfoPessoais";

export default function Home() {
  return <></>;
  // <div>
  //   <div>
  //     <InfoPessoais />
  //   </div>
  // </div>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
    },
  };
};
