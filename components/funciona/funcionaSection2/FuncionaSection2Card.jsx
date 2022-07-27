import React from "react";
import Image from "next/image";

const HomeSection2Cards = ({ img, icon, heading, text }) => {
    return (
        <>
            <div className="hidden lg:block">
                <article className="card flex justify-between items-center bg-white drop-shadow-xl rounded-2xl p-5 mb-8 w-full">

                    <Image src={img} alt="" height={109} width={109}></Image>
                    <div className="mx-5">
                        <Image src={icon} alt="" height={48} width={48} ></Image>
                    </div>
                    <div className="w-full">
                        <h2 className="text-2xl font-bold text-secondary-600 mb-4">{heading}</h2>
                        <p className="text-secondary-400">{text}</p>
                    </div>
                </article>
            </div>

            <div className="block lg:hidden">
                <article className="card  bg-white drop-shadow-xl rounded-2xl p-5 mb-8 w-full">
                    <Image src={img} alt="" height={109} width={109}></Image>
                    <div className="flex flex-col mt-2">
                        <div className="flex flex-row items-center align-middle">
                            <div className="mr-3 ">
                                <Image src={icon} alt="" height={48} width={48} ></Image>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-secondary-600 mb-4">{heading}</h2>
                            </div>
                        </div>
                        <p className="text-secondary-400 mt-4">{text}</p>
                    </div>

                </article>
            </div>


        </>
    );
};

export default HomeSection2Cards;