import { AiOutlineFire, AiOutlineWifi } from "react-icons/ai";
import { BsWater } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { ExpenseName, HouseExpenses } from "../../models/advertisement";
import { useTranslation } from "next-i18next";

interface roomUtilitesPopoverProps {
  expenses: HouseExpenses;
}

const RoomUtilitesPopover = ({ expenses }: roomUtilitesPopoverProps) => {
  const { t } = useTranslation();
  const checkIfIncluded = (type: ExpenseName) => {
    if (!expenses || !expenses.services || expenses.services.length === 0) return false;
    const selectedExpense = expenses.services.find((expense) => expense.name === type);
    if (selectedExpense !== null) {
      if (selectedExpense?.included === "INCLUDED") return t("advertisements:included");
      if (selectedExpense?.included === "EXCLUDED") return t("advertisements:not_included");
      if (selectedExpense?.max) return t("advertisements:expenses_up_to", { value: selectedExpense.max });
      return t("no_information");
    }

    return t("advertisements:not_included");
  };
  return (
    <div className="absolute -bottom-20 -left-32 z-50 hidden bg-white group-hover:block lg:-left-32">
      <div className="mb-2 mt-3 flex flex-row gap-2 rounded-lg p-1 shadow-2xl lg:p-4">
        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-4 lg:px-4">
          <FaRegLightbulb className="h-4 w-4 lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm">
            <>
              {t("advertisements:electricity")}
              <br />
              {checkIfIncluded("LIGHTS")}
            </>
          </div>
        </div>
        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-4 lg:px-4">
          <AiOutlineFire className="h-4 w-4 lg:h-12 lg:w-12 lg:p-2" />
          <div className="mt-2 text-xs lg:text-sm ">
            <>
              {t("advertisements:gas")}
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
              {t("advertisements:water")}
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
