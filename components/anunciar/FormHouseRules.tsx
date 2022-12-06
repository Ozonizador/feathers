import { useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import useAdvertisementService from "../../hooks/advertisementService";
import HouseRulesComponent from "../anuncio/HouseRulesComponent";
import Button from "../utils/Button";
import { toast } from "react-toastify";

const FormHouseRules = () => {
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
      <div className="w-full">
        <div className="mb-28 font-bold text-gray-700 lg:text-2xl">Falemos agora sobre condições e regras da casa</div>
        <HouseRulesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

      <Button onClick={nextStep} type="button">
        Seguinte &#8594;
      </Button>
    </section>
  );
};

export default FormHouseRules;
