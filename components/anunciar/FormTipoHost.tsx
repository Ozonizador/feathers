import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import HostFlexTypeComponent from "../anuncio/HostFlexTypeComponent";
import Button from "../utils/Button";

const FormTipoHost = () => {
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    incrementStep();
  };

  const changeTypeProperty = (typeFlex: string, value: any) => {
    setAdvertisementProperty(typeFlex, value);
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="my-28 text-2xl font-bold text-gray-700 lg:text-4xl">
        Azares acontecem e temos de estar preparados. Estabeleça a sua política de cancelamento.
      </div>

      <HostFlexTypeComponent advertisement={advertisement} onChange={changeTypeProperty} />

      <div className="mt-10 w-full">
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
      </div>
    </section>
  );
};

export default FormTipoHost;
