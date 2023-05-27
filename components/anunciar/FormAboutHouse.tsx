import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import AboutHouseComponent from "../anuncio/AboutHouseComponent";
import Button from "../utils/Button";

const FormAboutHouse = () => {
  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();

  const nextStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    incrementStep();
  };

  const changeAdvertisementProperty = (label: string, value: any) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-10 w-full lg:w-5/6">
      <div className="w-full">
        <div className="mb-28 text-center text-2xl font-bold text-gray-700 lg:text-left">Sobre a sua casa</div>
        <AboutHouseComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
      </div>

      <div className="mt-5 flex flex-col justify-center gap-5 lg:flex-row lg:px-32">
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

export default FormAboutHouse;
