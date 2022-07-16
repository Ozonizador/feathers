import React from "react";

import { Rating } from "flowbite-react/lib/esm/components";
export default function RoomRating() {
    return (
        <section className="mb-8">

            <Rating>
                <p className="text-5xl font-medium text-secondary-500 mr-5">4.71</p>
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star />
                <Rating.Star filled={false} />
            </Rating>
            <p className="text-2xl font-medium text-secondary-500 my-5">5 comentários</p>
            <hr />

            <div className="flex flex-row  gap-16">
                {/* COL 1 */}
                <div className="flex flex-col mt-8">
                    <div className="flex flex-row">
                        <div className="text-xl w-52 font-bold">Localização</div>
                        <Rating>
                            <p className="font-medium text-secondary-500 ml-5">4.71</p>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                        </Rating>
                    </div>

                    <div className="flex flex-row my-4">
                        <div className="text-xl w-52 font-bold">Qualidade - preço</div>
                        <Rating>
                            <p className="font-medium text-secondary-500 ml-5">4.71</p>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                        </Rating>
                    </div>

                    <div className="flex flex-row">
                        <div className="text-xl w-52 font-bold">Comodidades</div>
                        <Rating>
                            <p className="font-medium text-secondary-500 ml-5">4.71</p>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                        </Rating>
                    </div>
                </div>


                {/* COL 2 */}
                <div className="flex flex-col mt-8">
                    <div className="flex flex-row">
                        <div className="text-xl w-52 font-bold">Senhorio</div>
                        <Rating>
                            <p className="font-medium text-secondary-500 ml-5">4.71</p>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                        </Rating>
                    </div>

                    <div className="flex flex-row my-4">
                        <div className="text-xl w-52 font-bold">Avaliação Geral</div>
                        <Rating>
                            <p className="font-medium text-secondary-500 ml-5">4.71</p>
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star />
                            <Rating.Star filled={false} />
                        </Rating>
                    </div>
                </div>

            </div>
        </section>
    );
}


