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
import { AdvertisementWithHost, ADVERTISEMENT_PROPERTIES, ADVERTISEMENT_TABLE_NAME } from "../../models/advertisement";
import { ModalDetalhesPagamentoProvider } from "../../context/ModalShowProvider";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";

interface AnuncioProps {
  advertisement: AdvertisementWithHost;
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

export const getServerSideProps = withPageAuth({
  redirectTo: "/auth/login",
  authRequired: false,
  async getServerSideProps(ctx, supabase) {
    const slug = ctx.params?.slug;
    /* Not Found */
    if (!slug) {
      return {
        notFound: true,
      };
    }

    const { data: advertisement, error } = await supabase
      .from(ADVERTISEMENT_TABLE_NAME)
      .select(`*, host:host_id(*)`)
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
  },
});

export default Anuncio;
