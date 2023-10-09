import { Accordion } from "flowbite-react";
import {
  AboutHouseCommodities,
  AboutHouseSpace,
  Advertisement,
  AMENITIES_DB,
  TypeAmenity,
  TypeAmenityLabel,
} from "../../models/advertisement";
import Checkbox from "../utils/Checkbox";
import { useTranslation } from "next-i18next";

interface AboutHouseComponentProps {
  advertisement: Advertisement;
  onChange: (property: string, value: any) => void;
}

const AboutHouseComponent = ({ advertisement, onChange }: AboutHouseComponentProps) => {
  const { t } = useTranslation();
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

      console.log(space);
      console.log(property);
      console.log(amenities_zone);

    let commodities = advertisement[amenities_zone];
    if (commodities) {
      for (let i = 0; i < commodities.length; i++) {
        if (commodities[i] === property) {
          foundAmenity = true;
          commodities.splice(i, 1);
        }
      }
    }

    if (!foundAmenity) {
      if (!commodities) commodities = [];
      commodities.push(property as TypeAmenity);
    } else {
      let checkbox = document.getElementsByName(property)[0];
      checkbox.removeAttribute('checked');
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
          <Accordion.Title>{t("advertisements:zones.general")}</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.general.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">
                        {t(TypeAmenityLabel[comodity.type])}
                      </p>
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
          <Accordion.Title>{t("advertisements:zones.bedroom")}</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.bedroom.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">
                        {t(TypeAmenityLabel[comodity.type])}
                      </p>
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
          <Accordion.Title>{t("advertisements:zones.bathroom")}</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.bathroom.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">
                        {t(TypeAmenityLabel[comodity.type])}
                      </p>
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
          <Accordion.Title>{t("advertisements:zones.kitchen")}</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.kitchen.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">
                        {t(TypeAmenityLabel[comodity.type])}
                      </p>
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
          <Accordion.Title>{t("advertisements:zones.exterior")}</Accordion.Title>
          <Accordion.Content>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              {AboutHouseCommodities.exterior.map((comodity, index) => {
                return (
                  <div className="mt-10 flex items-center gap-2 px-1" key={index}>
                    <div className="flex">
                      <p className="text-left text-sm font-bold lg:w-40 lg:text-base">
                        {t(TypeAmenityLabel[comodity.type])}
                      </p>
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
