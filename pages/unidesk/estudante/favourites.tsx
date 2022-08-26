import Image from "next/image";
import Link from "next/link";
import iconfavorito from "../../../public/images/icon-pg14-2.svg";
import { BiInfoCircle } from "react-icons/bi";
import { CgHome } from "react-icons/cg";
import RoomUtilitesPopover from "../../../components/roomUtils/roomUtilitiesPopover";
import { useProfileInformation } from "../../../context/MainProvider";
import { useCallback, useEffect, useState } from "react";
import Advertisement, { EXPENSES_TO_TEXT } from "../../../models/advertisement";
import { getAdvertismentsFromMultipleId } from "../../../services/advertisementService";
import { Spinner } from "flowbite-react";

/* IMAGES */
import NoPhotoAvailable from "../../../public/images/imageNotAvailable.png";
import classNames from "classnames";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

const UnideskFavoritos = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<Advertisement[]>([]);
  const profile = useProfileInformation();

  const getUserFavourites = useCallback(async () => {
    if (profile && profile.favouriteRooms) {
      const { data, error } = await getAdvertismentsFromMultipleId(profile.favouriteRooms);
      if (!error) {
        setFavourites(data);
      }
    }
    setIsLoading(false);
  }, [profile]);

  useEffect(() => {
    setIsLoading(true);
    getUserFavourites();
  }, [getUserFavourites, profile]);

  return (
    <section>
      <div className="ml-8 mt-24 flex w-4/6 lg:mx-28 lg:items-center lg:align-middle">
        <div>
          <Image src={iconfavorito} alt="Favoritos" height={55} width={55} />
        </div>
        <div className="ml-4 text-xl">
          <Link href="/unidesk">Unidesk</Link>
          {" > Favoritos"}
        </div>
      </div>

      <div className="container mx-auto mb-32 mt-12  w-11/12 rounded-2xl border border-terciary-500 pt-20 lg:my-32 lg:w-4/6">
        <div className="flex flex-col items-center justify-center align-middle">
          <div>
            <Image src={iconfavorito} alt="Favoritos" height={75} width={75} />
          </div>
          <div className="mt-9 text-2xl font-bold text-primary-500">Favoritos</div>
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
                  "w-1/2 lg:flex lg:justify-center": favourites && favourites.length == 1,
                  "gap-5 lg:grid lg:grid-cols-2": favourites && favourites.length > 1,
                })}
              >
                {favourites.map((favourite, index) => {
                  return (
                    <div className="mb-10 h-40 w-full bg-white" key={index}>
                      <div className="flex rounded-lg border-2 border-gray-200">
                        <div className="w-1/3 rounded-l-lg">
                          {favourite.photos && favourite.photos.length > 0 ? (
                            <Image
                              src={favourite.photos[0].url}
                              alt="Foto de Capa"
                              layout="intrinsic"
                              height={164}
                              width={164}
                            />
                          ) : (
                            <Image
                              src={NoPhotoAvailable}
                              alt="no photo available"
                              layout="intrinsic"
                              height={164}
                              width={164}
                            />
                          )}
                        </div>
                        <div className="ml-3 flex flex-1 flex-col p-2">
                          <div className="text-lg font-bold">{favourite.title}</div>
                          <div className="text-md mb-1 font-bold text-primary-500">{favourite.monthRent}€/mês</div>

                          <div className="mt-auto flex">
                            <div className="relative mb-2 text-center text-base">
                              <div className="peer flex cursor-pointer items-center justify-center gap-2 align-middle text-base">
                                <RoomUtilitesPopover expenses={favourite.expenses} />
                                <p className="mt-1 text-xs lg:text-base">
                                  {EXPENSES_TO_TEXT[favourite.expenses.inclusive]}
                                </p>
                                <BiInfoCircle />
                              </div>
                            </div>
                          </div>
                          <Link href={`/anuncio/${favourite.id}`}>
                            <a className="text-base text-gray-500">Ver mais</a>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {(!favourites || favourites.length === 0) && <div>Sem Favoritos</div>}
            </>
          )}
        </div>
        <div className="mt-12 mb-20 flex justify-center">
          <Link href="/procurar">
            <a className="mt-10 flex w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44">
              Encontrar{" "}
              <span className="px-1">
                <CgHome />
              </span>{" "}
              em...
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UnideskFavoritos;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
