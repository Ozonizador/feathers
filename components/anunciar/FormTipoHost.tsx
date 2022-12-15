import { useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import HostFlexTypeComponent from "../anuncio/HostFlexTypeComponent";
import Button from "../utils/Button";

const FormTipoHost = () => {
  const incrementStep = useIncrementStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e) => {
    e.preventDefault();
    incrementStep();
  };

  const changeTypeProperty = (typeFlex, value) => {
    setAdvertisementProperty(typeFlex, value);
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="my-28 text-4xl font-bold text-gray-700">
        Azares acontecem e temos de estar preparados. Estabeleça a sua política de cancelamento.
      </div>

      <HostFlexTypeComponent advertisement={advertisement} onChange={changeTypeProperty} />

      <Button onClick={nextStep} type="button">
        Seguinte &#8594;
      </Button>
    </section>
  );
};

export default FormTipoHost;
