/* PAGINA 51 DO XD */

import AnuncioCard from "../../../components/senhorioanuncios/card/AnuncioCard";
import MenuAnuncio from "../../../components/unidesk/Menus/MenuSenhorio";
import MiniCard from "../../../components/senhorioanuncios/minicards/MiniCards";
import Breadcrumb from "../../../components/senhorioanuncios/breadcrumb/Breadcrumb";
import { useCallback, useEffect, useState } from "react";
import Advertisement from "../../../models/advertisement";
import { useProfileInformation } from "../../../context/MainProvider";
import { getAdvertismentsFromUserId } from "../../../services/advertisementService";

const Anuncios = () => {
  // const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  const profile = useProfileInformation();

  const getUserAdvertisements = useCallback(async () => {
    if (profile) {
      const { data, error } = await getAdvertismentsFromUserId(profile.id);
      if (!error) {
        setAdvertisements(data);
      }
    }
  }, [profile]);

  useEffect(() => {
    getUserAdvertisements();
  }, [getUserAdvertisements]);

  return (
    <section>
      <Breadcrumb />

      <div className="container mx-auto my-16 w-4/6 rounded-2xl  bg-terciary-300 py-20 ">
        <div className="flex px-12">
          <div>
            <MenuAnuncio />
          </div>

          <div className="ml-4">
            <div className="my-4">Os meus anúncios</div>
            <div className="flex flex-col gap-4">
              {advertisements.map((advertisement) => {
                return (
                  <div className="w-full" key={advertisement.id}>
                    <AnuncioCard advertisement={advertisement} />
                  </div>
                );
              })}
            </div>

            <div>
              <MiniCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Anuncios;
