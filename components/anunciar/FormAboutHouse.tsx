import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import { useIncrementStep } from "../../context/AnunciarProvider";
import AboutHouseComponent from "../anuncio/AboutHouseComponent";
import Button from "../utils/Button";

const FormAboutHouse = () => {
  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();
  const incrementStep = useIncrementStep();

  const nextStep = async (e) => {
    e.preventDefault();
    incrementStep();
  };

  const changeAdvertisementProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-10 w-full lg:w-5/6">
      <div className="w-full">
        <div className="mb-28 text-center text-2xl font-bold text-gray-700 lg:text-left">Sobre a sua casa</div>
        <AboutHouseComponent advertisement={advertisement} onChange={changeAdvertisementProperty} />
      </div>
      <div className="mt-10 w-1/2">
        <Button onClick={nextStep} type="button">
          Seguinte &#8594;
        </Button>
      </div>
    </section>
  );
};

export default FormAboutHouse;
