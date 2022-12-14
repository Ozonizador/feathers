import { useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import PricesComponent from "../anuncio/PricesComponent";
import Button from "../utils/Button";
import { toast } from "react-toastify";

const FormPrices = () => {
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

  const changeTypeProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-20 w-full lg:w-5/6">
      <div className="mb-28 text-2xl font-bold text-gray-700">Vamos a valores!</div>
      <div className="flex flex-col">
        <PricesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

      <div className="w-1/2">
        <Button onClick={nextStep} type="button">
          Seguinte &#8594;
        </Button>
      </div>
    </section>
  );
};

export default FormPrices;
