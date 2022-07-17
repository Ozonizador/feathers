import { AiOutlineFire, AiOutlineWifi } from "react-icons/ai";
import { BsWater } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { EXPENSES_TYPE, HouseExpenses } from "../../models/advertisement";

interface roomUtilitesPopoverProps {
  expenses: HouseExpenses;
}

const RoomUtilitesPopover = ({ expenses }: roomUtilitesPopoverProps) => {
  const checkIfIncluded = (type: EXPENSES_TYPE) => {
    if (!expenses) return false;
    if (expenses.inclusive === "INCLUDED") return true;
    if (expenses.inclusive === "PARTIALLY") {
      const index = expenses.servicesIncluded.findIndex((expense) => expense === type);
      if (index !== -1) return true;
    }

    return false;
  };
  return (
    <div className="absolute bottom-6 left-1 -z-30">
      <div className="mb-2 mt-3 flex rounded-lg p-4 shadow-2xl">
        {checkIfIncluded(EXPENSES_TYPE["LIGHTS"]) && (
          <div className="mx-4 flex flex-col items-center justify-center px-4 align-middle text-secondary-500">
            <FaRegLightbulb className=" h-12 w-12 p-2" />
            <div className="mt-2 text-sm ">
              Eletricidade
              <br />
              incluído
            </div>
          </div>
        )}
        {checkIfIncluded(EXPENSES_TYPE["GAS"]) && (
          <div className="mr-4 flex flex-col items-center justify-center px-4 align-middle text-secondary-500">
            <AiOutlineFire className="   h-12 w-12 p-2" />
            <div className="mt-2 text-sm">
              Gás
              <br />
              incluído
            </div>
          </div>
        )}

        {checkIfIncluded(EXPENSES_TYPE["INTERNET"]) && (
          <div className="mr-4 flex flex-col items-center justify-center px-4 align-middle text-secondary-500">
            <AiOutlineWifi className=" h-12 w-12 p-2" />
            <div className="mt-2 text-sm ">
              Internet
              <br />
              incluído
            </div>
          </div>
        )}
        {checkIfIncluded(EXPENSES_TYPE["WATER"]) && (
          <div className="mr-2 flex flex-col items-center justify-center px-4  align-middle text-secondary-500">
            <BsWater className=" h-12 w-12 p-2" />
            <div className="mt-2 text-sm ">
              Água
              <br />
              incluído
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomUtilitesPopover;
