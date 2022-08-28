import React from "react";

export default function HomeSection4() {
  //    let navigate = useNavigate();
  const routeChange = () => {
    let path = `/4_5`;
    //      navigate(path);
  };

  return (
    <section>
      <div onClick={routeChange} className="hidden bg-terciary-300  lg:block">
        <div className="mx-auto p-4 text-center lg:px-8 lg:py-20">
          <h2 className="pb-20 text-5xl font-bold">Explore as nossas cidades + populares!</h2>
          <div className="grid gap-8 lg:grid-cols-4">
            <article className="flex justify-center rounded-2xl bg-gray-300 bg-[url('/images//place-tomar.jpg')] bg-cover bg-no-repeat p-10 align-middle lg:px-16 lg:py-32">
              <h3 className="text-5xl font-bold text-white">Tomar</h3>
            </article>
            <article className="flex justify-center rounded-2xl bg-gray-300 bg-[url('/images//place-peniche.jpg')] bg-cover bg-no-repeat p-10 align-middle lg:px-16 lg:py-32">
              <h3 className="text-5xl font-bold text-white">Peniche</h3>
            </article>
            <article className="flex justify-center rounded-2xl bg-gray-300 bg-[url('/images//place-brazil.png')] bg-cover bg-no-repeat p-10 align-middle lg:px-16 lg:py-32">
              <h3 className="text-5xl font-bold text-white">Rio Maior</h3>
            </article>
            <article className="flex justify-center rounded-2xl bg-gray-300 bg-[url('/images//place-santarem.jpg')] bg-cover bg-no-repeat p-10 align-middle lg:px-16 lg:py-32">
              <h3 className="text-5xl font-bold text-white">Santarem</h3>
            </article>
            <article className="flex justify-center rounded-2xl bg-gray-300 bg-[url('/images//place-abrantes.jpg')] bg-cover bg-no-repeat p-10 align-middle lg:px-16 lg:py-32">
              <h3 className="text-5xl font-bold text-white">Abrantes</h3>
            </article>
            <article className="flex justify-center rounded-2xl bg-gray-300 bg-[url('/images//place-leiria.jpg')] bg-cover bg-no-repeat p-10 align-middle lg:px-16 lg:py-32">
              <h3 className="text-5xl font-bold text-white">Leiria</h3>
            </article>
            <article className="flex justify-center rounded-2xl bg-gray-300 bg-[url('/images//place-braga.jpg')] bg-cover bg-no-repeat p-10 align-middle lg:px-16 lg:py-32">
              <h3 className="text-5xl font-bold text-white">Braga</h3>
            </article>
            <article className="flex justify-center rounded-2xl bg-gray-300 bg-[url('/images//place-setubal.jpg')] bg-cover bg-no-repeat p-10 align-middle lg:px-16 lg:py-32">
              <h3 className="text-5xl font-bold text-white">Setubal</h3>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
