import Head from "next/head";
import React from "react";
import RoomInformation from "../components/destaques/RoomInformation/RoomInformation";
import DescricaoCondicoes from "../components/destaques/RoomInformation/DescricaoCondicoes/DescricaoCondicoes";
import RoomSlider from "../components/destaques/RoomInformation/Slider/RoomSlider"
import RoomRating from "../components/destaques/RoomInformation/RoomRating/RoomRating";
import RoomCard from "../components/destaques/RoomInformation/RoomCard/RoomCard";
import RoomMap from "../components/destaques/RoomInformation/RoomMap/RoomMap";
import RoomSenhorio from "../components/destaques/RoomInformation/RoomSenhorio/RoomSenhorio";
import RoomSemelhantes from "../components/destaques/RoomInformation/RoomsSemelhantes/RoomsSemelhantes";
import RoomPagamento from "../components/destaques/RoomInformation/RoomPagamento/RoomPagamento";
import RoomSobreTi from "../components/destaques/RoomInformation/RoomSobreTi/RoomSobreTi";
import RoomPedido from "../components/destaques/RoomInformation/RoomPedido/RoomPedido";
import RoomGrid from "../components/destaques/RoomInformation/RoomGrid/RoomGrid";

export default function Room() {
    return (
        <div>
            <div className="mx-auto md:container">
                <RoomGrid />
                <div className="flex justify-between">
                    <div className="w-3/4">
                        <RoomInformation />
                        <DescricaoCondicoes />
                        <RoomSlider />
                        <RoomRating />
                        <RoomCard />
                        <RoomMap />
                        <RoomSenhorio />
                        <RoomSemelhantes />
                    </div>

                    <div className="flex-initial w-64">
                        <RoomPagamento />
                        <RoomSobreTi />
                        <RoomPedido />
                    </div>
                </div>
            </div>
        </div>
    );
}
