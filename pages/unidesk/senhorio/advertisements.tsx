/* PAGINA 51 DO XD */

import AnuncioCard from "../../../components/senhorioanuncios/card/AnuncioCard";
import MenuAnuncio from "../../../components/unidesk/Menus/MenuSenhorio";
import Breadcrumb from "../../../components/senhorioanuncios/breadcrumb/Breadcrumb";
import { useCallback, useEffect, useState } from "react";
import Advertisement from "../../../models/advertisement";
import { useProfileInformation } from "../../../context/MainProvider";
import { getAdvertismentsFromUserId } from "../../../services/advertisementService";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

const Anuncios = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

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

      <div className="container mx-auto my-16 w-5/6 rounded-2xl  bg-terciary-300 py-20 ">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex justify-center lg:block">
            <MenuAnuncio />
          </div>

          <div className="ml-0 lg:ml-4">
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

            {/* <div>
              <DicasCard />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Anuncios;

export const getServerSideProps = withPageAuth({ redirectTo: "/auth/login" });
