import { Accordion } from "flowbite-react";
import Advertisement, {
  AboutHouseSpace,
  ADVERTISEMENT_PROPERTIES,
  Amenity,
  TypeAmenity,
} from "../../models/advertisement";

interface AboutHouseComponentProps {
  advertisement?: Advertisement;
  onChange: (property, value) => void;
}

const AboutHouseComponent = ({ advertisement, onChange }: AboutHouseComponentProps) => {
  const changeAdvertityProperty = (event, space: AboutHouseSpace) => {
    const property = event.target.name;
    const value = event.target.value;

    const { aboutHouse } = advertisement;
    let amenities = aboutHouse[space];

    if (!amenities) {
      amenities = [];
    }
    let foundAmenity = false;
    for (let amenity of amenities) {
      if (amenity.type == property) {
        amenity.available = value === "true";
        foundAmenity = true;
      }
    }

    if (!foundAmenity) {
      amenities.push({ type: property, available: value === "true" });
    }

    onChange(ADVERTISEMENT_PROPERTIES.ABOUT_HOUSE, { ...aboutHouse, [space]: amenities });
  };

  const checkIfAboutHousePropertyChecked = (
    space: AboutHouseSpace,
    toCheckAmenity: TypeAmenity,
    expectedValue: boolean
  ) => {
    const { aboutHouse } = advertisement;
    const amenities = aboutHouse[space];

    if (!amenities) {
      return false;
    }
    for (let amenity of amenities) {
      if (amenity.type == toCheckAmenity) {
        return amenity.available === expectedValue;
      }
    }

    return false;
  };
  return (
    <>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Sala de estar</Accordion.Title>
          <Accordion.Content>
            <div className="mt-10 flex items-center">
              <div className="flex">
                <p className="w-40 text-base font-bold">Sofá</p>
              </div>
              <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div className="mr-16 text-base">Sim</div>

                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      className=" h-4 w-4 rounded border border-terciary-500"
                      value="true"
                      checked={checkIfAboutHousePropertyChecked(
                        "livingRoom",
                        TypeAmenity.SOFA,
                        true
                      )}
                      name={TypeAmenity.SOFA}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
                      value="false"
                      checked={checkIfAboutHousePropertyChecked(
                        "livingRoom",
                        TypeAmenity.SOFA,
                        false
                      )}
                      name={TypeAmenity.SOFA}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
                      value="true"
                      checked={checkIfAboutHousePropertyChecked("livingRoom", TypeAmenity.TV, true)}
                      name={TypeAmenity.TV}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
                      value="false"
                      checked={checkIfAboutHousePropertyChecked(
                        "livingRoom",
                        TypeAmenity.TV,
                        false
                      )}
                      name={TypeAmenity.TV}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
                      value="true"
                      checked={checkIfAboutHousePropertyChecked(
                        "livingRoom",
                        TypeAmenity.FIREPLACE,
                        true
                      )}
                      name={TypeAmenity.FIREPLACE}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
                      value="false"
                      checked={checkIfAboutHousePropertyChecked(
                        "livingRoom",
                        TypeAmenity.FIREPLACE,
                        false
                      )}
                      name={TypeAmenity.FIREPLACE}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
                      value="true"
                      checked={checkIfAboutHousePropertyChecked(
                        "livingRoom",
                        TypeAmenity.TABLE,
                        true
                      )}
                      name={TypeAmenity.TABLE}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
                      value="false"
                      checked={checkIfAboutHousePropertyChecked(
                        "livingRoom",
                        TypeAmenity.TABLE,
                        false
                      )}
                      name={TypeAmenity.TABLE}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
                      value="true"
                      checked={checkIfAboutHousePropertyChecked(
                        "livingRoom",
                        TypeAmenity.CHAIRS,
                        true
                      )}
                      name={TypeAmenity.CHAIRS}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
                      value="false"
                      checked={checkIfAboutHousePropertyChecked(
                        "livingRoom",
                        TypeAmenity.CHAIRS,
                        false
                      )}
                      name={TypeAmenity.CHAIRS}
                      onChange={(e) => changeAdvertityProperty(e, "livingRoom")}
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
