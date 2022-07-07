import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import { Accordion } from "flowbite-react";

const FormPasso6 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="w-full ">
        <div className="text-2xl text-gray-700 font-bold mb-28">
          Sobre a sua casa
        </div>

        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>Sala de estar</Accordion.Title>
            <Accordion.Content>
              <div className="flex items-center mt-10">
                <div className="flex">
                  <p className="font-bold text-base w-40">Sofá</p> </div>
                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Sim</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>

                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Não</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-10">
                <div className="flex">
                  <p className="font-bold text-base w-40">Televisão</p> </div>
                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Sim</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>

                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Não</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>
              </div>


              <div className="flex items-center mt-10">
                <div className="flex">
                  <p className="font-bold text-base w-40">Lareira</p> </div>
                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Sim</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>

                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Não</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>
              </div>


              <div className="flex items-center mt-10">
                <div className="flex">
                  <p className="font-bold text-base w-40">Mesa</p> </div>
                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Sim</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>

                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Não</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center my-10">
                <div className="flex">
                  <p className="font-bold text-base w-40">Cadeiras</p> </div>
                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Sim</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>

                <div className="w-60 border border-terciary-500 rounded-lg py-3 px-3 flex flex-row items-center justify-between ml-6">
                  <div className="text-base mr-16">Não</div>

                  <div>
                    <div className="flex items-center h-5">
                      <input type="checkbox" className=" h-4 w-4 border border-terciary-500 rounded" />
                    </div>
                  </div>
                </div>
              </div>


            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>Is there a Figma file available?</Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Flowbite is first conceptualized and designed using the Figma software so
                everything you see in the library has a design equivalent in our Figma file.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Check out the{" "}
                <a
                  href="https://flowbite.com/figma/"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Figma design system
                </a>{" "}
                based on the utility classes from Tailwind CSS and components from Flowbite.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              What are the differences between Flowbite and Tailwind UI?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                The main difference is that the core components from Flowbite are open source
                under the MIT license, whereas Tailwind UI is a paid product. Another difference
                is that Flowbite relies on smaller and standalone components, whereas Tailwind UI
                offers sections of pages.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                However, we actually recommend using both Flowbite, Flowbite Pro, and even
                Tailwind UI as there is no technical reason stopping you from using the best of
                two worlds.
              </p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Learn more about these technologies:
              </p>
              <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                <li>
                  <a
                    href="https://flowbite.com/pro/"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Flowbite Pro
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindui.com/"
                    rel="nofollow"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Tailwind UI
                  </a>
                </li>
              </ul>
            </Accordion.Content>
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

export default FormPasso6;
