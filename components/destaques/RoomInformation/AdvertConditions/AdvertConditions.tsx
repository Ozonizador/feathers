import { FaDog } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { MdSmokeFree } from "react-icons/md";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";

const AdvertConditions = () => {
  const advertisement = useGetSingleAdvertisement();
  return (
    <div className="mt-3 flex flex-col gap-3 rounded-lg px-3 py-2 shadow-2xl lg:mt-0">
      <div className="flex w-full justify-center text-2xl font-bold">Condições da casa</div>
      <div className="mb-2 flex w-full flex-row justify-center gap-2">
        <div className="flex flex-col items-center p-1 align-middle text-secondary-500">
          <FaDog className="h-11 w-11 rounded-full bg-terciary-300 p-2" />
          <div className="mt-3 text-center text-sm">
            {advertisement && advertisement.house_rules.animalsAllowed ? "Permitido" : "Não Permitido"}
          </div>
        </div>

        <div className="flex flex-col items-center p-1 align-middle text-secondary-500">
          <GiPartyPopper className="h-11 w-11 rounded-full bg-terciary-300 p-2" />
          <div className="mt-3 text-center text-sm">
            {advertisement && advertisement.house_rules.eventsAllowed ? "Permitido" : "Não Permitido"}
          </div>
        </div>

        <div className="flex  flex-col items-center p-1 align-middle text-secondary-500">
          <MdSmokeFree className="h-11 w-11 rounded-full bg-terciary-300 p-2" />
          <div className="mt-3 text-center text-sm">
            {advertisement && advertisement.house_rules.smokeAllowed ? "Permitido" : "Não Permitido"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertConditions;
