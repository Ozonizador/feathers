import { withPageAuth } from "@supabase/auth-helpers-nextjs";
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
export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
