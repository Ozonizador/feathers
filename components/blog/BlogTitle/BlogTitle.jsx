export default function BlogTitle() {
  return (
    <section className="container mx-auto  pt-20 pb-5">
      <div className="flex flex-col items-center justify-center align-middle lg:flex-row lg:justify-between">
        <div className="text-center text-3xl font-bold lg:text-left lg:text-6xl">Pertence Onde Tu Quiseres!</div>
        <div className="flex h-5 w-full items-center lg:w-44 ">
          <select
            className="mt-24 w-full  rounded-md border border-solid border-terciary-500 bg-white py-2 px-3 lg:mt-0 lg:w-44"
            placeholder="Categoria"
          >
            <option>Categoria</option>
            <option>Casa</option>
            <option>Apartamento</option>
          </select>
        </div>
      </div>
    </section>
  );
}
