import { BiDrink } from "react-icons/bi";
import { GiCigarette, GiBroom } from "react-icons/gi";
import { MdChecklist, MdOutlinePets } from "react-icons/md";
import Advertisement, {
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
  const changeHouseRulesProperty = (event) => {
    const { houseRules } = advertisement;

    onChange(ADVERTISEMENT_PROPERTIES.HOUSE_RULES, {
      ...houseRules,
      [event.target.name]: event.target.value === "true",
    });
  };

  const changingHouseRulesPropertyInput = (event) => {
    const { houseRules } = advertisement;

    onChange(ADVERTISEMENT_PROPERTIES.HOUSE_RULES, {
      ...houseRules,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="my-8 flex items-center">
        <div className="flex items-center">
          <div className="">
            <MdOutlinePets className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">Animais permitidos</p>
        </div>

        <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
          <div className="mr-16 text-base">Sim</div>
          <div>
            <div className="flex h-5 items-center">
              <input
                name={HOUSE_RULES_NAMING.ANIMALS_ALLOWED}
                type="radio"
                value="true"
                checked={advertisement.houseRules.animalsAllowed}
                className="h-4 w-4 rounded border border-terciary-500"
                onChange={(e) => changeHouseRulesProperty(e)}
              />
            </div>
          </div>
        </div>

        <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
          <div className="mr-16 text-base">Não</div>
          <div>
            <div className="flex h-5 items-center">
              <input
                name={HOUSE_RULES_NAMING.ANIMALS_ALLOWED}
                type="radio"
                value="false"
                checked={!advertisement.houseRules.animalsAllowed}
                className="h-4 w-4 rounded border border-terciary-500"
                onChange={(e) => changeHouseRulesProperty(e)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-8 flex items-center">
        <div className="flex items-center">
          <div className="">
            <GiCigarette className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">Fumar permitido</p>
        </div>

        <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
          <div className="mr-16 text-base">Sim</div>
          <div>
            <div className="flex h-5 items-center">
              <input
                name={HOUSE_RULES_NAMING.SMOKE_ALLOWED}
                type="radio"
                value="true"
                checked={advertisement.houseRules.smokeAllowed}
                className="h-4 w-4 rounded border border-terciary-500"
                onChange={(e) => changeHouseRulesProperty(e)}
              />
            </div>
          </div>
        </div>

        <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
          <div className="mr-16 text-base">Não</div>
          <div>
            <div className="flex h-5 items-center">
              <input
                name={HOUSE_RULES_NAMING.SMOKE_ALLOWED}
                type="radio"
                value="false"
                checked={!advertisement.houseRules.smokeAllowed}
                className="h-4 w-4 rounded border border-terciary-500"
                onChange={(e) => changeHouseRulesProperty(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 flex items-center">
        <div className="flex items-center">
          <div className="">
            <BiDrink className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">Eventos Permitidos</p>
        </div>

        <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
          <div className="mr-16 text-base">Sim</div>
          <div>
            <div className="flex h-5 items-center">
              <input
                type="radio"
                name={HOUSE_RULES_NAMING.EVENTS_ALLOWED}
                value="true"
                checked={advertisement.houseRules.eventsAllowed}
                className="h-4 w-4 rounded border border-terciary-500"
                onChange={(e) => changeHouseRulesProperty(e)}
              />
            </div>
          </div>
        </div>

        <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
          <div className="mr-16 text-base">Não</div>
          <div>
            <div className="flex h-5 items-center">
              <input
                type="radio"
                value="false"
                name={HOUSE_RULES_NAMING.EVENTS_ALLOWED}
                checked={!advertisement.houseRules.eventsAllowed}
                className=" h-4 w-4 rounded border border-terciary-500"
                onChange={(e) => changeHouseRulesProperty(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center ">
        <div className="flex">
          <div>
            <MdChecklist className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">Outra Regra</p>
        </div>
        <div className=" ml-6 flex flex-row  items-center ">
          <div className="w-3/4  text-base">
            <Input
              label={HOUSE_RULES_NAMING.OTHER_RULES}
              labelText=""
              customCss="w-full"
              value={advertisement.houseRules.otherRules}
              onChange={(e) => changingHouseRulesPropertyInput(e)}
            />
          </div>
          <div></div>
        </div>
      </div>

      <div className="my-8 flex items-center">
        <div className="flex items-center">
          <div className="">
            <GiBroom className="mr-3 text-2xl" />
          </div>
          <p className="w-40 text-base font-bold">Limpeza</p>
        </div>

        <div className=" ml-6 flex w-3/4 flex-row items-center justify-between">
          <div>
            <div className="flex h-5 items-center">
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
