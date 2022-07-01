import React from "react";
import Link from "next/link"
import Input from "../../components/utils/Input"

const FormAnunciar = () => {
    return (
        <section className="my-20 mx-auto grid grid-cols-2 gap-4  justify-items-center">


            <div className="w-3/4">
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



                <div className="mt-1">
                    <Link href="/">
                        <a>
                            <div className="flex">
                                <button type="button" className="mt-10 rounded-md py-4 px-9 text-center bg-primary-500  text-white leading-tight uppercase  shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out flex items-center ">
                                    Seguinte
                                    &#8594;
                                </button>
                            </div>

                        </a>
                    </Link>



                </div>
            </div>



            <div className="w-3/4">
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
