import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { useAdvertisement } from "../../context/AdvertisementController";
import AdvertisementInfoComponent from "../anuncio/AdvertisementInfoComponent";
import { toast } from "react-toastify";
import useAdvertisementService from "../../hooks/advertisementService";
import Button from "../utils/Button";
import { FormProvider, useForm } from "react-hook-form";

const FormPasso2 = () => {
  // contexts
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();
  const advertisement = useAdvertisement();

  /* Form */
  const methods = useForm();

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
    const { error } = await updateAdvertisement(advertisement, advertisement.id);
    if (error) {
      return toast.success("Erro a gravar a informação");
    }
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <FormProvider {...methods}>
      <section className="mx-auto w-full lg:container lg:w-5/6">
        <AdvertisementInfoComponent advertisement={advertisement} />

        <Button onClick={methods.handleSubmit(nextStep)} type="button">
          Seguinte &#8594;
        </Button>
      </section>
    </FormProvider>
  );
};

export default FormPasso2;
