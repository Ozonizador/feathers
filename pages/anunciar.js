import Head from "next/head";
import React from "react";

import FormAnunciar from "../components/anunciar/FormAnunciar";
import Stepper from "../components/anunciar/Stepper"


export default function Anunciar() {
    return (
        <>
            <div className="container mx-auto my-20 py-20 rounded-2xl border border-terciary-700">
                <h1 className="text-6xl  text-center font-bold leading-snug ">Anunciar a sua propriedade é rápido e fácil!</h1>
                <Stepper />
                <div>
                    <FormAnunciar />
                </div>
            </div>
        </>
    );
}
