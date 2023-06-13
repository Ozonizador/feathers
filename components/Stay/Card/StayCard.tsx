import Image from "next/image";
import { TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { ReservationAndAdvert } from "../../../models/reservation";
import ExpensesComponent from "../../anuncio/ExpensesComponent";
interface StayCardProps {
  stay: ReservationAndAdvert;
}

const StayCard = ({ stay }: StayCardProps) => {
  const { advertisement } = stay;
  return (
    <div className="w-full rounded-lg border-2 border-terciary-200 bg-white p-0 lg:w-1/2">
      <div className="flex">
        <div className="relative h-32 w-28 lg:h-36">
          {advertisement.photos && advertisement.photos.length > 0 && (
            <Image
              src={advertisement.photos[0].url}
              alt="Foto Quarto"
              layout="fill"
              className="rounded-l-lg object-cover"
            />
          )}
        </div>
        <div className="ml-2 lg:ml-4">
          <div className="flex w-full flex-col justify-between">
            <div className="mb-1 mt-1 text-sm font-bold lg:mb-3 lg:mt-3 lg:text-base">
              {TYPE_ADVERTISEMENT[advertisement.type]} - {advertisement.title}
            </div>
            <div className="mb-1 text-base font-bold text-primary-500 lg:text-xl">{advertisement.month_rent}€/mês</div>
            <ExpensesComponent expenses={advertisement.expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayCard;
