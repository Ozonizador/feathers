


export default function BlogHero() {
    return (

        <section className="container mx-auto py-20 ">

            <div className="flex flex-col  lg:flex-row justify-between  gap-14">
                <article className="relative h-96 w-full  rounded-3xl bg-about-1 px-7 lg:w-2/6">
                    <div className="absolute bottom-7 left-6 w-11/12 lg:w-3/4">
                        <h2 className="bold  text-2xl text-white font-normal ">5 estratégias para inovar no seu anúncio</h2>
                    </div>
                </article>

                <article className="relative h-96 w-full lg:w-2/6  rounded-3xl  bg-about-2 px-7">
                    <div className="absolute bottom-8 left-4 lg:left-6 w-11/12">
                        <h2 className="bold  text-2xl text-white font-normal mb-2">Sobreviver à universidade - um guia completo</h2>
                        <p className="bold  text-base text-white font-normal ">Dizem que a universidade são os melhores tempos da nossa vida. E, na maioria das vezes, estão correctos. Mas obviamente que é também um período de grandes desafios.</p>
                        <div className="flex flex-row justify-between mt-8">
                            <div>
                                <p className="text-gray-300">30 de Janeiro de 2022</p>
                            </div>

                            <div>
                                <p className="text-gray-300">30 de Janeiro de 2022</p>
                            </div>

                        </div>

                    </div>
                </article>

                <article className="relative h-96 w-full lg:w-2/6  rounded-3xl  bg-about-2 px-7">
                    <div className="absolute bottom-8 left-4 lg:left-6 w-11/12">
                        <h2 className="bold  text-2xl text-white font-normal ">5 regras para ser um ótimo colega de casa</h2>
                    </div>
                </article>


            </div>


        </section>

    );
}
