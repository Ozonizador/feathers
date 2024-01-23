import { AiOutlineFire, AiOutlineWifi } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import { BsWater } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { ExpenseName, HouseExpenses, TypeExpense } from "../../models/advertisement";
import { useTranslation } from "next-i18next";
import { useEffect, useState, useRef } from "react";

/**
 * Expenses Logic
 * @returns
 */

interface ExpensesComponentProps {
  expenses?: HouseExpenses;
}

const ExpensesComponent = ({ expenses }: ExpensesComponentProps) => {
  const [popupState, setPopupState] = useState<boolean>(false);

  const containsExpenses = () => {
    if (!expenses || !expenses.services) return false;
    return expenses.services.length > 0;
  };

  return (
    <>
      {containsExpenses() && (
        <div className="relative my-2 text-center">
          <div
            className="mt-0 flex items-center justify-center gap-2 align-middle md:mt-[18px]"
            onMouseEnter={() => setPopupState(true)}
            onMouseLeave={() => setPopupState(false)}
          >
            <div className="group relative flex items-center">
              <span className="text-[16px] ">{CheckIfExpensesIncluded(expenses?.services || [])}</span>
              <BiInfoCircle className="ml-2" />
            </div>
          </div>
          <div className={`transition-opacity duration-700 ease-in ${popupState ? "opacity-100" : "opacity-0"}`}>
            <RoomUtilitesPopover expenses={expenses!} />
          </div>
        </div>
      )}
    </>
  );
};

/**
 * POPOVER
 */

interface RoomExpensesPopover {
  expenses: HouseExpenses;
}

const RoomUtilitesPopover = ({ expenses }: RoomExpensesPopover) => {
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
    <div
      className={`absolute right-[-20px] z-50 rounded-lg bg-white group-hover:block sm:right-[100px] md:bottom-[60%]  md:right-[7px] md:scale-75 lg:bottom-0 lg:right-[-45px] xl:right-[11px] 2xl:scale-90`}
    >
      <div className="my-2 flex flex-row gap-2 rounded-lg  shadow-2xl md:p-1">
        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-1 lg:px-1">
          <FaRegLightbulb className="md:h-8 md:w-8 lg:h-10 lg:w-10 " />
          <div className="mt-2 text-[12px] md:text-[17px] lg:text-[16px] ">
            <>
              {t("advertisements:electricity")}
              <br />
              {checkIfIncluded("LIGHTS")}
            </>
          </div>
        </div>
        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-1 lg:px-1">
          <AiOutlineFire className=" md:h-8 md:w-8 lg:h-10 lg:w-10 " />
          <div className="mt-2 text-[12px] md:text-[17px] lg:text-[16px] ">
            <>
              {t("advertisements:gas")}
              <br />
              {checkIfIncluded("GAS")}
            </>
          </div>
        </div>

        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-1 lg:px-1">
          <AiOutlineWifi className="md:h-8 md:w-8 lg:h-10 lg:w-10 " />
          <div className="mt-2 text-[12px] md:text-[17px] lg:text-[16px] ">
            <>
              {t("amenities:wifi")}
              <br />
              {checkIfIncluded("INTERNET")}
            </>
          </div>
        </div>
        <div className="mx-2 flex flex-col items-center justify-center px-0 align-middle text-secondary-500 lg:mx-1 lg:px-1">
          <BsWater className="md:h-8 md:w-8 lg:h-10 lg:w-10 " />
          <div className="mt-2 text-[12px] md:text-[17px] lg:text-[16px]  ">
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

/**
 * Aux functions
 */

export const CheckIfExpensesIncluded = (expenses: TypeExpense[]) => {
  const { t } = useTranslation();
  let included = 0;
  let partially = 0;
  let excluded = 0;

  if (!expenses || expenses.length === 0) {
    return "";
  }
  for (let expense of expenses) {
    if (expense.included == "INCLUDED") included++;
    if (expense.included == "PARTIALLY") partially++;
    if (expense.included == "EXCLUDED") excluded++;
  }

  if (included === 0 && partially === 0 && excluded === 0) return t("advertisements:no_expenses_information");
  if (included !== 0 && partially === 0 && excluded === 0) return t("advertisements:expenses_included");
  if (included === 0 && partially !== 0 && excluded === 0) return t("advertisements:expenses_partially_included");
  if (included === 0 && partially === 0 && excluded !== 0) return t("advertisements:expenses_not_included");

  return t("advertisements:expenses_partially_included");
};

export default ExpensesComponent;
