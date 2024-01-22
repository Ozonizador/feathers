import { useDecrementStep, useIncrementStep } from "../../context/AnunciarProvider";
import { useAdvertisement, useSetAdvertisementProperty } from "../../context/AdvertisementController";
import HouseRulesComponent from "../anuncio/HouseRulesComponent";
import Button from "../utils/Button";
import { useTranslation } from "next-i18next";

const FormHouseRules = () => {
  const { t } = useTranslation();
  const incrementStep = useIncrementStep();
  const decrementStep = useDecrementStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    incrementStep();
  };

  const changeTypeProperty = (label: string, value: any) => {
    setAdvertisementProperty(label, value);
  };

  return (
    <section className="container mx-auto my-20 w-full px-10 lg:w-5/6">
      <div className="w-full">
        <div className="my-10 text-xl font-bold text-gray-700 lg:text-2xl">
          {t("advertisements:add_advert.house_rules_title")}
        </div>
        <HouseRulesComponent advertisement={advertisement} onChange={changeTypeProperty} />
      </div>

      <div className="mt-2 flex flex-col items-center gap-5 xl:flex-row">
        <div className="w-32">
          <Button onClick={decrementStep} type="button">
            {t("go_back")}
          </Button>
        </div>
        <div className="w-32">
          <Button onClick={nextStep} type="button">
            {t("next_step")} &#8594;
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FormHouseRules;
