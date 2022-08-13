import Image from "next/image";
import img1 from "../../../public/images/bed3.jpeg";

const DicasCard = () => {
  return (
    <section className="mt-16">
      <div className="text-x1 text-secondary-300">Dicas para si</div>
      <div className="mt-5 flex w-full flex-row justify-between gap-4">
        <div className="w-80 rounded-lg border-2 border-terciary-200 bg-white">
          <div className="flex">
            <div className="mr-4 h-32">
              <Image src={img1} alt="Foto Quarto" height={176} width={140} className="rounded-l-lg object-cover" />
            </div>
            <div className="w-11/12">
              <div className="mt-3 flex w-full  flex-row justify-between pr-4">
                <div className="text-base font-bold ">Procure responder sempre rapidamente aos pedidos de reserva</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-80 rounded-lg border-2 border-terciary-200 bg-white">
          <div className="flex">
            <div className="mr-4 h-32">
              <Image src={img1} alt="Foto Quarto" height={176} width={140} className="rounded-l-lg object-cover" />
            </div>
            <div className="w-11/12">
              <div className="mt-3 flex w-full  flex-row justify-between pr-4">
                <div className="text-base font-bold ">Procure responder sempre rapidamente aos pedidos de reserva</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DicasCard;
