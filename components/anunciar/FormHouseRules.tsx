import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import HouseRulesComponent from "../anuncio/HouseRulesComponent";
import Button from "../utils/Button";

const FormHouseRules = () => {
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    incrementStep();
  };

  const changeTypeProperty = (label: string, value: any) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-20 w-full px-10 lg:w-5/6">
      <div className="w-full">
        <div className="font-bold text-gray-700 lg:mb-28 lg:text-2xl">
          Falemos agora sobre condições e regras da casa
        </div>
        <HouseRulesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

      <div className="mt-1 flex flex-col justify-center gap-5 lg:flex-row lg:px-32">
        <div className="mx-auto w-5/6 lg:w-2/3">
          <Button onClick={(e) => decrementStep()} type="button">
            Voltar Atrás
          </Button>
        </div>
        <div className="mx-auto w-5/6 lg:w-2/3">
          <Button onClick={nextStep} type="button">
            Seguinte &#8594;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormHouseRules;
