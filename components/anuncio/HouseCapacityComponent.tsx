import { BiBed } from "react-icons/bi";
import { GiPersonInBed } from "react-icons/gi";
import { MdPeopleOutline, MdOutlineBathtub } from "react-icons/md";
import Advertisement, { ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import QuantityInput from "../utils/QuantityInput";

interface HouseCapacityComponentProps {
  advertisement: Advertisement;
  onChange: (flexLabel, flexType) => void;
}

const HouseCapacityComponent = ({ advertisement, onChange }: HouseCapacityComponentProps) => {
  return (
    <>
      <div className="my-20">
        <div className="my-8 mt-20 flex items-center">
          <div className="flex items-center">
            <MdPeopleOutline className="text-2xl" />
          </div>
          <div className="w-5/12">
            <h2 className="ml-2 align-middle text-base  font-bold">Capacidade</h2>
          </div>
          <div>
            <QuantityInput
              initValue={advertisement.tenantNumber}
              onChange={onChange}
              property={ADVERTISEMENT_PROPERTIES.NUMBER_TENANT}
            />
          </div>
        </div>

        <div className="my-8 flex">
          <div className="flex items-center">
            <BiBed className="text-2xl" />
          </div>
          <div className="w-5/12">
            <h2 className="ml-2 align-middle text-base font-bold">Camas</h2>
          </div>
          <div>
            <QuantityInput
              property={ADVERTISEMENT_PROPERTIES.BEDS}
              initValue={advertisement.beds}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="my-8 flex">
          <div className="flex items-center">
            <GiPersonInBed className="text-2xl" />
          </div>
          <div className="w-5/12">
            <h2 className="ml-2 align-middle text-base font-bold">Quartos</h2>
          </div>
          <div>
            <QuantityInput
              property={ADVERTISEMENT_PROPERTIES.ROOMS}
              initValue={advertisement.rooms}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="my-8 flex">
          <div className="flex items-center">
            <MdOutlineBathtub className="text-2xl" />
          </div>
          <div className="w-5/12">
            <h2 className="ml-2 align-middle text-base  font-bold">Casas de Banho</h2>
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
    </>
  );
};

export default HouseCapacityComponent;
