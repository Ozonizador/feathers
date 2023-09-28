import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import router from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useCurrentUser, useSetProfileInformation, useToggleAppUserMode } from "../../context/MainProvider";
import useProfileService from "../../hooks/useProfileService";
import { HOME_URL, REGISTER_URL } from "../../models/paths";
import { Profile, UserTypes } from "../../models/profile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const TypeCustomerPage = () => {
  const { t } = useTranslation();
  const profile = useCurrentUser();
  const toggleUserTypeContext = useToggleAppUserMode();
  const setProfile = useSetProfileInformation();
  const { setTypeUser } = useProfileService();

  const setProfileType = async (type: UserTypes) => {
    if (!profile) return;
    
    // Linha abaixo apresenta erro mas só funciona assim (erro de ts)
    // @ts-ignore
    const { data, error } = await setTypeUser(profile[0].id, type);
    if (error) return toast.error(t("messages:errors.picking_type_user"));

    setProfile(data as unknown as Profile);
    toggleUserTypeContext(type);
    router.push(HOME_URL);
  };

  useEffect(() => {
    if (profile && profile.type) {
      toggleUserTypeContext(profile.type);
      router.push(HOME_URL);
    }
  }, [profile]);
  return (
    <div className="my-10 flex justify-center">
      <div className="my-5 w-11/12 rounded-lg border border-terciary-100 lg:w-5/12">
        <div className="grid grid-cols-2 justify-around border-b border-terciary-100">
          <div className="p-3 text-center text-primary-500">{t("login")}</div>
          <Link
            href={REGISTER_URL}
            aria-label="register_password"
            className="border-l border-terciary-100 p-3 text-center"
          >
            {t("register")}
          </Link>
        </div>
        <div className="my-5 p-3">
          <div
            className="mx-5 flex cursor-pointer justify-center rounded-md border-2 border-primary-500 py-3 text-primary-500"
            onClick={() => setProfileType("TENANT")}
          >
            {t("admin:im_student")}
          </div>
          <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 flex-shrink text-lg font-bold">{t("or")}</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div
            className="mx-5 flex cursor-pointer justify-center rounded-md border-2 border-primary-500 py-3 text-primary-500"
            onClick={() => setProfileType("LANDLORD")}
          >
            {t("admin:im_landlord")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeCustomerPage;

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
