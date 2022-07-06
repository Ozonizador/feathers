import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";

const FormPasso6 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (

    <section className="container mx-auto w-5/6 my-20">
      <div className="w-full">





        <div className="text-2xl text-gray-700 font-bold mb-28">
          Sobre a sua casa
        </div>
      </div>





    </section>
  );
};

export default FormPasso6;
