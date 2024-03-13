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
import { isString } from "lodash";

const Recover = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { updateUserPassword } = useUserService();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const recoverPassword = async () => {
    if (password == password2) {
      setLoading(true);
      const {error } = await updateUserPassword(password);
      setLoading(false);
      if (!error) {
        setTimeout(() => {
          router.push(HOME_URL);
        }, 2000);
      }
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <Input
                customCss="w-full rounded-sm border border-terciary-100 py-1"
                value={password}
                onChange={(e) => setPassword2(e.target.value)}
              ></Input>
            </div>
          </div>

          <div className="my-5">
            <Button
              type="button"
              onClick={async () => {
                await recoverPassword();
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
  const query = ctx.query;

  const code = query.code;
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  if (isString(code)) {
    const {
      data: { session },
    } = await supabase.auth.exchangeCodeForSession(code as string);
  
    return {
      props: {
        initialSession: session,
        user: session?.user,
        ...(await serverSideTranslations(locale ?? "pt")),
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    }
  }
};

export default Recover;
