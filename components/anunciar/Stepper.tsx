import classNames from "classnames";
import React from "react";
import { useCurrentStep } from "../../context/AnunciarProvider";
import { useTranslation } from "next-i18next";

export default function Stepper() {
  const { t } = useTranslation();
  const currentStep = useCurrentStep();
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden pb-4 pt-8 lg:block">
        <div>
          <div className="flex items-center justify-center">
            <div className="flex-auto border-t-2 border-primary-500"></div>

            {/* PASSO */}
            <StepIcon stepNumber={0} text={t("advertisements:add_advert.step", { count: 1 })} />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 1,
                "border-primary-500": currentStep >= 1,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={1} text={t("advertisements:add_advert.step", { count: 2 })} />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 2,
                "border-primary-500": currentStep >= 2,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={2} text={t("advertisements:add_advert.step", { count: 3 })} />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 3,
                "border-primary-500": currentStep >= 3,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={3} text={t("advertisements:add_advert.step", { count: 4 })} />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 4,
                "border-primary-500": currentStep >= 4,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={4} text={t("advertisements:add_advert.step", { count: 5 })} />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 5,
                "border-primary-500": currentStep >= 5,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={5} text={t("advertisements:add_advert.step", { count: 6 })} />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 6,
                "border-primary-500": currentStep >= 6,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={6} text={t("advertisements:add_advert.step", { count: 7 })} />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 7,
                "border-primary-500": currentStep >= 7,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={7} text={t("advertisements:add_advert.step", {count: 8})} />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 8,
                "border-primary-500": currentStep >= 8,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={8} text={t("advertisements:add_advert.step", {count: 9})} />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 9,
                "border-primary-500": currentStep >= 9,
              })}
            ></div>
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
        className={classNames("h-10 w-10 rounded-full py-2 text-center", {
          "bg-primary-500": currentStep >= stepNumber,
          "bg-terciary-200": stepNumber > currentStep,
        })}
      >
        &#10004;
      </div>
      <div className={`absolute top-0 -ml-10 mt-14 w-32 text-center text-xs font-medium uppercase ${
       currentStep >= stepNumber ? "text-black" : "text-terciary-200"}`}>
        {text}
      </div>
    </div>
  );
};
