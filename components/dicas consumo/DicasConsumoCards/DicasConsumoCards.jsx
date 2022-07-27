import React from "react";
import Image from "next/image";
import img1 from "../../../public/images/card1.png"
import img2 from "../../../public/images/card2.png"
import img3 from "../../../public/images/card3.png"

const DicasConsumoCards = () => {
    return (

        <section>


            <div className="container mx-auto px-8 lg:px-32 mb-32">
                <div className="font-bold text-4xl mb-11">Últimos artigos</div>
                <div className="flex flex-col lg:flex">

                    <div className="flex flex-1 flex-col">
                        <div><Image src={img1} alt="" height="450" width="350" className="object-fill "></Image></div>
                        <div className="text-2xl my-4 w-2/3">Lorem ipsum dolor sit amet, consetetur.</div>
                        <div className="w-full lg:w-2/3">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.</div>

                        <div className="flex justify-between w-full mt-5 mb-10 text-base text-gray-400 lg:mt-10 lg:w-4/6 lg:mb-0">
                            <div>30 de Janeiro de 2022</div>
                            <div>By Unihosts</div>
                        </div>
                    </div>


                    <div className="flex flex-1 flex-col">
                        <div><Image src={img2} alt="" height="450" width="350" className="object-fill "></Image></div>
                        <div className="text-2xl my-4 w-2/3">Lorem ipsum dolor sit amet, consetetur.</div>
                        <div className="w-full lg:w-2/3">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.</div>

                        <div className="flex justify-between w-full mt-5 mb-10 text-base text-gray-400 lg:mt-10 lg:w-4/6 lg:mb-0">
                            <div>30 de Janeiro de 2022</div>
                            <div>By Unihosts</div>
                        </div>
                    </div>


                    <div className="flex flex-1 flex-col">
                        <div><Image src={img3} alt="" height="450" width="350" className="object-fill "></Image></div>
                        <div className="text-2xl my-4 w-2/3">Lorem ipsum dolor sit amet, consetetur.</div>
                        <div className="w-full lg:w-2/3">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo.</div>

                        <div className="flex justify-between w-full mt-5 mb-10 text-base text-gray-400 lg:mt-10 lg:w-4/6 lg:mb-0">
                            <div>30 de Janeiro de 2022</div>
                            <div>By Unihosts</div>
                        </div>
                    </div>


                </div>

            </div>
        </section>
    );
};

export default DicasConsumoCards;

