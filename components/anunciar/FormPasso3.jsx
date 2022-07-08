import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";

const FormPasso3 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="w-full">
        <div className="mb-4 block text-2xl font-bold text-gray-700">
          Carregue fotos para o seu anúncio ser mais apelativo e o estudante saber exatamente o que
          esperar.
          <br />
          (mín. 5 fotos)
        </div>

        <div>
          <div className=" mt-10 flex justify-center rounded-md border-2 border-dashed border-terciary-500 py-28">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex  text-terciary-700">
                <p className="px-2 text-base">Adicionar Fotos</p>
                <label className="relative cursor-pointer rounded-md bg-white text-indigo-500">
                  <span>Download</span>
                  <input type="file" className="sr-only" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FALTA GALERIA DE FOTOS */}

      <button
        type="button"
        className="mt-10 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
    </section>
  );
};

export default FormPasso3;
