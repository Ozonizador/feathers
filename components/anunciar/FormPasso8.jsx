import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import Image from "next/image"

const FormPasso8 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="container mx-auto w-5/6 my-20">
      <div className="text-4xl text-gray-700 font-bold my-28">
        Azares acontecem e temos de estar preparados. Estabeleça a sua política de cancelamento.
      </div>

      <div className="flex flex-row items-baseline my-6">
        <div>
          <div className="flex flex-row items-center align-middle my-5">
            <div>
              <input type="radio" />
            </div>
            <div className="mx-5">
              <Image src="/images/green.png" alt="" height={16} width={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Super Flex</div>
          <div className="text-base text-secondary-300 mt-2">Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 2 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.</div>
        </div>
      </div>

      <div className="flex flex-row items-baseline my-6">
        <div>
          <div className="flex flex-row items-center align-middle my-5">
            <div>
              <input type="radio" />
            </div>
            <div className="mx-5">
              <Image src="/images/yellow.png" alt="" height={16} width={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Flex</div>
          <div className="text-base text-secondary-300 mt-2">Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 7 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.</div>
        </div>
      </div>

      <div className="flex flex-row items-baseline my-6">
        <div>
          <div className="flex flex-row items-center align-middle my-5">
            <div>
              <input type="radio" />
            </div>
            <div className="mx-5">
              <Image src="/images/orange.png" alt="" height={16} width={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Moderado</div>
          <div className="text-base text-secondary-300 mt-2">Até 60 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 15 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.</div>
        </div>
      </div>

      <div className="flex flex-row items-baseline my-6">
        <div>
          <div className="flex flex-row items-center align-middle my-5">
            <div>
              <input type="radio" />
            </div>
            <div className="mx-5">
              <Image src="/images/red.png" alt="" height={16} width={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Rígido</div>
          <div className="text-base text-secondary-300 mt-2">Até 90 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 30 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.</div>
        </div>
      </div>

      <button
        type="button"
        className="mt-16 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
    </section>
  );
};

export default FormPasso8;
