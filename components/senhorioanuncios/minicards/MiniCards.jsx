import Image from "next/image"
import img1 from "../../../public/images/bed3.jpeg"

const AnuncioCard = () => {
    return (

        <section className="mt-16">
            <div className="text-x1 text-secondary-300">Dicas para si</div>
            <div className="w-full flex flex-row mt-5 justify-between gap-4">

                <div className="bg-white border-2 border-terciary-200 rounded-lg w-80">
                    <div className="flex">
                        <div className="mr-4 h-32">
                            <Image src={img1} alt="Foto Quarto" height={176} width={140} className="rounded-l-lg object-cover" />
                        </div>
                        <div className="w-11/12">
                            <div className="flex flex-row w-full  justify-between pr-4 mt-3">
                                <div className="font-bold text-base ">Procure responder sempre rapidamente aos pedidos de reserva</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-2 border-terciary-200 rounded-lg w-80">
                    <div className="flex">
                        <div className="mr-4 h-32">
                            <Image src={img1} alt="Foto Quarto" height={176} width={140} className="rounded-l-lg object-cover" />
                        </div>
                        <div className="w-11/12">
                            <div className="flex flex-row w-full  justify-between pr-4 mt-3">
                                <div className="font-bold text-base ">Procure responder sempre rapidamente aos pedidos de reserva</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </section>
    );
};

export default AnuncioCard;