import Image from "next/image";
import { BiInfoCircle } from "react-icons/bi";
import { checkIfExpensesIncluded } from "../../../helpers/advertisementHelper";
import { TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { StayWithReservation } from "../../../models/stay";
import NoPhotoAvailable from "../../../public/images/imageNotAvailable.png";
import RoomUtilitesPopover from "../../roomUtils/roomUtilitiesPopover";
interface StayCardProps {
  stay: StayWithReservation;
}

const StayCard = ({ stay }: StayCardProps) => {
  const { advertisement } = stay;
  return (
    <div className="w-full rounded-lg border-2 border-terciary-200 bg-white p-0 lg:w-1/2">
      <div className="flex">
        <div className="relative h-32 w-28 lg:h-36">
          <Image
            src={
              (advertisement.photos && advertisement.photos.length > 0 && advertisement.photos[0].url) ||
              NoPhotoAvailable
            }
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
            {advertisement.expenses && advertisement.expenses?.services && (
              <div className="relative mb-2 text-center text-base">
                <div className="group flex cursor-pointer gap-2 text-base">
                  <RoomUtilitesPopover expenses={advertisement.expenses} />
                  <p className="break-words text-left text-xs lg:text-base">
                    {checkIfExpensesIncluded(advertisement.expenses.services)}
                  </p>
                  <BiInfoCircle className="my-auto" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayCard;
