import { useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement } from "../../context/AdvertisementController";
import AdvertisementInfoComponent from "../anuncio/AdvertisementInfoComponent";
import { toast } from "react-toastify";
import useAdvertisementService from "../../hooks/advertisementService";
import Button from "../utils/Button";
import { FormProvider, useForm } from "react-hook-form";

const FormSobreCasa = () => {
  // contexts
  const incrementStep = useIncrementStep();
  const advertisement = useAdvertisement();

  /* Form */
  const methods = useForm();

  /* Services */
  const { updateAdvertisement } = useAdvertisementService();

  const nextStep = async (data) => {
    const { error } = await updateAdvertisement({ ...advertisement, ...data }, advertisement.id);
    if (error) return toast.success("Erro a gravar a informação");
    incrementStep();
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

export default FormSobreCasa;
