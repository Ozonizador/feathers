import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Input from "../../components/utils/Input";
import { HOME_URL, REGISTER_URL } from "../../models/paths";
import useUserService from "../../hooks/userService";
import Button from "../../components/utils/Button";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

const Recover = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { recoverPasswordViaEmail } = useUserService();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const recoverPassword = async () => {
    setLoading(true);
    const { data, error } = await recoverPasswordViaEmail(email);
    setLoading(false);
    if (!error) {
      router.push(HOME_URL);
    }
  };

  return (
    <div className="my-10 flex justify-center">
      <div className="my-5 w-6/12 rounded-lg border border-terciary-100">
        <div className="p-3">
          <div className="font-bold">{t("common:recover_title")}</div>
          <div className="mt-3">
            <div className="mt-2">
              <Input
                customCss="w-full rounded-sm border border-terciary-100 py-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </div>
          </div>

          <div className="my-5">
            <Button
              type="button"
              onClick={() => {
                recoverPassword;
                alert("Por favor verifique o seu email")
              }}
              loading={loading}
            >
              {t("recover", { name: "password" })}
            </Button>
          </div>
        </div>
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

  return {
    props: {
      initialSession: session,
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};

export default Recover;
