import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import HostFlexTypeComponent from "../anuncio/HostFlexTypeComponent";
import Button from "../utils/Button";
import { useTranslation } from "next-i18next";

const FormTipoHost = () => {
  const { t } = useTranslation();
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
    <section className="container mx-auto my-10 w-5/6">
      <div className="my-10 text-xl font-bold text-gray-700">{t("advertisements:add_advert.type_host_title")}</div>

      <HostFlexTypeComponent advertisement={advertisement} onChange={changeTypeProperty} />

      <div className="mt-10 w-full">
        <div className="flex flex-col items-center gap-2 xl:flex-row">
          <div className="w-32">
            <Button onClick={decrementStep} type="button">
              {t("go_back")}
            </Button>
          </div>
          <div className="w-32">
            <Button onClick={nextStep} type="button">
              {t("next_step", { interpolation: { escapeValue: false } })}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormTipoHost;
