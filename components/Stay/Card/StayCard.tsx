import Image from "next/image";
import { EXPENSES_TO_TEXT, TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { Reservation } from "../../../models/reservation";
import img1 from "../../../public/images/bed6.jpg";

interface StayCardProps {
  reservation: Reservation;
}

const StayCard = ({ reservation }: StayCardProps) => {
  const { advertisement } = reservation;
  return (
    <div>
      <div className="w-96 rounded-lg border-2 border-terciary-200 bg-white p-0">
        <div className="flex">
          <div className="relative h-32 w-28">
            <Image src={img1} alt="Foto Quarto" layout="fill" className="rounded-l-lg object-cover " />
          </div>
          <div className="ml-4">
            <div className="flex w-full flex-col  justify-between">
              <div className="mb-3 mt-3 text-base font-bold">
                {TYPE_ADVERTISEMENT[advertisement.type]} - {advertisement.title}
              </div>
              <div className="mb-1 text-xl font-bold text-primary-500">{advertisement.monthRent}€/mês</div>
              {advertisement.expenses?.inclusive && (
                <div className="text-base text-secondary-300">{EXPENSES_TO_TEXT[advertisement.expenses.inclusive]}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayCard;
