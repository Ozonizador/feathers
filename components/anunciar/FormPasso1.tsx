import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import QuantityInput from "../utils/QuantityInput";
import { BiBed } from "react-icons/bi";
import { MdPeopleOutline } from "react-icons/md";
import { MdOutlineBathtub } from "react-icons/md";
import { GiPersonInBed } from "react-icons/gi";
import {
  useSetAdvertisementProperty,
  useAdvertisement,
} from "../../context/AdvertisementController";
import { ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";

const FormPasso1 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisementProperty(property, value);
  };

  return (
    <section className="my-20 w-full  px-40 xl:w-1/2 ">
      <div className="my-8 flex items-center">
        <div className="flex items-center">
          <MdPeopleOutline className="text-2xl" />
        </div>
        <div className="w-3/5">
          <h2 className="ml-2 align-middle text-base  font-bold">Capacidade</h2>
        </div>
        <div>
          <QuantityInput
            initValue={advertisement.tenantNumber}
            onChange={changeAdvertisementProperty}
            property={ADVERTISEMENT_PROPERTIES.NUMBER_TENANT}
          />
        </div>
      </div>

      <div className="my-8 flex">
        <div className="flex items-center">
          <BiBed className="text-2xl" />
        </div>
        <div className="w-3/5">
          <h2 className="ml-2 align-middle text-base font-bold">Camas</h2>
        </div>
        <div>
          <QuantityInput
            property={ADVERTISEMENT_PROPERTIES.BEDS}
            initValue={advertisement.beds}
            onChange={changeAdvertisementProperty}
          />
        </div>
      </div>

      <div className="my-8 flex">
        <div className="flex items-center">
          <GiPersonInBed className="text-2xl" />
        </div>
        <div className="w-3/5">
          <h2 className="ml-2 align-middle text-base font-bold">Quartos</h2>
        </div>
        <div>
          <QuantityInput
            property={ADVERTISEMENT_PROPERTIES.ROOMS}
            initValue={advertisement.rooms}
            onChange={changeAdvertisementProperty}
          />
        </div>
      </div>

      <div className="my-8 flex">
        <div className="flex items-center">
          <MdOutlineBathtub className="text-2xl" />
        </div>
        <div className="w-3/5">
          <h2 className="ml-2 align-middle text-base  font-bold">Casas de Banho</h2>
        </div>
        <div>
          <QuantityInput
            property={ADVERTISEMENT_PROPERTIES.BATHROOMS}
            initValue={advertisement.bathrooms}
            onChange={changeAdvertisementProperty}
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-12 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
    </section>
  );
};

export default FormPasso1;
