import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import React from "react";
import ReservasSection from "../../../components/reservas/ReservasSection";

const reservas = () => {
  return <ReservasSection />;
};

export default reservas;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
