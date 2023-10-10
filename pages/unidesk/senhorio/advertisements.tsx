/* PAGINA 51 DO XD */

import AnuncioCard from "../../../components/senhorioanuncios/card/AnuncioCard";
import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import { useCallback, useEffect, useState } from "react";
import { Advertisement } from "../../../models/advertisement";
import { useCurrentUser } from "../../../context/MainProvider";
import useAdvertisementService from "../../../hooks/advertisementService";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";

// icons
import IconAnuncios from "../../../public/images/icons8_laptop_computer.svg";
import { UnideskStructure } from "../../../components/unidesk/UnideskStructure";
import { UNIDESK_URL } from "../../../models/paths";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation, i18n} from "next-i18next";

const paths = [
  { url: UNIDESK_URL, label: "uni-desk" },
  { url: "", label: "admin:unidesk.common.panel" },
] as BreadcrumbPath[];

const Anuncios = () => {
  const { t } = useTranslation();
  const { getAdvertismentsFromUserId } = useAdvertisementService();
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  const profile = useCurrentUser();

  const getUserAdvertisements = useCallback(async () => {
    if (profile) {
      // @ts-ignore
      const { data, error } = await getAdvertismentsFromUserId(profile[0].id);
      if (!error) data && setAdvertisements(data);
    }
  }, [profile]);

  useEffect(() => {
    getUserAdvertisements();
  }, [getUserAdvertisements]);

  const refetchAdvertisements = () => {
    getUserAdvertisements();
  };

  const now = new Date().toLocaleString(i18n?.language, {dateStyle: "full"});

  const arr = now.split(" ");
  for (var i = 0; i < arr.length; i++) {
    if(!(arr[i].charAt(0) == "d" && arr[i].charAt(1) == "e" && arr[i].charAt(3) != " " ))
    {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
  }

  const str2 = arr.join(" ");

  return (
    <section className="max-width">
      <Breadcrumbs icon={IconAnuncios} paths={paths} />

      <UnideskStructure>
        <UnideskStructure.Menu>
          <MenuSenhorio activeSection="adverts" activeUrl="main_panel" />
        </UnideskStructure.Menu>
        <UnideskStructure.Content>
          <div className="text-3xl font-bold pl-5">
            {t("date", {date: str2})}
          </div>
          <div className="ml-0 p-5">
            <div className="my-4">{t("admin:reviews.my_adverts")}</div>
            <div className="flex flex-col gap-4">
              {advertisements.map((advertisement) => {
                return (
                  <div className="w-full" key={advertisement.id}>
                    <AnuncioCard advertisement={advertisement} refetchAdvertisements={refetchAdvertisements} />
                  </div>
                );
              })}
              {!advertisements || (advertisements.length === 0 && <div>{t("advertisement", { count: 0 })}</div>)}
            </div>
          </div>
        </UnideskStructure.Content>
      </UnideskStructure>
    </section>
  );
};

export default Anuncios;

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
