import { useTranslation } from "next-i18next";
import Button from "../utils/Button";
import Checkbox from "../utils/Checkbox";
import Input from "../utils/Input";
import { toast } from "react-toastify";
import { useState } from "react";
import { useCurrentReason, useIncrementStep, useSetCurrentReason } from "../../context/DesativarProvider";

const DesativarContaForm = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [option, setOption] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const incrementStep = useIncrementStep();
  const setCurrentReason = useSetCurrentReason();
  const currentReason = useCurrentReason();

  const toastError = () => {
    switch (option) {
      case 0:
        toast.error(t("account:selectedError"));
        break;
      case 1:
      case 2:
      case 3:
      case 4:
        setCurrentReason(reason);
        incrementStep();
        break;
      default:
        toast.error("Erro: 1001 - Contact: info@unihosts.pt");
        break;
    }
  };

  return (
    <div className="mx-auto py-6">
      <section className="rounded-md p-4" id="exit-form">
        <div className="flex items-center text-xl">
          <div className="pr-4">{t("account:reason_1")}</div>
          <Checkbox
            onChange={() => {
              setOption(1);
              setIsOpen(false);
              setReason(t("account:reason_1"));
            }}
            checked={option == 1}
            name=""
          ></Checkbox>
        </div>
        <br />
        <div className="flex items-center text-xl">
          <div className="pr-4">{t("account:reason_2")}</div>
          <Checkbox
            onChange={() => {
              setOption(2);
              setIsOpen(false);
              setReason(t("account:reason_2"));
            }}
            checked={option == 2}
            name=""
          ></Checkbox>
        </div>
        <br />
        <div className="flex items-center text-xl">
          <div className="pr-4">{t("account:reason_3")}</div>
          <Checkbox
            onChange={() => {
              setOption(3);
              setIsOpen(false);
              setReason(t("account:reason_3"));
            }}
            checked={option == 3}
            name=""
          ></Checkbox>
        </div>
        <br />
        <div className="flex items-center text-xl">
          <div className="pr-4">{t("account:other")}</div>
          <Checkbox
            onChange={() => {
              setIsOpen(!isOpen);
              setOption(4);
            }}
            checked={isOpen}
            name=""
          ></Checkbox>
        </div>
        {isOpen && <Input name="other_reason"></Input>}
        <br />
        <section className="flex justify-end pr-20 pt-10">
          <div className="w-1/6" onClick={toastError}>
            <Button
              onClick={(e) => {
                toastError;
                if (option == 4) {
                  // @ts-ignore
                  setReason(document.querySelector('input[name="other_reason"]').value);
                }
              }}
              type={"button"}
              variant={option == 0 ? "disabled" : "primary"}
            >
              {t("account:continue")}
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default DesativarContaForm;
