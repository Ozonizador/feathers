export default function BlogHero() {
  return (
    <section className="container mx-auto py-20 ">
      <div className="flex flex-col  justify-between gap-14  lg:flex-row">
        <article className="bg-about-1 relative h-96  w-full rounded-3xl px-7 lg:w-2/6">
          <div className="absolute bottom-7 left-6 w-11/12 lg:w-3/4">
            <h2 className="bold  text-2xl font-normal text-white ">5 estratégias para inovar no seu anúncio</h2>
          </div>
        </article>

        <article className="bg-about-2 relative h-96 w-full  rounded-3xl  px-7 lg:w-2/6">
          <div className="absolute bottom-8 left-4 w-11/12 lg:left-6">
            <h2 className="bold  mb-2 text-2xl font-normal text-white">Sobreviver à universidade - um guia completo</h2>
            <p className="bold  text-base font-normal text-white ">
              Dizem que a universidade são os melhores tempos da nossa vida. E, na maioria das vezes, estão correctos.
              Mas obviamente que é também um período de grandes desafios.
            </p>
            <div className="mt-8 flex flex-row justify-between">
              <div>
                <p className="text-gray-300">30 de Janeiro de 2022</p>
              </div>

              <div>
                <p className="text-gray-300">30 de Janeiro de 2022</p>
              </div>
            </div>
          </div>
        </article>

        <article className="bg-about-2 relative h-96 w-full  rounded-3xl  px-7 lg:w-2/6">
          <div className="absolute bottom-8 left-4 w-11/12 lg:left-6">
            <h2 className="bold  text-2xl font-normal text-white ">5 regras para ser um ótimo colega de casa</h2>
          </div>
        </article>
      </div>
    </section>
  );
}
