import Image from "next/image";
import { EXPENSES_TO_TEXT, TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { Stay, StayGuest } from "../../../models/stay";
import NoPhotoAvailable from "../../../public/images/imageNotAvailable.png";
interface StayCardProps {
  stay: StayGuest;
}

const StayCard = ({ stay }: StayCardProps) => {
  const { advertisement } = stay;
  return (
    <div>
      <div className="w-96 rounded-lg border-2 border-terciary-200 bg-white p-0">
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
