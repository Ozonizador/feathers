import React, { useState } from "react";
import { Accordion } from "flowbite-react";
import Change from "../../toggle/toggle";
import { UserTypes } from "../../../models/profile";
import { useGetUserType } from "../../../context/MainProvider";

const FaqEstudante = () => {
  const { toggleUserType } = useGetUserType();
  const [selectedFaq, setSelectedFaq] = useState<UserTypes>(toggleUserType);

  return (
    <>
      <section className="px-4 lg:px-0">
        <div className=" mx-auto mb-5 w-10/12 ">
          <h1 className="mt-24 text-center text-6xl font-bold">FAQ</h1>
        </div>

        <div className="flex justify-center">
          <Change selectedValue={selectedFaq} onChange={setSelectedFaq} />
        </div>

        <div className="flex justify-center">
          <div className="form-check form-switch"></div>
        </div>

        <div className="mb-32 lg:px-96">
          {/* Estudante */}
          {selectedFaq === "TENANT" && (
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title>What is Flowbite?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-secondary-300 ">
                    Flowbite is an open-source library of interactive components built on top of Tailwind CSS including
                    buttons, dropdowns, modals, navbars, and more.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>Is there a Figma file available?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-secondary-300">
                    Flowbite is first conceptualized and designed using the Figma software so everything you see in the
                    library has a design equivalent in our Figma file.
                  </p>
                  <p className="text-secondary-300">Check out the </p>
                </Accordion.Content>
              </Accordion.Panel>
              <Accordion.Panel>
                <Accordion.Title>What are the differences between Flowbite and Tailwind UI?</Accordion.Title>
                <Accordion.Content>
                  <p className="mb-2 text-secondary-300">
                    The main difference is that the core components from Flowbite are open source under the MIT license,
                    whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and
                    standalone components, whereas Tailwind UI offers sections of pages.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is
                    no technical reason stopping you from using the best of two worlds.
                  </p>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
                  <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                    <li>
                      <a href="https://flowbite.com/pro/" className="text-blue-600 hover:underline dark:text-blue-500">
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
          )}
          {/* SENHORIO */}
          {selectedFaq === "LANDLORD" && <div>Colocar aqui cenas para o senhorio</div>}
        </div>
      </section>
    </>
  );
};

export default FaqEstudante;
