import { Accordion } from "flowbite-react";
import {
  AboutHouseCommodities,
  AboutHouseSpace,
  Advertisement,
  ADVERTISEMENT_PROPERTIES,
  AMENITIES_DB,
  TypeAmenity,
} from "../../models/advertisement";
import Checkbox from "../utils/Checkbox";

interface AboutHouseComponentProps {
  advertisement: Advertisement;
  onChange: (property: string, value: any) => void;
}

const AboutHouseComponent = ({ advertisement, onChange }: AboutHouseComponentProps) => {
  const toggleAmmenityProperty = (event: React.ChangeEvent, space: AboutHouseSpace) => {
    const property = (event.target as HTMLInputElement).name;
    let foundAmenity = false;

    let amenities_zone = AMENITIES_DB[space] as
      | "livingroom_amenities"
      | "bathroom_amenities"
      | "general_amenities"
      | "bathroom_amenities"
      | "bedroom_amenities"
      | "kitchen_amenities";

    let commodities = advertisement[amenities_zone];
    if (commodities) {
      for (let i = 0; i < commodities.length; i++) {
        if (amenities_zone[i] === property) {
          foundAmenity = true;
          commodities.splice(i);
          return;
        }
      }
    }

    if (!foundAmenity) {
      if (!commodities) commodities = [];
      commodities.push(property as TypeAmenity);
    }

    onChange(amenities_zone, commodities);
  };

  const checkIfAboutHousePropertyChecked = (space: AboutHouseSpace, toCheckAmenity: TypeAmenity) => {
    let amenities_zone = AMENITIES_DB[space] as
      | "livingroom_amenities"
      | "bathroom_amenities"
      | "general_amenities"
      | "bathroom_amenities"
      | "bedroom_amenities"
      | "kitchen_amenities";

    const commodities = advertisement[amenities_zone];
    if (!commodities) return false;
    const found = commodities.find((amenity) => amenity === toCheckAmenity);
    return found !== undefined;
  };

  return (
    <>
      <Accordion>
        <Accordion.Panel>
          <Accordion.Title>Comodidades Gerais</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.general.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 px-3 py-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div className="flex h-5 items-center">
                        <Checkbox
                          onChange={(e) => toggleAmmenityProperty(e, "general")}
                          checked={checkIfAboutHousePropertyChecked("general", comodity.type)}
                          name={comodity.type}
                        />
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
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.bedroom.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 px-3 py-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div className="flex h-5 items-center">
                        <Checkbox
                          onChange={(e) => toggleAmmenityProperty(e, "bedroom")}
                          checked={checkIfAboutHousePropertyChecked("bedroom", comodity.type)}
                          name={comodity.type}
                        />
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
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.bathroom.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 px-3 py-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div className="flex h-5 items-center">
                        <Checkbox
                          onChange={(e) => toggleAmmenityProperty(e, "bathroom")}
                          checked={checkIfAboutHousePropertyChecked("bathroom", comodity.type)}
                          name={comodity.type}
                        />
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
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.kitchen.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 px-3 py-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div className="flex h-5 items-center">
                        <Checkbox
                          onChange={(e) => toggleAmmenityProperty(e, "kitchen")}
                          checked={checkIfAboutHousePropertyChecked("kitchen", comodity.type)}
                          name={comodity.type}
                        />
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
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.livingroom.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 px-3 py-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div className="flex h-5 items-center">
                        <Checkbox
                          onChange={(e) => toggleAmmenityProperty(e, "livingroom")}
                          checked={checkIfAboutHousePropertyChecked("livingroom", comodity.type)}
                          name={comodity.type}
                        />
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
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.exterior.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">{comodity.label}</p>
                    </div>
                    <div className="ml-auto flex flex-row items-center rounded-lg border border-terciary-500 px-3 py-3 lg:ml-6 lg:w-10 lg:justify-between">
                      <div className="flex h-5 items-center">
                        <Checkbox
                          onChange={(e) => toggleAmmenityProperty(e, "exterior")}
                          checked={checkIfAboutHousePropertyChecked("exterior", comodity.type)}
                          name={comodity.type}
                        />
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
