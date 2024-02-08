import Image from "next/image";
import { TYPE_ADVERTISEMENT } from "../../../models/advertisement";
import { ReservationWithAdvertisement } from "../../../models/reservation";
import ExpensesComponent from "../../anuncio/ExpensesComponent";
import { useTranslation } from "next-i18next";
interface StayCardProps {
  stay: ReservationWithAdvertisement;
}

const StayCard = ({ stay }: StayCardProps) => {
  const { t } = useTranslation();
  const { advertisement } = stay;
  return (
    <div className="w-full rounded-lg border-2 border-terciary-200 bg-white p-0 md:w-fit lg:w-fit">
      <div className="flex">
        <div className="relative w-36">
          {advertisement.photos && advertisement.photos.length > 0 && (
            <Image src={advertisement.photos[0].url} alt="Foto Quarto" fill className="rounded-l-lg object-cover" />
          )}
        </div>
        <div className="mx-2 lg:mx-4">
          <div className="flex w-full flex-col justify-between">
            <div className="mb-1 mt-1 text-sm font-bold lg:mb-3 lg:mt-3 lg:text-base">
              {t(TYPE_ADVERTISEMENT[advertisement.type])} - {advertisement.title}
            </div>
            <div className="mb-1 text-base font-bold text-primary-500 lg:text-xl">
              {t("advertisements:price_month", { price: advertisement.month_rent })}
            </div>
            <ExpensesComponent expenses={advertisement.expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayCard;
