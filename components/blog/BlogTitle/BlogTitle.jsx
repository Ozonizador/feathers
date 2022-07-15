export default function BlogTitle() {
  return (
    <section className="container mx-auto  pt-20 pb-5">
      <div className="flex items-center justify-between align-middle">
        <div className="text-6xl font-bold">Pertence Onde Tu Quiseres!</div>
        <div className="flex h-5 items-center">
          <select className="w-44 rounded-md border border-solid border-terciary-500 bg-white py-2 px-3 ">
            <option>Categoria</option>
            <option>Casa</option>
            <option>Apartamento</option>
          </select>
        </div>
      </div>
    </section>
  );
}
