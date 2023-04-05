import { Controller } from "react-hook-form";
import { BiBed } from "react-icons/bi";
import { GiPersonInBed } from "react-icons/gi";
import { MdPeopleOutline, MdOutlineBathtub } from "react-icons/md";
import { Advertisement, ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import QuantityInput from "../utils/QuantityInput";

interface HouseCapacityComponentProps {
  advertisement: Advertisement;
}

const HouseCapacityComponent = ({ advertisement }: HouseCapacityComponentProps) => {
  return (
    <div className="my-5 flex flex-col gap-5 px-2">
      <div className="flex gap-2">
        <MdPeopleOutline size={32} />
        <div className="my-auto flex w-1/2 lg:w-2/12">
          <h2 className="my-auto ml-5 text-sm font-bold lg:text-base">Capacidade</h2>
        </div>
        <div>
          <Controller
            name={ADVERTISEMENT_PROPERTIES.NUMBER_TENANT}
            defaultValue={advertisement.tenant_number}
            render={({ field: { value, onChange } }) => <QuantityInput initValue={value} onChange={onChange} />}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <BiBed size={32} />
        <div className="my-auto flex w-1/2 lg:w-2/12">
          <h2 className="my-auto ml-5 text-sm font-bold lg:text-base">Camas</h2>
        </div>
        <div>
          <Controller
            name={ADVERTISEMENT_PROPERTIES.BEDS}
            defaultValue={advertisement.beds}
            render={({ field: { value, onChange } }) => <QuantityInput initValue={value} onChange={onChange} />}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <GiPersonInBed size={32} />
        <div className="my-auto flex w-1/2 lg:w-2/12">
          <h2 className="my-auto ml-5 text-sm font-bold lg:text-base">Quartos</h2>
        </div>
        <div>
          <Controller
            name={ADVERTISEMENT_PROPERTIES.ROOMS}
            defaultValue={advertisement.rooms}
            render={({ field: { value, onChange } }) => <QuantityInput initValue={value} onChange={onChange} />}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <MdOutlineBathtub size={32} />
        <div className="my-auto flex w-1/2 lg:w-2/12">
          <h2 className="my-auto ml-5 text-sm font-bold lg:text-base">Casas de Banho</h2>
        </div>
        <div>
          <Controller
            name={ADVERTISEMENT_PROPERTIES.BATHROOMS}
            defaultValue={advertisement.bathrooms}
            render={({ field: { value, onChange } }) => <QuantityInput initValue={value} onChange={onChange} />}
          />
        </div>
      </div>
    </div>
  );
};

export default HouseCapacityComponent;
