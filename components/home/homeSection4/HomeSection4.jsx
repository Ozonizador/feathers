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
        <div className="container mx-auto pt-16 pb-20 text-center">
          <h2 className="pb-20 text-5xl font-bold">Explore as nossas cidades + populares!</h2>
          <div className="grid grid-cols-4 gap-8">
            <article className="py-32 px-16  rounded-2xl bg-cover bg-no-repeat bg-gray-300 flex justify-center align-middle">
              <h3 className="text-white text-5xl font-bold">Tomar</h3>
            </article>
            <article className="py-32 px-16  rounded-2xl bg-cover bg-no-repeat bg-gray-300 flex justify-center align-middle">
              <h3 className="text-white text-5xl font-bold">Peniche</h3>
            </article>
            <article className="py-32 px-16  rounded-2xl bg-cover bg-no-repeat bg-gray-300 flex justify-center align-middle">
              <h3 className="text-white text-5xl font-bold">Rio</h3>
            </article>
            <article className="py-32 px-16  rounded-2xl bg-cover bg-no-repeat bg-gray-300 flex justify-center align-middle">
              <h3 className="text-white text-5xl font-bold">Santarem</h3>
            </article>
            <article className="py-32 px-16  rounded-2xl bg-cover bg-no-repeat bg-gray-300 flex justify-center align-middle">
              <h3 className="text-white text-5xl font-bold">Abrantes</h3>
            </article>
            <article className="py-32 px-16  rounded-2xl bg-cover bg-no-repeat bg-gray-300 flex justify-center align-middle">
              <h3 className="text-white text-5xl font-bold">Leira</h3>
            </article>
            <article className="py-32 px-16  rounded-2xl bg-cover bg-no-repeat bg-gray-300 flex justify-center align-middle">
              <h3 className="text-white text-5xl font-bold">Braga</h3>
            </article>
            <article className="py-32 px-16  rounded-2xl bg-cover bg-no-repeat bg-gray-300 flex justify-center align-middle">
              <h3 className="text-white text-5xl font-bold">Setubal</h3>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
