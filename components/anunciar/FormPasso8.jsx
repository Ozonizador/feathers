import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";

const FormPasso8 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const saveAdvertisement = () => {};

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="mb-10 text-2xl font-bold text-gray-700">
        Está quase pronto! Leia e aceite os seguintes documentos.
      </div>

      <div className="mt-20 flex  flex-col">
        <div className="my-5 flex flex-row items-center align-middle">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 rounded-sm border border-gray-300" />
          </div>
          <div className="ml-4  text-xl">Termos e condições</div>
        </div>

        <div className="my-5 flex flex-row items-center align-middle">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 rounded-sm border border-gray-300" />
          </div>
          <div className="ml-4  text-xl">Política de privacidade</div>
        </div>

        <div className="my-5 flex flex-row items-center align-middle">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 rounded-sm border border-gray-300" />
          </div>
          <div className="ml-4  text-xl">Acordo em manter o meu calendário atualizado</div>
        </div>

        <div className="my-5 flex flex-row items-center align-middle">
          <div className="flex flex-row items-center">
            <input type="checkbox" className="h-4 w-4 rounded-sm border border-gray-300" />
          </div>
          <div className="ml-4  text-xl">As informações que providencio são verdadeiras</div>
        </div>
      </div>
    </section>
  );
};

export default FormPasso8;
