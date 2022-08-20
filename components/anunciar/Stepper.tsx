import classNames from "classnames";
import React from "react";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";

export default function Stepper() {
  const currentStep = useCurrentStep();
  return (
    <>
      {/* DESKTOP */}
      <div className="hidden p-5 lg:block">
        <div className="mx-4 p-4">
          <div className="flex items-center justify-center">
            <div className="flex-auto border-t-2 border-primary-500"></div>

            {/* PASSO */}
            <StepIcon stepNumber={1} text="Passo 1" />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 1,
                "border-primary-500": currentStep >= 1,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={2} text="Passo 2" />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 2,
                "border-primary-500": currentStep >= 2,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={3} text="Passo 3" />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 3,
                "border-primary-500": currentStep >= 3,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={4} text="Passo 4" />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 4,
                "border-primary-500": currentStep >= 4,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={5} text="Passo 5" />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 5,
                "border-primary-500": currentStep >= 5,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={6} text="Passo 6" />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 6,
                "border-primary-500": currentStep >= 6,
              })}
            ></div>

            {/* PASSO */}
            <StepIcon stepNumber={7} text="Passo 7" />
            <div
              className={classNames("flex-auto border-t-2", {
                "border-terciary-500": currentStep < 7,
                "border-primary-500": currentStep >= 7,
              })}
            ></div>

            {/* PASSO */}
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
        className={classNames("h-12 w-12 rounded-full py-3 text-center", {
          "bg-primary-500": currentStep >= stepNumber,
          "bg-terciary-200": stepNumber > currentStep,
        })}
      >
        &#10004;
      </div>
      <div className="absolute top-0 -ml-10 mt-16 w-32 text-center text-xs font-medium uppercase text-terciary-200">
        {text}
      </div>
    </div>
  );
};
