import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import React from "react";
import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import Button from "../../../components/utils/Button";
import Input from "../../../components/utils/Input";

const calendar = () => {
  return (
    <div className="container mx-auto my-20 w-11/12 rounded-2xl border border-terciary-700 bg-terciary-300  pl-0 lg:container lg:my-20 lg:w-full  lg:px-0 ">
      <div className="flex flex-col lg:flex-row">
        <div className="p-5 lg:border-r lg:p-12">
          <MenuSenhorio />
        </div>

        <div className="mt-10 w-full flex-col lg:w-3/4">
          <div className="ml-6 w-11/12 lg:ml-10 lg:w-2/5">
            <div className=" mb-6  flex flex-col justify-between lg:flex-row lg:items-center lg:align-middle">
              <label className="mt-2 mb-2 block text-base lg:mb-0">Estadia mínima</label>
              <select className="h-12 w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-3 lg:w-60 ">
                <option>Idioma</option>
                <option>Casa</option>
                <option>Apartamento</option>
              </select>
            </div>

            <div className=" mb-6  flex flex-col justify-between lg:flex-row lg:items-center lg:align-middle">
              <label className="mt-2 mb-2 block text-base lg:mb-0">Tempo de antecedência</label>
              <select className="h-12 w-full rounded-md border border-solid border-terciary-500 bg-white py-2 px-3 lg:w-60 ">
                <option>Idioma</option>
                <option>Casa</option>
                <option>Apartamento</option>
              </select>
            </div>

            <div className="pb-4">
              <Button onClick={() => {}} type="button">
                Guardar alterações
              </Button>
            </div>

            <div className="mt-10 mb-8 text-2xl font-bold">Descontos (opcional)</div>

            <div>
              <div className=" mb-3  flex flex-col justify-between lg:flex-row lg:items-center lg:align-middle">
                <label className="mt-2 mb-2 block text-base lg:mb-0">Tempo de antecedência</label>
                <div className="  w-full lg:w-60">
                  <Input label={""} labelText="" customCss="percent" onChange={() => {}} value="" />
                </div>
              </div>

              <div className="mb-6 flex flex-col justify-between lg:flex-row lg:items-center lg:align-middle">
                <label className="mt-2 mb-2 block text-base lg:mb-0">Desconto semestral</label>
                <div className="  w-full lg:w-60">
                  <Input label={""} value="" onChange={() => {}} labelText="" customCss="percent" />
                </div>
              </div>
              <div className="mb-14 pb-4">
                <Button onClick={() => {}} type="button">
                  Guardar alterações
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default calendar;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
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
    },
  };
};
