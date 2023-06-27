import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import AboutHouseComponent from "../anuncio/AboutHouseComponent";
import Button from "../utils/Button";

const FormAboutHouse = () => {
  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    incrementStep();
  };

  const changeAdvertisementProperty = (label: string, value: any) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="mx-auto my-5 w-full px-5 lg:w-5/6 lg:px-0">
      <div className="w-full">
        <div className="my-10 text-xl font-bold text-gray-700 lg:text-2xl">Sobre a sua casa</div>
        <AboutHouseComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
      </div>

      <div className="mt-5 flex gap-5">
        <div className="w-48">
          <Button onClick={decrementStep} type="button">
            Voltar Atrás
          </Button>
        </div>
        <div className="w-48">
          <Button onClick={nextStep} type="button">
            Seguinte &#8594;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormAboutHouse;
