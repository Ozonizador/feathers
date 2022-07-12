import Head from "next/head";
import React from "react";
import RoomInformation from "../components/destaques/RoomInformation/RoomInformation";
import DescricaoCondicoes from "../components/destaques/RoomInformation/DescricaoCondicoes/DescricaoCondicoes";
import RoomSlider from "../components/destaques/RoomInformation/Slider/RoomSlider"
import RoomRating from "../components/destaques/RoomInformation/RoomRating/RoomRating";
import RoomCard from "../components/destaques/RoomInformation/RoomCard/RoomCard";
import RoomMap from "../components/destaques/RoomInformation/RoomMap/RoomMap";



export default function Room() {
    return (
        <div>
            <div className=" px-36 mx-auto md:container">
                <RoomInformation />
                <DescricaoCondicoes />
                <RoomSlider />
                <RoomRating />
                <RoomCard />
                <RoomMap />
            </div>
        </div>
    );
}
