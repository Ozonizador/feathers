import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import Input from "../utils/Input";
import {
  ADVERTISEMENT_PROPERTIES,
  EXPENSES_TYPE,
  INCLUSIVE_EXPENSES,
} from "../../models/advertisement";
import classNames from "classnames";
import {
  useAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";
import { updateAdvertisement } from "../../services/advertisementService";
import PricesComponent from "../anuncio/PricesComponent";

const FormPasso6 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e) => {
    e.preventDefault();

    await updateAdvertisement(advertisement, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeTypeProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };
  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="mb-28 text-2xl font-bold text-gray-700">Vamos a valores!</div>
      <div className="flex flex-col">
        <PricesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

      <button
        type="button"
        className="mt-16 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
    </section>
  );
};

export default FormPasso6;
