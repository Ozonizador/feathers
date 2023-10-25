import React from "react";
import { BiDrink } from "react-icons/bi";
import { GiCigarette, GiBroom } from "react-icons/gi";
import { MdChecklist, MdOutlinePets } from "react-icons/md";
import {
  Advertisement,
  ADVERTISEMENT_PROPERTIES,
  HOUSE_RULES_NAMING,
  TYPE_CLEANING_LABELS,
} from "../../models/advertisement";
import Checkbox from "../utils/Checkbox";
import Input from "../utils/Input";
import { useTranslation } from "next-i18next";

interface HouseRulesProps {
  advertisement: Advertisement;
  onChange: (property: string, value: any) => void;
}

const HouseRulesComponent = ({ advertisement, onChange }: HouseRulesProps) => {
  const { t } = useTranslation();
  const toggleHouseRulesProperty = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { house_rules } = advertisement;

    onChange(ADVERTISEMENT_PROPERTIES.HOUSE_RULES, {
      ...house_rules,
      [event.target.name]: event.target.checked,
    });
  };

  const changeHouseRulesInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { house_rules } = advertisement;

    onChange(ADVERTISEMENT_PROPERTIES.HOUSE_RULES, {
      ...house_rules,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="my-8 flex gap-2 md:flex-row lg:items-center">
        <div className="flex items-center">
          <div>
            <MdOutlinePets className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">{t("advertisements:animals_allowed")}</p>
        </div>
        <div className="flex h-5 items-center">
          <Checkbox
            onChange={(e) => toggleHouseRulesProperty(e)}
            checked={advertisement.house_rules.animalsAllowed || false}
            name={HOUSE_RULES_NAMING.ANIMALS_ALLOWED}
          />
        </div>
      </div>
      <div className="my-8 flex gap-2 md:flex-row lg:items-center">
        <div className="flex items-center">
          <div>
            <GiCigarette className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">{t("advertisements:smoking_allowed")}</p>
        </div>
        <div className="flex h-5 items-center">
          <Checkbox
            onChange={(e) => toggleHouseRulesProperty(e)}
            checked={advertisement.house_rules.smokeAllowed || false}
            name={HOUSE_RULES_NAMING.SMOKE_ALLOWED}
          />
        </div>
      </div>

      <div className="my-8 flex gap-2 md:flex-row lg:items-center">
        <div className="flex items-center">
          <div>
            <BiDrink className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">{t("advertisements:events_allowed")}</p>
        </div>
        <div className="flex h-5 items-center">
          <Checkbox
            onChange={(e) => toggleHouseRulesProperty(e)}
            checked={advertisement.house_rules.eventsAllowed || false}
            name={HOUSE_RULES_NAMING.EVENTS_ALLOWED}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="flex">
          <div>
            <MdChecklist className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">{t("advertisements:other_rule")}</p>
        </div>
        <div className=" ml-0 flex flex-1 flex-row lg:items-center">
          <div className="w-full text-base lg:w-3/4">
            <Input
              name={HOUSE_RULES_NAMING.OTHER_RULES}
              labelText=""
              customCss="w-full"
              value={advertisement.house_rules.otherRules || ""}
              onChange={(e) => changeHouseRulesInput(e)}
            />
          </div>
          <div></div>
        </div>
      </div>

      <div className="my-8 mb-14 flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="flex flex-row">
          <div>
            <GiBroom className="mr-3 text-2xl" />
          </div>
          <p className="mb-6 w-40 text-base font-bold lg:mb-0">{t("advertisements:cleaning")}</p>
        </div>
        <div className="flex w-full flex-row items-center justify-between lg:w-3/4">
          <div className="w-full lg:w-3/4">
            <div className="flex h-5 w-full items-center">
              <select
                name={HOUSE_RULES_NAMING.CLEANING}
                className="w-full rounded-md border border-solid border-terciary-500 bg-white py-2"
                onChange={changeHouseRulesInput}
              >
                {Object.keys(TYPE_CLEANING_LABELS).map((type, index) => {
                  return (
                    <option key={index} value={TYPE_CLEANING_LABELS[type as keyof typeof TYPE_CLEANING_LABELS]}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseRulesComponent;
