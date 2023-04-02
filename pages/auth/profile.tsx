import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import router from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useCurrentUser, useSetProfileInformation } from "../../context/MainProvider";
import useProfileService from "../../hooks/useProfileService";
import { HOME_URL, REGISTER_URL } from "../../models/paths";
import { UserTypes } from "../../models/profile";

const TypeCustomerPage = () => {
  const profile = useCurrentUser();
  const setProfile = useSetProfileInformation();
  const { setTypeUser } = useProfileService();

  const setProfileType = async (type: UserTypes) => {
    if (!profile) return;

    const { data, error } = await setTypeUser(profile.id, type);
    if (error) return toast.error("Erro ea escolher o tipo de utilizador");

    setProfile(data);
    router.push(HOME_URL);
  };

  useEffect(() => {
    if (profile && profile.type) router.push(HOME_URL);
  }, [profile]);
  return (
    <div className="my-10 flex justify-center">
      <div className="my-5 w-11/12 rounded-lg border border-terciary-100 lg:w-5/12">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <div className="p-3 text-center text-primary-500">Iniciar sessão</div>
          <Link href={REGISTER_URL}>
            <a aria-label="register_password" className="border-l border-terciary-100 p-3 text-center">
              Registar
            </a>
          </Link>
        </div>
        <div className="my-5 p-3">
          <div
            className="mx-5 flex cursor-pointer justify-center rounded-md border-2 border-primary-500 py-3 text-primary-500"
            onClick={() => setProfileType("TENANT")}
          >
            Sou estudante
          </div>
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-lg font-bold">ou</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div
            className="mx-5 flex cursor-pointer justify-center rounded-md border-2 border-primary-500 py-3 text-primary-500"
            onClick={() => setProfileType("LANDLORD")}
          >
            Sou senhorio
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeCustomerPage;

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
