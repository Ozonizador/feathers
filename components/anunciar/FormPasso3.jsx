import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";

const FormPasso2 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <div className="mt-1">
      <div className="flex">
        <button
          type="button"
          className="mt-10 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
          onClick={(e) => nextStep(e)}
        >
          Seguinte &#8594;
        </button>
      </div>
    </div>
  );
};

export default FormPasso2;
