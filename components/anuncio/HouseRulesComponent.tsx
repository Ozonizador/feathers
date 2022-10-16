import { BiDrink } from "react-icons/bi";
import { GiCigarette, GiBroom } from "react-icons/gi";
import { MdChecklist, MdOutlinePets } from "react-icons/md";
import {
  Advertisement,
  ADVERTISEMENT_PROPERTIES,
  HOUSE_RULES_NAMING,
  TYPE_CLEANING_LABELS,
} from "../../models/advertisement";
import Input from "../utils/Input";

interface HouseRulesProps {
  advertisement: Advertisement;
  onChange: (property, value) => void;
}

const HouseRulesComponent = ({ advertisement, onChange }: HouseRulesProps) => {
  const toggleHouseRulesProperty = (event) => {
    const { house_rules } = advertisement;

    onChange(ADVERTISEMENT_PROPERTIES.HOUSE_RULES, {
      ...house_rules,
      [event.target.name]: event.target.checked,
    });
  };

  const changeHouseRulesInput = (event) => {
    const { house_rules } = advertisement;

    onChange(ADVERTISEMENT_PROPERTIES.HOUSE_RULES, {
      ...house_rules,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="my-8 flex flex-col lg:flex-row lg:items-center">
        <div className="flex items-center">
          <div className="">
            <MdOutlinePets className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">Animais permitidos</p>
        </div>

        <div className="ml-0 mt-5 flex flex-row justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:mt-0 lg:ml-6 lg:items-center">
          <div>
            <div className="flex h-5 items-center">
              <input
                name={HOUSE_RULES_NAMING.ANIMALS_ALLOWED}
                type="checkbox"
                checked={advertisement.house_rules.animalsAllowed}
                className="h-4 w-4 rounded border border-terciary-500"
                onChange={(e) => toggleHouseRulesProperty(e)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 flex flex-col lg:flex-row lg:items-center">
        <div className="flex items-center">
          <div className="">
            <GiCigarette className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">Fumar permitido</p>
        </div>

        <div className="ml-0 mt-5 flex flex-row justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:mt-0 lg:ml-6 lg:items-center">
          <div>
            <div className="flex h-5 items-center">
              <input
                name={HOUSE_RULES_NAMING.SMOKE_ALLOWED}
                type="checkbox"
                value="true"
                checked={advertisement.house_rules.smokeAllowed}
                className="h-4 w-4 rounded border border-terciary-500"
                onChange={(e) => toggleHouseRulesProperty(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 flex flex-col lg:flex-row lg:items-center">
        <div className="flex items-center">
          <div className="">
            <BiDrink className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">Eventos Permitidos</p>
        </div>

        <div className="ml-0 mt-5 flex flex-row justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:mt-0 lg:ml-6 lg:items-center">
          <div>
            <div className="flex h-5 items-center">
              <input
                type="checkbox"
                name={HOUSE_RULES_NAMING.EVENTS_ALLOWED}
                value="true"
                checked={advertisement.house_rules.eventsAllowed}
                className="h-4 w-4 rounded border border-terciary-500"
                onChange={(e) => toggleHouseRulesProperty(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex">
          <div>
            <MdChecklist className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">Outra Regra</p>
        </div>
        <div className=" ml-0 flex flex-1 flex-row lg:ml-6 lg:items-center">
          <div className="w-full text-base lg:w-3/4">
            <Input
              label={HOUSE_RULES_NAMING.OTHER_RULES}
              labelText=""
              customCss="w-full"
              value={advertisement.house_rules.otherRules}
              onChange={(e) => changeHouseRulesInput(e)}
            />
          </div>
          <div></div>
        </div>
      </div>

      <div className="my-8 mb-14 flex flex-col lg:mb-24 lg:flex-row lg:items-center">
        <div className="flex flex-row">
          <div>
            <GiBroom className="mr-3 text-2xl" />
          </div>
          <p className="mb-6 w-40 text-base font-bold lg:mb-0">Limpeza</p>
        </div>
        <div className="flex w-full flex-row items-center justify-between lg:ml-6 lg:w-3/4">
          <div className="w-full lg:w-2/3">
            <div className="flex h-5 w-full items-center">
              <select className="w-full rounded-md border  border-solid border-terciary-500 bg-white py-2 ">
                {Object.keys(TYPE_CLEANING_LABELS).map((type, index) => {
                  return (
                    <option key={index} value={TYPE_CLEANING_LABELS[type]}>
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
