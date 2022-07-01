import Image from "next/image";
import React from "react";

export default function Stepper() {
    return (

        <div className="p-5">
            <div className="mx-4 p-4">
                <div className="flex items-center">


                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full  h-12 w-12 py-3 text-center bg-primary-500 border-teal-60">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary-500">Passo 1</div>
                    </div>
                    <div className="flex-auto border-t-2  border-primary-500"></div>


                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full h-12 w-12 py-3 text-center bg-primary-500 border-teal-60">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary-500">Passo 2</div>
                    </div>

                    <div className="flex-auto border-t-2  border-primary-500"></div>

                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full h-12 w-12 py-3 text-center bg-terciary-200 ">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-terciary-200">Passo 3</div>
                    </div>

                    <div className="flex-auto border-t-2  border-terciary-200"></div>


                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full  h-12 w-12 py-3 text-center bg-terciary-200 border-teal-60">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-terciary-200">Passo 4</div>
                    </div>

                    <div className="flex-auto border-t-2  border-terciary-200"></div>


                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full  h-12 w-12 py-3 text-center bg-terciary-200">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-terciary-200">Passo 5</div>
                    </div>

                    <div className="flex-auto border-t-2  border-terciary-200"></div>


                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full  h-12 w-12 py-3 text-center bg-terciary-200 border-teal-6">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-terciary-200">Passo 6</div>
                    </div>

                    <div className="flex-auto border-t-2  border-terciary-200"></div>


                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full  h-12 w-12 py-3 text-center bg-terciary-200">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-terciary-200">Passo 7</div>
                    </div>

                    <div className="flex-auto border-t-2  border-terciary-200"></div>


                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full  h-12 w-12 py-3 text-center bg-terciary-200">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-terciary-200">Passo 8</div>
                    </div>

                    <div className="flex-auto border-t-2  border-terciary-200"></div>


                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full h-12 w-12 py-3 text-center bg-terciary-200">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-terciary-200">Passo 9</div>
                    </div>

                    <div className="flex-auto border-t-2  border-terciary-200"></div>




                    {/* PASSO */}
                    <div className="flex items-center text-white relative">
                        <div className="rounded-full text-center h-12 w-12 py-3  bg-terciary-200 ">
                            &#10004;
                        </div>
                        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-terciary-200">Passo 10</div>
                    </div>













                </div>
            </div>
        </div>

    );
}
