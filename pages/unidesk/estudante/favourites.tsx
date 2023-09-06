import Image from "next/image";
import Link from "next/link";
import iconfavorito from "../../../public/images/icon-pg14-2.svg";
import { CgHome } from "react-icons/cg";
import { useCurrentUser } from "../../../context/MainProvider";
import { useCallback, useEffect, useState } from "react";
import useAdvertisementService from "../../../hooks/advertisementService";
import { Spinner } from "flowbite-react";

/* IMAGES */
import classNames from "classnames";
import { Advertisement } from "../../../models/advertisement";
import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { PROCURAR_ADVERT_URL, UNIDESK_URL } from "../../../models/paths";
import ExpensesComponent from "../../../components/anuncio/ExpensesComponent";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";
import MenuEstudante from "../../../components/unidesk/Menus/MenuEstudante";
import { UnideskStructure } from "../../../components/unidesk/UnideskStructure";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const FavouritesBreadcrumbs = [
  { url: UNIDESK_URL, label: "uni-desk" },
  { url: "", label: "favourites_other" },
] as BreadcrumbPath[];

const UnideskFavoritos = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<Advertisement[]>([]);
  const profile = useCurrentUser();
  const { getAdvertisementsFromMultipleId } = useAdvertisementService();

  const getUserFavourites = useCallback(async () => {
    if (profile && profile.favourite_rooms) {
      const { data, error } = await getAdvertisementsFromMultipleId(profile.favourite_rooms);
      if (!error) {
        setFavourites(data as unknown as Advertisement[]);
      }
    }
    setIsLoading(false);
  }, [profile]);

  useEffect(() => {
    setIsLoading(true);
    getUserFavourites();
  }, [getUserFavourites, profile]);

  return (
    <section className="max-width px-5">
      <Breadcrumbs icon={iconfavorito} paths={FavouritesBreadcrumbs} />
      <UnideskStructure>
        <UnideskStructure.Menu>
          <MenuEstudante activeSection={"favourites"} activeUrl={"favourites"} />
        </UnideskStructure.Menu>
        <UnideskStructure.Content>
          <div>
            <div className="flex flex-col items-center justify-center align-middle">
              <Image src={iconfavorito} alt="Favoritos" height={75} width={75} />
              <div className="mt-9 text-2xl font-bold text-primary-500">{t("favourites", { count: 2 })}</div>
            </div>

            <div
              className={classNames("mx-auto mt-16 flex justify-center", {
                "gap-10": favourites && favourites.length > 0,
              })}
            >
              {isLoading && (
                <div className="mt-32 flex flex-1 justify-center">
                  <Spinner color="info" aria-label="loading" size="lg" />
                </div>
              )}
              {!isLoading && (
                <>
                  <div
                    className={classNames({
                      "w-11/12 lg:flex lg:w-1/2 lg:justify-center": favourites && favourites.length == 1,
                      "flex w-full flex-col gap-6 lg:grid lg:grid-cols-2": favourites && favourites.length > 1,
                    })}
                  >
                    {favourites.map((favourite, index) => {
                      return (
                        <div className="w-full bg-white" key={index}>
                          <div className="flex rounded-lg border-2 border-gray-200">
                            <div className="relative h-48 w-1/2 max-w-[350px] rounded-l-lg lg:w-1/3">
                              {favourite.photos && favourite.photos.length > 0 ? (
                                <Image
                                  src={favourite.photos[0].url}
                                  alt="Foto de Capa"
                                  layout="fill"
                                  objectFit="cover"
                                />
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="flex w-full flex-col p-2">
                              <div className="mt-5 text-lg font-bold">{favourite.title}</div>
                              <div className="text-md mb-1 font-bold text-primary-500">
                                {t("advertisements:price_month", { price: favourite.month_rent })}
                              </div>

                              <div className="mt-auto flex">
                                <ExpensesComponent expenses={favourite.expenses} />
                              </div>
                              <Link href={`/anuncio/${favourite.slug}`} className="pb-3 text-base text-gray-500">
                                {t("see_more")}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {(!favourites || favourites.length === 0) && <div>{t("favourites", { count: 0 })}</div>}
                </>
              )}
            </div>
            <div className="mb-20 mt-12 flex justify-center">
              <Link
                href={PROCURAR_ADVERT_URL}
                className="mt-10 flex w-fit items-center justify-center rounded-md bg-primary-500 px-9  py-4 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44"
              >
                {t("find")}{" "}
                <span className="px-1">
                  <CgHome />
                </span>{" "}
                {t("at")}
              </Link>
            </div>
          </div>
        </UnideskStructure.Content>
      </UnideskStructure>
    </section>
  );
};

export default UnideskFavoritos;

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
