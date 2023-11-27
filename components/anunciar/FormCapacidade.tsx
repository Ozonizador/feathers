import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisement } from "../../context/AdvertisementController";
import HouseCapacityComponent from "../anuncio/HouseCapacityComponent";
import Button from "../utils/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

const FormCapacidade = () => {
  const { t } = useTranslation();
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();
  const advertisement = useAdvertisement();
  const setAdvertisement = useSetAdvertisement();

  /* Form */
  const methods = useForm();

  const nextStep = async (data: any) => {
    setAdvertisement({ ...advertisement, ...data });
    incrementStep();
  };

  return (
    <FormProvider {...methods}>
      <section className="mt-10 w-full lg:px-20">
        <HouseCapacityComponent advertisement={advertisement} />

        <div className="flex flex-col items-center gap-5 lg:flex-row xl:flex-row">
          <div className="w-48">
            <Button onClick={decrementStep} type="button">
              {t("go_back")}
            </Button>
          </div>
          <div className="w-48">
            <Button type="button" onClick={methods.handleSubmit(nextStep)}>
              {t("next_step")} &#8594;
            </Button>
          </div>
        </div>
      </section>
    </FormProvider>
  );
};

export default FormCapacidade;
