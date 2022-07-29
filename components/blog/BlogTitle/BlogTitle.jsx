export default function BlogTitle() {
  return (
    <section className="container mx-auto  pt-20 pb-5">
      <div className="flex flex-col items-center justify-center lg:justify-between align-middle lg:flex-row">
        <div className="text-3xl lg:text-6xl font-bold text-center lg:text-left">Pertence Onde Tu Quiseres!</div>
        <div className="flex h-5 items-center w-full lg:w-44 ">
          <select className="w-full mt-24  rounded-md border border-solid border-terciary-500 bg-white py-2 px-3 lg:w-44 lg:mt-0">
            <option>Categoria</option>
            <option>Casa</option>
            <option>Apartamento</option>
          </select>
        </div>
      </div>
    </section>
  );
}
