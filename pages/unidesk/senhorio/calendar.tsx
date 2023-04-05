import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import React from "react";
import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import { UnideskStructure } from "../../../components/unidesk/UnideskStructure";
import Button from "../../../components/utils/Button";
import Input from "../../../components/utils/Input";

/* todo */
const calendar = () => {
  return (
    <UnideskStructure>
      <UnideskStructure.Menu>
        <MenuSenhorio />
      </UnideskStructure.Menu>
      <UnideskStructure.Content>
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
      </UnideskStructure.Content>
    </UnideskStructure>
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
