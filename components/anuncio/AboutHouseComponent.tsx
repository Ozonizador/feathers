import { Accordion } from "flowbite-react";
import {
  AboutHouseCommodities,
  AboutHouseSpace,
  Advertisement,
  ADVERTISEMENT_PROPERTIES,
  TypeAmenity,
} from "../../models/advertisement";

interface AboutHouseComponentProps {
  advertisement?: Advertisement;
  onChange: (property, value) => void;
}

const AboutHouseComponent = ({ advertisement, onChange }: AboutHouseComponentProps) => {
  const toggleAmmenityProperty = (event, space: AboutHouseSpace) => {
    const property = event.target.name;
    const checked = event.target.checked;

    const { aboutHouse } = advertisement;
    let amenities = aboutHouse[space];

    if (!amenities) {
      amenities = [];
    }

    let foundAmenity = false;
    for (let i = 0; i < amenities.length; i++) {
      if (amenities[i] === property) {
        foundAmenity = true;
        amenities.splice(i);
        break;
      }
    }

    if (!foundAmenity) {
      amenities.push(property);
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

    const found = amenities.find((amenity) => amenity === toCheckAmenity);
    return found !== undefined;
  };

  return (
    <>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Comodidades Gerais</Accordion.Title>
          <Accordion.Content>
            {AboutHouseCommodities.general.map((comodity, index) => {
              return (
                <div className="mt-10 flex items-center" key={index}>
                  <div className="flex">
                    <p className="w-40 text-base font-bold">{comodity.label}</p>
                  </div>
                  <div className="ml-6 flex w-10 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                    <div>
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          className=" h-4 w-4 rounded border border-terciary-500"
                          value="true"
                          checked={checkIfAboutHousePropertyChecked("general", comodity.type, true)}
                          name={comodity.type}
                          onChange={(e) => toggleAmmenityProperty(e, "general")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Sala de estar</Accordion.Title>
          <Accordion.Content>
            {AboutHouseCommodities.livingRoom.map((comodity, index) => {
              return (
                <div className="mt-10 flex items-center" key={index}>
                  <div className="flex">
                    <p className="w-40 text-base font-bold">{comodity.label}</p>
                  </div>
                  <div className="ml-6 flex w-10 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                    <div>
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          className=" h-4 w-4 rounded border border-terciary-500"
                          value="true"
                          checked={checkIfAboutHousePropertyChecked("general", comodity.type, true)}
                          name={comodity.type}
                          onChange={(e) => toggleAmmenityProperty(e, "general")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Quarto</Accordion.Title>
          <Accordion.Content>
            {AboutHouseCommodities.bedRoom.map((comodity, index) => {
              return (
                <div className="mt-10 flex items-center" key={index}>
                  <div className="flex">
                    <p className="w-40 text-base font-bold">{comodity.label}</p>
                  </div>
                  <div className="ml-6 flex w-10 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                    <div>
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          className=" h-4 w-4 rounded border border-terciary-500"
                          value="true"
                          checked={checkIfAboutHousePropertyChecked("general", comodity.type, true)}
                          name={comodity.type}
                          onChange={(e) => toggleAmmenityProperty(e, "general")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Casa de Banho</Accordion.Title>
          <Accordion.Content>
            {AboutHouseCommodities.bathRoom.map((comodity, index) => {
              return (
                <div className="mt-10 flex items-center" key={index}>
                  <div className="flex">
                    <p className="w-40 text-base font-bold">{comodity.label}</p>
                  </div>
                  <div className="ml-6 flex w-10 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                    <div>
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          className=" h-4 w-4 rounded border border-terciary-500"
                          value="true"
                          checked={checkIfAboutHousePropertyChecked("general", comodity.type, true)}
                          name={comodity.type}
                          onChange={(e) => toggleAmmenityProperty(e, "general")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Zona Exterior</Accordion.Title>
          <Accordion.Content>
            {AboutHouseCommodities.exterior.map((comodity, index) => {
              return (
                <div className="mt-10 flex items-center" key={index}>
                  <div className="flex">
                    <p className="w-40 text-base font-bold">{comodity.label}</p>
                  </div>
                  <div className="ml-6 flex w-10 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                    <div>
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          className=" h-4 w-4 rounded border border-terciary-500"
                          value="true"
                          checked={checkIfAboutHousePropertyChecked("general", comodity.type, true)}
                          name={comodity.type}
                          onChange={(e) => toggleAmmenityProperty(e, "general")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Cozinha</Accordion.Title>
          <Accordion.Content>
            {AboutHouseCommodities.kitchen.map((comodity, index) => {
              return (
                <div className="mt-10 flex items-center" key={index}>
                  <div className="flex">
                    <p className="w-40 text-base font-bold">{comodity.label}</p>
                  </div>
                  <div className="ml-6 flex w-10 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                    <div>
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          className=" h-4 w-4 rounded border border-terciary-500"
                          value="true"
                          checked={checkIfAboutHousePropertyChecked("general", comodity.type, true)}
                          name={comodity.type}
                          onChange={(e) => toggleAmmenityProperty(e, "general")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
};
export default AboutHouseComponent;
