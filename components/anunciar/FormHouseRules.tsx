import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import HouseRulesComponent from "../anuncio/HouseRulesComponent";
import Button from "../utils/Button";

const FormHouseRules = () => {
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
      <div className="w-full">
        <div className="mb-28 font-bold text-gray-700 lg:text-2xl">Falemos agora sobre condições e regras da casa</div>
        <HouseRulesComponent advertisement={advertisement} onChange={changeTypeProperty} />
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

export default FormHouseRules;
