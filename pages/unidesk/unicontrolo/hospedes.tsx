import HospedesMenu from "../../../components/unidesk/Menus/HospedesMenu";
import Breadcrumb from "../../../components/hospedes/breadcrumb/Breadcrumb";
import HospedesCards from "../../../components/hospedes/HospedesCards/HospedesCards";
const UniControloHospedes = () => {
  return (
    <section>
      <Breadcrumb />

      <div className="container mx-auto my-16 w-4/6 rounded-2xl  bg-terciary-300 py-20 ">
        <div className="flex gap-10 px-12">
          <div>
            <HospedesMenu activeLink="hospedes" />
          </div>

          <div className="ml-10">
            <div className="mb-7 text-3xl font-semibold">Hóspedes</div>
            <div className="mb-5 font-bold">Hóspedes Atuais</div>
            <HospedesCards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniControloHospedes;
