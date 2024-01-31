import { FaDog } from "react-icons/fa";
import { GiCigarette, GiPartyPopper, GiSittingDog } from "react-icons/gi";
import { MdSmokeFree } from "react-icons/md";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";
import { useTranslation } from "next-i18next";
import { TbBalloonOff } from "react-icons/tb";

const AdvertConditions = () => {
  const { t } = useTranslation();
  const advertisement = useGetSingleAdvertisement();
  return (
    <div className="mt-3 flex h-fit flex-col gap-3 rounded-lg px-3 py-2 shadow-md lg:mt-0">
      <div className="flex w-full justify-center text-2xl font-bold">{t("advertisements:house_conditions")}</div>
      <div className="mb-2 flex w-full flex-row justify-center gap-2">
        <div className="flex flex-col items-center p-1 align-middle text-secondary-500">
          {advertisement && advertisement.house_rules.animalsAllowed ? (
            <FaDog className="h-11 w-11 rounded-full bg-terciary-300 p-2" />
          ) : (
            <GiSittingDog className="h-11 w-11 rounded-full bg-terciary-300 p-2" />
          )}
          <div className="mt-3 text-center text-sm">
            {advertisement && advertisement.house_rules.animalsAllowed ? t("allowed") : t("not_allowed")}
          </div>
        </div>

        <div className="flex flex-col items-center p-1 align-middle text-secondary-500">
          {advertisement && advertisement.house_rules.eventsAllowed ? (
            <GiPartyPopper className="h-11 w-11 rounded-full bg-terciary-300 p-2" />
          ) : (
            <TbBalloonOff className="h-11 w-11 rounded-full bg-terciary-300 p-2" />
          )}
          <div className="mt-3 text-center text-sm">
            {advertisement && advertisement.house_rules.eventsAllowed ? t("allowed") : t("not_allowed")}
          </div>
        </div>

        <div className="flex  flex-col items-center p-1 align-middle text-secondary-500">
          {advertisement && advertisement.house_rules.smokeAllowed ? (
            <GiCigarette className="h-11 w-11 rounded-full bg-terciary-300 p-2" />
          ) : (
            <MdSmokeFree className="h-11 w-11 rounded-full bg-terciary-300 p-2" />
          )}

          <div className="mt-3 text-center text-sm">
            {advertisement && advertisement.house_rules.smokeAllowed ? t("allowed") : t("not_allowed")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertConditions;
