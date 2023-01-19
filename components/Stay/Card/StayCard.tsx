import Image from "next/image";
import { checkIfExpensesIncluded } from "../../../helpers/advertisementHelper";
import { TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { StayWithReservation } from "../../../models/stay";
import NoPhotoAvailable from "../../../public/images/imageNotAvailable.png";
interface StayCardProps {
  stay: StayWithReservation;
}

const StayCard = ({ stay }: StayCardProps) => {
  const { advertisement } = stay;
  return (
    <div className="w-full rounded-lg border-2 border-terciary-200 bg-white p-0 lg:w-1/2">
      <div className="flex">
        <div className="relative h-32 w-28">
          <Image
            src={(advertisement.photos && advertisement.photos[0].url) || NoPhotoAvailable}
            alt="Foto Quarto"
            layout="fill"
            className="rounded-l-lg object-cover"
          />
        </div>
        <div className="ml-2 lg:ml-4">
          <div className="flex w-full flex-col justify-between">
            <div className="mb-1 mt-1 text-sm font-bold lg:mb-3 lg:mt-3 lg:text-base">
              {TYPE_ADVERTISEMENT[advertisement.type]} - {advertisement.title}
            </div>
            <div className="mb-1 text-base font-bold text-primary-500 lg:text-xl">{advertisement.month_rent}€/mês</div>
            {advertisement.expenses?.services && (
              <div className="text-xs text-secondary-300 lg:text-base">
                {checkIfExpensesIncluded(advertisement.expenses.services)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayCard;
