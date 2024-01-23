import classNames from "classnames";
import React from "react";
import { useCurrentStep } from "../../context/AnunciarProvider";
import { useTranslation } from "next-i18next";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Stepper() {
  const { t } = useTranslation();
  const currentStep = useCurrentStep();

  const steps = Array.from({ length: 9 }, (_, index) => index + 1);
  function chunkArray(array: number[], size: number) {
    return Array.from({ length: Math.ceil(array.length / size) }, (v, i) => array.slice(i * size, i * size + size));
  }
  const chunkSteps = Array.from({ length: 8 }, (_, index) => index + 1);
  const chunk = chunkArray(chunkSteps, 2);
  let chunkIndex;
  currentStep < 2
    ? (chunkIndex = 0)
    : currentStep >= 2 && currentStep < 4
    ? (chunkIndex = 1)
    : currentStep >= 4 && currentStep < 6
    ? (chunkIndex = 2)
    : (chunkIndex = 3);

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden pb-4 pt-8 lg:block">
        <div>
          <div className="flex items-center justify-center">
            <div className="flex-auto border-t-2 border-primary-500"></div>

            {steps.map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                {/* PASSO */}
                <StepIcon stepNumber={stepNumber} text={t("advertisements:add_advert.step", { count: stepNumber })} />
                <div
                  className={classNames("flex-auto border-t-2", {
                    "border-terciary-500": currentStep < stepNumber,
                    "border-primary-500": currentStep >= stepNumber,
                  })}
                ></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-4 pt-8 lg:hidden">
        <div>
          <div className="flex items-center justify-center">
            <div className="flex-auto border-t-2 border-primary-500"></div>
            {chunk[chunkIndex].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                {/* PASSO */}
                <StepIcon stepNumber={stepNumber} text={t("advertisements:add_advert.step", { count: stepNumber })} />
                <div
                  className={classNames("flex-auto border-t-2", {
                    "border-terciary-500": currentStep < stepNumber,
                    "border-primary-500": currentStep >= stepNumber,
                  })}
                ></div>
              </React.Fragment>
            ))}
            <MdKeyboardDoubleArrowRight />
            <div className="flex-auto border-t-2 border-terciary-500"></div>
            <React.Fragment>
              {/* PASSO */}
              <StepIcon stepNumber={10} text={t("advertisements:add_advert.step", { count: 10 })} />
              <div className="flex-auto border-t-2 border-terciary-500"></div>
            </React.Fragment>
          </div>
        </div>
      </div>
    </>
  );
}

interface StepIconProps {
  stepNumber: number;
  text: string;
}

/**
 * O icon que coloca o passo.
 * @param stepNumber - qual e o passo em que esta
 * @param text - texto para a label
 * @returns
 */
const StepIcon = ({ stepNumber, text }: StepIconProps) => {
  const currentStep = useCurrentStep();
  return (
    <div className="relative flex items-center text-white">
      <div
        className={classNames("h-8 w-8 rounded-full py-1 text-center", {
          "bg-black": stepNumber === 10,
          "bg-primary-500": currentStep >= stepNumber,
          "bg-terciary-200": stepNumber > currentStep && stepNumber < 10,
        })}
      >
        &#10004;
      </div>
      <div
        className={`absolute top-0 -ml-10 mt-14 w-32 text-center text-xs font-medium uppercase ${
          currentStep >= stepNumber || stepNumber === 10 ? "text-black" : "text-terciary-200"
        }`}
      >
        {stepNumber === 10 ? "STEP 9" : text}
      </div>
    </div>
  );
};
