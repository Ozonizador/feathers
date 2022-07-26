import Image from "next/image";
import Link from "next/link";
import iconfavorito from "../../../public/images/icon-pg14-2.svg";
import { BiInfoCircle } from "react-icons/bi";
import { CgHome } from "react-icons/cg";
import RoomUtilitesPopover from "../../../components/roomUtils/roomUtilitiesPopover";
import { useProfileInformation } from "../../../context/MainProvider";
import { useCallback, useEffect, useState } from "react";
import Advertisement from "../../../models/advertisement";
import { getAdvertismentsFromMultipleId } from "../../../services/advertisementService";
import { Spinner } from "flowbite-react";

/* IMAGES */
import NoPhotoAvailable from "../../../public/images/imageNotAvailable.png";

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
      <div className=" mx-20 mt-24 flex w-4/6 items-center align-middle">
        <div>
          <Image src={iconfavorito} alt="Favoritos" height={55} width={55} />
        </div>
        <div className="ml-4 text-xl ">{"Unidesk > Favoritos"}</div>
      </div>

      <div className="container mx-auto my-32 w-4/6 rounded-2xl border border-terciary-500 pt-20">
        <div className="flex flex-col items-center justify-center align-middle">
          <div>
            <Image src={iconfavorito} alt="Favoritos" height={75} width={75} />
          </div>
          <div className="mt-9 text-2xl font-bold text-primary-500">Favoritos</div>
        </div>

        <div className="mx-auto mt-16 flex justify-center gap-10">
          {isLoading && (
            <div className="mt-32 flex flex-1 justify-center">
              <Spinner color="info" aria-label="loading" size="lg" />
            </div>
          )}
          {!isLoading && (
            <>
              <div className="grid grid-cols-2 gap-5">
                {favourites.map((favourite, index) => {
                  return (
                    <div className="mb-10 h-40 w-full bg-white" key={index}>
                      <div className="flex rounded-lg border-2 border-gray-200">
                        <div className="w-1/3 rounded-l-lg">
                          {favourite.photos ? (
                            <Image
                              src={favourite.photos[0]}
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
                                <BiInfoCircle />
                              </div>
                              {favourite.expenses &&
                                favourite.expenses.inclusive !== undefined &&
                                favourite.expenses.inclusive !== "EXCLUDED" && (
                                  <RoomUtilitesPopover expenses={favourite.expenses} />
                                )}
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
            <a className="flex w-1/5 items-center justify-center rounded-xl bg-primary-500 p-5 text-white duration-200 ease-in hover:drop-shadow-xl">
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
