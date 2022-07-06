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
    <section className="container mx-auto w-5/6 my-20">
      <div className="text-2xl text-gray-700 font-bold mb-10">
        Está quase pronto! Leia e aceite os seguintes documentos.
      </div>


      <div className="flex flex-col  mt-20">
        <div className="flex flex-row items-center align-middle my-5">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 border border-gray-300 rounded-sm" />
          </div>
          <div className="ml-4  text-xl">Termos e condições</div>
        </div>

        <div className="flex flex-row items-center align-middle my-5">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 border border-gray-300 rounded-sm" />

          </div>
          <div className="ml-4  text-xl">Política de privacidade</div>
        </div>

        <div className="flex flex-row items-center align-middle my-5">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 border border-gray-300 rounded-sm" />
          </div>
          <div className="ml-4  text-xl">Acordo em manter o meu calendário atualizado</div>
        </div>


        <div className="flex flex-row items-center align-middle my-5">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 border border-gray-300 rounded-sm" />
          </div>
          <div className="ml-4  text-xl">As informações que providencio são verdadeiras</div>
        </div>


      </div>

    </section>
  );
};

export default FormPasso2;
