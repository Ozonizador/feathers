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
    <div className="w-96 rounded-lg border-2 border-terciary-200 bg-white p-0 lg:w-full">
      <div className="flex">
        <div className="relative h-32 w-28">
          <Image
            src={(advertisement.photos && advertisement.photos[0].url) || NoPhotoAvailable}
            alt="Foto Quarto"
            layout="fill"
            className="rounded-l-lg object-cover "
          />
        </div>
        <div className="ml-4">
          <div className="flex w-full flex-col  justify-between">
            <div className="mb-3 mt-3 text-base font-bold">
              {TYPE_ADVERTISEMENT[advertisement.type]} - {advertisement.title}
            </div>
            <div className="mb-1 text-xl font-bold text-primary-500">{advertisement.month_rent}€/mês</div>
            {advertisement.expenses?.services && (
              <div className="text-base text-secondary-300">
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
