import Image from "next/image";
import img1 from "../../../public/images/bed6.jpg";

const StayCard = () => {
  return (
    <div>
      {/* <div className="font-bold text-3xl">Informações gerais</div>
            <div className="font-bold text-xl text-gray-600 mt-7 mb-5">Estadia atual</div> */}
      <div className="w-96 rounded-lg border-2 border-terciary-200 bg-white p-0">
        <div className="flex">
          <div className="h-32 w-28">
            <Image src={img1} alt="Foto Quarto" height={128} width={112} className="rounded-l-lg object-cover " />
          </div>
          <div className="ml-2">
            <div className="flex w-full flex-col  justify-between">
              <div className="mb-4 mt-3 text-base font-bold">Quarto privado em Peniche</div>
              <div className="mb-2 text-xl font-bold text-primary-500">400€/mês</div>
              <div className="text-base text-secondary-300">Despesas excluídas</div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD FLOW */}
    </div>
  );
};

export default StayCard;
