import React from "react";

export default function HomeSection4() {
  //    let navigate = useNavigate();
  const routeChange = () => {
    let path = `/4_5`;
    //      navigate(path);
  };

  return (
    <section>
      <div onClick={routeChange} className="container-fluid bg-terciary-300">
        <div className="mx-auto px-8 py-20 text-center">
          <h2 className="pb-20 text-5xl font-bold">Explore as nossas cidades + populares!</h2>
          <div className="grid gap-8 lg:grid-cols-4">
            <article className="flex justify-center  rounded-2xl bg-gray-300 bg-cover bg-no-repeat py-32 px-16 align-middle">
              <h3 className="text-5xl font-bold text-white">Tomar</h3>
            </article>
            <article className="flex justify-center  rounded-2xl bg-gray-300 bg-cover bg-no-repeat py-32 px-16 align-middle">
              <h3 className="text-5xl font-bold text-white">Peniche</h3>
            </article>
            <article className="flex justify-center  rounded-2xl bg-gray-300 bg-cover bg-no-repeat py-32 px-16 align-middle">
              <h3 className="text-5xl font-bold text-white">Rio</h3>
            </article>
            <article className="flex justify-center  rounded-2xl bg-gray-300 bg-cover bg-no-repeat py-32 px-16 align-middle">
              <h3 className="text-5xl font-bold text-white">Santarem</h3>
            </article>
            <article className="flex justify-center  rounded-2xl bg-gray-300 bg-cover bg-no-repeat py-32 px-16 align-middle">
              <h3 className="text-5xl font-bold text-white">Abrantes</h3>
            </article>
            <article className="flex justify-center  rounded-2xl bg-gray-300 bg-cover bg-no-repeat py-32 px-16 align-middle">
              <h3 className="text-5xl font-bold text-white">Leira</h3>
            </article>
            <article className="flex justify-center  rounded-2xl bg-gray-300 bg-cover bg-no-repeat py-32 px-16 align-middle">
              <h3 className="text-5xl font-bold text-white">Braga</h3>
            </article>
            <article className="flex justify-center  rounded-2xl bg-gray-300 bg-cover bg-no-repeat py-32 px-16 align-middle">
              <h3 className="text-5xl font-bold text-white">Setubal</h3>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
