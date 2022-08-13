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
    <div className="absolute -left-32  z-50 hidden bg-white peer-hover:block lg:bottom-6 lg:-left-32">
      <div className="mb-2 mt-3 flex rounded-lg p-1 shadow-2xl lg:p-4">
        {checkIfIncluded(EXPENSES_TYPE["LIGHTS"]) && (
          <div className="mx-4 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:px-4">
            <FaRegLightbulb className="h-4 w-4  lg:h-12 lg:w-12 lg:p-2" />
            <div className="mt-2 text-xs lg:text-sm ">
              Eletricidade
              <br />
              incluído
            </div>
          </div>
        )}
        {checkIfIncluded(EXPENSES_TYPE["GAS"]) && (
          <div className="mx-4 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:px-4">
            <AiOutlineFire className="h-4 w-4  lg:h-12 lg:w-12 lg:p-2" />
            <div className="mt-2 text-xs lg:text-sm ">
              Gás
              <br />
              incluído
            </div>
          </div>
        )}

        {checkIfIncluded(EXPENSES_TYPE["INTERNET"]) && (
          <div className="mx-4 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:px-4">
            <AiOutlineWifi className="h-4 w-4  lg:h-12 lg:w-12 lg:p-2" />
            <div className="mt-2 text-xs lg:text-sm ">
              Internet
              <br />
              incluído
            </div>
          </div>
        )}
        {checkIfIncluded(EXPENSES_TYPE["WATER"]) && (
          <div className="mx-4 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:px-4">
            <BsWater className="h-4 w-4  lg:h-12 lg:w-12 lg:p-2" />
            <div className="mt-2 text-xs lg:text-sm ">
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
