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
    const selectedExpense = expenses.services && expenses.services.find((expense) => expense.name === type);
    if (selectedExpense !== null) {
      if (selectedExpense?.included === "INCLUDED") return "Incluído";
      if (selectedExpense?.included === "EXCLUDED") return "Não Incluído";
      if (selectedExpense?.max) return `Despesas até ${selectedExpense.max}€`;
      return "Sem informação";
    }

    return "Não Incluído";
  };
  return (
    <div className="absolute -left-32 -bottom-20 z-50 hidden bg-white group-hover:block lg:-left-32">
      <div className="mb-2 mt-3 flex flex-row gap-2 rounded-lg p-1 shadow-2xl lg:p-4">
        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-4 lg:px-4">
          <FaRegLightbulb className="h-4 w-4 lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm">
            <>
              Eletricidade
              <br />
              {checkIfIncluded("LIGHTS")}
            </>
          </div>
        </div>
        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-4 lg:px-4">
          <AiOutlineFire className="h-4 w-4 lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm ">
            <>
              Gás
              <br />
              {checkIfIncluded("GAS")}
            </>
          </div>
        </div>

        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-4 lg:px-4">
          <AiOutlineWifi className="h-4 w-4 lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm ">
            <>
              Internet
              <br />
              {checkIfIncluded("INTERNET")}
            </>
          </div>
        </div>
        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-4 lg:px-4">
          <BsWater className="h-4 w-4 lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm ">
            <>
              Água
              <br />
              {checkIfIncluded("WATER")}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomUtilitesPopover;
