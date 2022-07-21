import { Accordion } from "flowbite-react";
import Advertisement from "../../models/advertisement";

interface AboutHouseComponentProps {
  advertisement?: Advertisement;
  onChange: (property, value) => void;
}

const AboutHouseComponent = ({ advertisement, onChange }: AboutHouseComponentProps) => {
  return (
    <>
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
    </>
  );
};
export default AboutHouseComponent;
