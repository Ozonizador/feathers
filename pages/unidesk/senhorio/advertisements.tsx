/* PAGINA 51 DO XD */

import AnuncioCard from "../../../components/senhorioanuncios/card/AnuncioCard";
import MenuSenhorio from "../../../components/unidesk/Menus/MenuSenhorio";
import { useCallback, useEffect, useState } from "react";
import { Advertisement } from "../../../models/advertisement";
import { useCurrentUser } from "../../../context/MainProvider";
import useAdvertisementService from "../../../hooks/advertisementService";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Breadcrumbs, { BreadcrumbPath } from "../../../components/utils/Breadcrumbs";

// icons
import IconAnuncios from "../../../public/images/icons8_laptop_computer.svg";
import { UnideskStructure } from "../../../components/unidesk/UnideskStructure";

const paths = [{ url: "", label: "Painel" }] as BreadcrumbPath[];

const Anuncios = () => {
  const { getAdvertismentsFromUserId } = useAdvertisementService();
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  const profile = useCurrentUser();

  const getUserAdvertisements = useCallback(async () => {
    if (profile) {
      const { data, error } = await getAdvertismentsFromUserId(profile.id);
      if (!error) data && setAdvertisements(data);
    }
  }, [profile]);

  useEffect(() => {
    getUserAdvertisements();
  }, [getUserAdvertisements]);

  const refetchAdvertisements = () => {
    getUserAdvertisements();
  };

  return (
    <section>
      <Breadcrumbs icon={IconAnuncios} paths={paths} />

      <UnideskStructure>
        <UnideskStructure.Menu>
          <MenuSenhorio />
        </UnideskStructure.Menu>
        <UnideskStructure.Content>
          <div className="ml-0 p-5">
            <div className="my-4">Os meus anúncios</div>
            <div className="flex flex-col gap-4">
              {advertisements.map((advertisement) => {
                return (
                  <div className="w-full" key={advertisement.id}>
                    <AnuncioCard advertisement={advertisement} refetchAdvertisements={refetchAdvertisements} />
                  </div>
                );
              })}
              {!advertisements || (advertisements.length === 0 && <div>Sem anúncios</div>)}
            </div>
          </div>
        </UnideskStructure.Content>
      </UnideskStructure>
    </section>
  );
};

export default Anuncios;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
