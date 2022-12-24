import { FaDog } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { MdSmokeFree } from "react-icons/md";
import { useGetSingleAdvertisement } from "../../../../context/ShowingSingleAdvertisementProvider";

const AdvertConditions = () => {
  const advertisement = useGetSingleAdvertisement();
  return (
    <div className="mt-3 flex flex-col gap-3 lg:mt-0 lg:w-1/3">
      <div className="flex w-full justify-center text-2xl font-bold">Condições da casa</div>
      <div className="mb-2 flex flex-row justify-center gap-5 rounded-lg shadow-2xl lg:flex-col lg:justify-around">
        <div className="flex flex-col items-center p-3 align-middle text-secondary-500">
          <FaDog className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
          <div className="mt-3 text-sm">{advertisement.house_rules.animalsAllowed ? "Permitido" : "Não Permitido"}</div>
        </div>

        <div className="flex flex-col items-center p-3 align-middle text-secondary-500">
          <GiPartyPopper className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
          <div className="mt-3 text-sm">{advertisement.house_rules.eventsAllowed ? "Permitido" : "Não Permitido"}</div>
        </div>

        <div className="flex  flex-col items-center p-3 align-middle text-secondary-500">
          <MdSmokeFree className="h-12 w-12 rounded-full bg-terciary-300 p-2" />
          <div className="mt-3 text-sm">{advertisement.house_rules.smokeAllowed ? "Permitido" : "Não Permitido"}</div>
        </div>
      </div>
    </div>
  );
};

export default AdvertConditions;
