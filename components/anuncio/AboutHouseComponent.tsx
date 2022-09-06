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
    //const checked = event.target.checked;

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
        return;
      }
    }

    if (!foundAmenity) {
      amenities.push(property);
    }

    onChange(ADVERTISEMENT_PROPERTIES.ABOUT_HOUSE, { ...aboutHouse, [space]: amenities });
  };

  const checkIfAboutHousePropertyChecked = (space: AboutHouseSpace, toCheckAmenity: TypeAmenity) => {
    const amenities = advertisement.aboutHouse[space];
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
            <div className="grid grid-cols-2 gap-2">
              {AboutHouseCommodities.general.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div>
                        <div className="flex h-5 items-center">
                          <input
                            type="checkbox"
                            className=" h-4 w-4 rounded border border-terciary-500"
                            checked={checkIfAboutHousePropertyChecked("general", comodity.type)}
                            name={comodity.type}
                            onChange={(e) => toggleAmmenityProperty(e, "general")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Sala de estar</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-2 gap-2">
              {AboutHouseCommodities.livingRoom.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div>
                        <div className="flex h-5 items-center">
                          <input
                            type="checkbox"
                            className=" h-4 w-4 rounded border border-terciary-500"
                            checked={checkIfAboutHousePropertyChecked("livingRoom", comodity.type)}
                            name={comodity.type}
                            onChange={(e) => toggleAmmenityProperty(e, "livingRoom")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Quarto</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-2 gap-2">
              {AboutHouseCommodities.bedRoom.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div>
                        <div className="flex h-5 items-center">
                          <input
                            type="checkbox"
                            className=" h-4 w-4 rounded border border-terciary-500"
                            checked={checkIfAboutHousePropertyChecked("bedRoom", comodity.type)}
                            name={comodity.type}
                            onChange={(e) => toggleAmmenityProperty(e, "bedRoom")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Casa de Banho</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-2 gap-2">
              {AboutHouseCommodities.bathRoom.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div>
                        <div className="flex h-5 items-center">
                          <input
                            type="checkbox"
                            className=" h-4 w-4 rounded border border-terciary-500"
                            checked={checkIfAboutHousePropertyChecked("bathRoom", comodity.type)}
                            name={comodity.type}
                            onChange={(e) => toggleAmmenityProperty(e, "bathRoom")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Zona Exterior</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-2 gap-2">
              {AboutHouseCommodities.exterior.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div>
                        <div className="flex h-5 items-center">
                          <input
                            type="checkbox"
                            className=" h-4 w-4 rounded border border-terciary-500"
                            checked={checkIfAboutHousePropertyChecked("exterior", comodity.type)}
                            name={comodity.type}
                            onChange={(e) => toggleAmmenityProperty(e, "exterior")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>Cozinha</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-2 gap-2">
              {AboutHouseCommodities.kitchen.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div>
                        <div className="flex h-5 items-center">
                          <input
                            type="checkbox"
                            className=" h-4 w-4 rounded border border-terciary-500"
                            checked={checkIfAboutHousePropertyChecked("kitchen", comodity.type)}
                            name={comodity.type}
                            onChange={(e) => toggleAmmenityProperty(e, "kitchen")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </>
  );
};
export default AboutHouseComponent;
