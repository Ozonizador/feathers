import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsResult, GetStaticPropsContext } from "next";
import React from "react";
import DescricaoCondicoes from "../../components/destaques/RoomInformation/DescricaoCondicoes/DescricaoCondicoes";
import SingleRoomGrid from "../../components/destaques/RoomInformation/SingleRoomGrid/SingleRoomGrid";
import RoomInformation from "../../components/destaques/RoomInformation/RoomInformation";
import RoomMap from "../../components/destaques/RoomInformation/RoomMap/RoomMap";
import RoomPagamento from "../../components/destaques/RoomInformation/RoomPagamento/RoomPagamento";
import RoomRating from "../../components/destaques/RoomInformation/RoomRating/RoomRating";
import RoomSenhorio from "../../components/destaques/RoomInformation/RoomSenhorio/RoomSenhorio";
import RoomSemelhantes from "../../components/destaques/RoomInformation/RoomsSemelhantes/RoomsSemelhantes";
import RoomSlider from "../../components/destaques/RoomInformation/Slider/RoomSlider";
import ModalDetalhesPagamento from "../../components/modals/ModalDetalhesPagamentos";
import { ShowingSingleAdvertisementProvider } from "../../context/ShowingSingleAdvertisementProvider";
import Advertisement, { ADVERTISEMENT_PROPERTIES, ADVERTISEMENT_TABLE_NAME } from "../../models/advertisement";
import { ModalDetalhesPagamentoProvider } from "../../context/ModalShowProvider";

type PageParams = {
  slug: string;
};

interface AnuncioProps {
  advertisement: Advertisement;
}

const Anuncio = ({ advertisement }: AnuncioProps) => {
  return (
    <ShowingSingleAdvertisementProvider advertisement={advertisement}>
      <ModalDetalhesPagamentoProvider>
        <div>
          <ModalDetalhesPagamento />
          <div className="mx-auto md:container">
            <SingleRoomGrid />
            <div className="flex flex-col lg:flex-row">
              <div className="w-full px-5 lg:w-4/6">
                <RoomInformation />
                <DescricaoCondicoes />
                <RoomSlider />
                <RoomRating />
                <RoomMap />
                <RoomSenhorio />
                <RoomSemelhantes />
              </div>

              <div className="mb-20 w-full lg:mb-0 lg:w-2/6 lg:px-5">
                <RoomPagamento />
              </div>
            </div>
          </div>
        </div>
      </ModalDetalhesPagamentoProvider>
    </ShowingSingleAdvertisementProvider>
  );
};

export const getServerSideProps = async ({
  params,
}: GetStaticPropsContext<PageParams>): Promise<GetServerSidePropsResult<AnuncioProps>> => {
  const slug = params?.slug;

  /* Not Found */
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const { data: advertisement, error } = await supabaseClient
    .from<Advertisement>(ADVERTISEMENT_TABLE_NAME)
    .select(`*, host:hostId(*)`)
    .eq(ADVERTISEMENT_PROPERTIES.SLUG, slug)
    .limit(1)
    .single();

  if (error) {
    console.log(`[Supabase]: Failed to fetch the advertisement: ${slug}`, error.message);
  }

  if (advertisement) {
    return {
      props: { advertisement },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
export default Anuncio;
