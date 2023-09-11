// 404.js
import Link from "next/link";
import { HOME_URL } from "../models/paths";
import { GetServerSidePropsContext, GetStaticPathsContext, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function FourOhFour() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="mx-auto flex justify-center p-28">
      <div className="flex flex-col gap-10">
        <h1>{t("page_not_found")}</h1>
        <Link href={HOME_URL} locale={router.locale} className="mx-auto text-primary-500">
          {t("go_back_home")}
        </Link>
      </div>
    </div>
  );
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  const locale = ctx.locale;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "pt")),
    },
  };
};
