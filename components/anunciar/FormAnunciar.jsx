import React from "react";

import Input from "../../components/utils/Input"

const FormAnunciar = () => {
    return (
        <section className="my-20 mx-auto flex flex-row justify-around gap-8 lg:mx-32 lg:flex-1 lg:flex-row">


            <div className="w-2/4">
                <div className="mt-2">
                    <label className="block ">
                        Qual o seu tipo de espaço?
                    </label>
                    <select

                        className="w-full py-2 px-3  border-solid border border-terciary-500 bg-white rounded-md "
                    >
                        <option>Selecione</option>
                        <option>Casa</option>
                        <option>Apartamento</option>
                    </select>
                </div>
                <div className="my-8">
                    <Input label="Rua" labelText="Rua" />
                </div>
                <Input label="Andar" labelText="Andar" />
            </div>



            <div className="w-2/4">
                <Input label="Localidade" labelText="Localidade" customCss="icon" />
                <div className="my-8">
                    <Input label="Número" labelText="Número" />
                </div>
                <Input label="Código Postal" labelText="Código Postal" />
            </div>


        </section>
    );
};

export default FormAnunciar;
