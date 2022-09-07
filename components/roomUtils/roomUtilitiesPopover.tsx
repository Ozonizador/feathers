import { AiOutlineFire, AiOutlineWifi } from "react-icons/ai";
import { BsWater } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { ExpenseName, HouseExpenses } from "../../models/advertisement";

interface roomUtilitesPopoverProps {
  expenses: HouseExpenses;
}

const RoomUtilitesPopover = ({ expenses }: roomUtilitesPopoverProps) => {
  const checkIfIncluded = (type: ExpenseName) => {
    if (!expenses) return false;
    if (expenses.inclusive === "INCLUDED") return "Incluído";
    if (expenses.inclusive === "EXCLUDED") return "Não Incluído";
    const selectedExpense = expenses.services && expenses.services.find((expense) => expense.name === type);
    if (selectedExpense !== null) {
      if (selectedExpense.included === "INCLUDED") return "Incluído";
      if (selectedExpense.included === "EXCLUDED") return "Não Incluído";
      return `Despesas até ${selectedExpense.max}€`;
    }

    return "Não Incluído";
  };
  return (
    <div className="absolute -left-32  z-50 hidden bg-white peer-hover:block lg:bottom-6 lg:-left-32">
      <div className="mb-2 mt-3 flex rounded-lg p-1 shadow-2xl lg:p-4">
        <div className="mx-4 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:px-4">
          <FaRegLightbulb className="h-4 w-4  lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm">
            <>
              Eletricidade
              <br />
              {checkIfIncluded(ExpenseName["LIGHTS"])}
            </>
          </div>
        </div>
        <div className="mx-4 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:px-4">
          <AiOutlineFire className="h-4 w-4  lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm ">
            <>
              Gás
              <br />
              {checkIfIncluded(ExpenseName["GAS"])}
            </>
          </div>
        </div>

        <div className="mx-4 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:px-4">
          <AiOutlineWifi className="h-4 w-4  lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm ">
            <>
              Internet
              <br />
              {checkIfIncluded(ExpenseName["INTERNET"])}
            </>
          </div>
        </div>
        <div className="mx-4 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:px-4">
          <BsWater className="h-4 w-4  lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm ">
            <>
              Água
              <br />
              {checkIfIncluded(ExpenseName["WATER"])}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomUtilitesPopover;
