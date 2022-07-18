import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsResult, GetStaticPropsContext } from "next";
import React from "react";
import DescricaoCondicoes from "../../components/destaques/RoomInformation/DescricaoCondicoes/DescricaoCondicoes";
import SingleRoomGrid from "../../components/destaques/RoomInformation/SingleRoomGrid/SingleRoomGrid";
import RoomInformation from "../../components/destaques/RoomInformation/RoomInformation";
import RoomMap from "../../components/destaques/RoomInformation/RoomMap/RoomMap";
import RoomPagamento from "../../components/destaques/RoomInformation/RoomPagamento/RoomPagamento";
import RoomPedido from "../../components/destaques/RoomInformation/RoomPedido/RoomPedido";
import RoomRating from "../../components/destaques/RoomInformation/RoomRating/RoomRating";
import RoomSenhorio from "../../components/destaques/RoomInformation/RoomSenhorio/RoomSenhorio";
import RoomSobreTi from "../../components/destaques/RoomInformation/RoomSobreTi/RoomSobreTi";
import RoomSemelhantes from "../../components/destaques/RoomInformation/RoomsSemelhantes/RoomsSemelhantes";
import RoomSlider from "../../components/destaques/RoomInformation/Slider/RoomSlider";
import ModalDetalhesPagamento from "../../components/modals/ModalDetalhesPagamentos";
import { ShowingSingleAdvertisementProvider } from "../../context/ShowingSingleAdvertisementProvider";
import Advertisement, {
  ADVERTISEMENT_PROPERTIES,
  ADVERTISEMENT_TABLE_NAME,
} from "../../models/advertisement";

type PageParams = {
  id: string;
};

interface AnuncioProps {
  advertisement: Advertisement;
}

const Anuncio = ({ advertisement }: AnuncioProps) => {
  return (
    <ShowingSingleAdvertisementProvider advertisement={advertisement}>
      <div>
        {/* MODAL duplicar*/}
        <ModalDetalhesPagamento />
        <div className="mx-auto md:container">
          <SingleRoomGrid />
          <div className="flex justify-between">
            <div className="w-5/6 flex-1 px-5">
              <RoomInformation />
              <DescricaoCondicoes />
              <RoomSlider />
              <RoomRating />
              <RoomInformation />
              <RoomMap />
              <RoomSenhorio />
              <RoomSemelhantes />
            </div>

            <div className="w-1/6 flex-1 px-5">
              <RoomPagamento />
              <RoomSobreTi />
              <RoomPedido />
            </div>
          </div>
        </div>
      </div>
    </ShowingSingleAdvertisementProvider>
  );
};

export const getServerSideProps = async ({
  params,
}: GetStaticPropsContext<PageParams>): Promise<GetServerSidePropsResult<AnuncioProps>> => {
  const id = params?.id;

  /* Not Found */
  if (!id) {
    return {
      notFound: true,
    };
  }

  const { data: advertisement, error } = await supabaseClient
    .from<Advertisement>(ADVERTISEMENT_TABLE_NAME)
    .select(`*`)
    .eq(ADVERTISEMENT_PROPERTIES.ID, id)
    .limit(1)
    .single();

  if (error) {
    console.log(`[Supabase]: Failed to fetch the advertisement: ${id}`, error.message);
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
