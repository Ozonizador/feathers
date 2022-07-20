import { Accordion } from "flowbite-react";
import { useAdvertisement } from "../../context/AdvertisementController";
import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { updateAdvertisement } from "../../services/advertisementService";

/* TODO MISSING LOGIC */

const FormPasso5 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();

  const nextStep = async (e) => {
    e.preventDefault();

    await updateAdvertisement(advertisement, advertisement.id);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="w-full">
        <div className="mb-28 text-2xl font-bold text-gray-700">Sobre a sua casa</div>

        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>Sala de estar</Accordion.Title>
            <Accordion.Content>
              <div className="mt-10 flex items-center">
                <div className="flex">
                  <p className="w-40 text-base font-bold">Sofá</p>{" "}
                </div>
                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Sim</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Não</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center">
                <div className="flex">
                  <p className="w-40 text-base font-bold">Televisão</p>{" "}
                </div>
                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Sim</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Não</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center">
                <div className="flex">
                  <p className="w-40 text-base font-bold">Lareira</p>{" "}
                </div>
                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Sim</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Não</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex items-center">
                <div className="flex">
                  <p className="w-40 text-base font-bold">Mesa</p>{" "}
                </div>
                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Sim</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Não</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-10 flex items-center">
                <div className="flex">
                  <p className="w-40 text-base font-bold">Cadeiras</p>{" "}
                </div>
                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Sim</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                  <div className="mr-16 text-base">Não</div>

                  <div>
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-terciary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Quarto</Accordion.Title>
            <Accordion.Content>{/* FALTA AQUI AS OPÇÕES */}</Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Casa de Banho</Accordion.Title>
            <Accordion.Content>{/* FALTA AQUI AS OPÇÕES */}</Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Zona Exterior</Accordion.Title>
            <Accordion.Content>{/* FALTA AQUI AS OPÇÕES */}</Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
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

export default FormPasso5;
