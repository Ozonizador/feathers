import React from "react";
import RoomCard from "../../components/destaques/ProcurarSection/RoomCard";
import DescricaoCondicoes from "../../components/destaques/RoomInformation/DescricaoCondicoes/DescricaoCondicoes";
import RoomGrid from "../../components/destaques/RoomInformation/RoomGrid/RoomGrid";
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

export const Anuncio = () => {
  return (
    <ShowingSingleAdvertisementProvider advertisement={null}>
      <div>
        {/* MODAL duplicar*/}
        <ModalDetalhesPagamento />
        <div className="mx-auto md:container">
          <RoomGrid />
          <div className="flex justify-between">
            <div className="w-3/4">
              <RoomInformation />
              <DescricaoCondicoes />
              <RoomSlider />
              <RoomRating />
              <RoomInformation />
              <RoomMap />
              <RoomSenhorio />
              <RoomSemelhantes />
            </div>

            <div className="w-64 flex-initial">
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
