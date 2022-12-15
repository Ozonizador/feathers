import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import PricesComponent from "../anuncio/PricesComponent";
import Button from "../utils/Button";

const FormPrices = () => {
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e) => {
    e.preventDefault();
    incrementStep();
  };

  const changeTypeProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-20 w-full lg:w-5/6">
      <div className="mb-28 text-2xl font-bold text-gray-700">Vamos a valores!</div>
      <div className="flex flex-col">
        <PricesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

      <div className="flex gap-2">
        <div className="w-1/2">
          <Button onClick={(e) => decrementStep()} type="button">
            Voltar Atrás
          </Button>
        </div>
        <div className="w-1/2">
          <Button onClick={nextStep} type="button">
            Seguinte &#8594;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormPrices;
