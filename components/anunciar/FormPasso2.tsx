import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import AdvertisementInfoComponent from "../anuncio/AdvertisementInfoComponent";
import { toast } from "react-toastify";
import useAdvertisementService from "../../hooks/advertisementService";
import Button from "../utils/Button";

const FormPasso2 = () => {
  // contexts
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();
  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextStep = async (e) => {
    e.preventDefault();

    // confirmar se esta tudo preenchido
    const { title, description } = advertisement;

    if (!title || !description) {
      toast.error("Campos por preencher.");
      return;
    }

    // proximo passo
    const { data, error } = await updateAdvertisement(advertisement, advertisement.id);
    if (error) {
      return toast.success("Erro a gravar a informação");
    }
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const changeTypeProperty = (label, value) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="mx-auto my-20 w-full lg:container lg:w-5/6">
      <AdvertisementInfoComponent advertisement={advertisement} onChange={changeTypeProperty} />

      <Button onClick={nextStep} type="button">
        Seguinte &#8594;
      </Button>
    </section>
  );
};

export default FormPasso2;
