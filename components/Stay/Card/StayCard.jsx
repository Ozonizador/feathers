import Image from "next/image";
import img1 from "../../../public/images/bed6.jpg";
import { Card } from "flowbite-react";



const StayCard = () => {
    return (

        <div>
            {/* <div className="font-bold text-3xl">Informações gerais</div>
            <div className="font-bold text-xl text-gray-600 mt-7 mb-5">Estadia atual</div> */}
            <div className="bg-white border-2 border-terciary-200 rounded-lg p-0 w-96">
                <div className="flex">
                    <div className="h-32 w-28">
                        <Image src={img1} alt="Foto Quarto" height={128} width={112} className="rounded-l-lg object-cover " />
                    </div>
                    <div className="ml-2">
                        <div className="flex flex-col w-full  justify-between">
                            <div className="font-bold text-base mb-4 mt-3">Quarto privado em Peniche</div>
                            <div className="font-bold text-xl text-primary-500 mb-2">400€/mês</div>
                            <div className="text-base text-secondary-300">Despesas excluídas</div>
                        </div>
                    </div>
                </div>
            </div>





            {/* CARD FLOW */}








        </div>







    )
}

export default StayCard