import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { useSetAdvertisementProperty, useAdvertisement } from "../../context/AdvertisementController";
import { updateAdvertisement } from "../../services/advertisementService";
import HouseCapacityComponent from "../anuncio/HouseCapacityComponent";

const FormPasso1 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e) => {
    e.preventDefault();

    const { data, error } = await updateAdvertisement({ tenantNumber: advertisement.tenantNumber }, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeAdvertisementProperty = (property, value) => {
    setAdvertisementProperty(property, value);
  };

  return (
    <section className="w-full px-0 lg:px-40">
      <div className="flex">
        <HouseCapacityComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
      </div>

      <div>
        <button
          type="button"
          className="w-full items-center justify-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg lg:w-44"
          onClick={(e) => nextStep(e)}
        >
          Seguinte &#8594;
        </button>
      </div>
    </section>
  );
};

export default FormPasso1;
