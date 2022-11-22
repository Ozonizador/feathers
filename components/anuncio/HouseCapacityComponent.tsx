import { BiBed } from "react-icons/bi";
import { GiPersonInBed } from "react-icons/gi";
import { MdPeopleOutline, MdOutlineBathtub } from "react-icons/md";
import { Advertisement, ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import QuantityInput from "../utils/QuantityInput";

interface HouseCapacityComponentProps {
  advertisement: Advertisement;
  onChange: (flexLabel: string, flexType: unknown) => void;
}

const HouseCapacityComponent = ({ advertisement, onChange }: HouseCapacityComponentProps) => {
  return (
    <div>
      <div className="my-8 flex items-center">
        <div className="flex items-center">
          <MdPeopleOutline size={32} />
        </div>
        <div className="w-6/12">
          <h2 className="my-auto ml-3 align-middle text-base font-bold">Capacidade</h2>
        </div>
        <div>
          <QuantityInput
            initValue={advertisement.tenant_number}
            onChange={onChange}
            property={ADVERTISEMENT_PROPERTIES.NUMBER_TENANT}
          />
        </div>
      </div>

      <div className="my-8 flex items-center">
        <div className="flex items-center">
          <BiBed size={32} />
        </div>
        <div className="w-6/12">
          <h2 className="my-auto ml-3 align-middle text-base font-bold">Camas</h2>
        </div>
        <div>
          <QuantityInput property={ADVERTISEMENT_PROPERTIES.BEDS} initValue={advertisement.beds} onChange={onChange} />
        </div>
      </div>

      <div className="my-8 flex items-center">
        <div className="flex items-center">
          <GiPersonInBed size={32} />
        </div>
        <div className="w-6/12">
          <h2 className="my-auto ml-3 align-middle text-base font-bold">Quartos</h2>
        </div>
        <div>
          <QuantityInput
            property={ADVERTISEMENT_PROPERTIES.ROOMS}
            initValue={advertisement.rooms}
            onChange={onChange}
          />
        </div>
      </div>

      <div className="my-8 flex items-center">
        <div className="flex items-center">
          <MdOutlineBathtub size={32} />
        </div>
        <div className="w-6/12">
          <h2 className="my-auto ml-3 align-middle text-base font-bold">Casas de Banho</h2>
        </div>
        <div>
          <QuantityInput
            property={ADVERTISEMENT_PROPERTIES.BATHROOMS}
            initValue={advertisement.bathrooms}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HouseCapacityComponent;
