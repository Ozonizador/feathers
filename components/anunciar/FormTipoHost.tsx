import { useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import HostFlexTypeComponent from "../anuncio/HostFlexTypeComponent";
import Button from "../utils/Button";
import { toast } from "react-toastify";

const FormTipoHost = () => {
  const incrementStep = useIncrementStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextStep = async (e) => {
    e.preventDefault();

    const { error } = await updateAdvertisement(advertisement, advertisement.id);
    if (error) return toast.error(error.message);
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
