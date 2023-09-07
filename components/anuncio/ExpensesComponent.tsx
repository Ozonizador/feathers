import { AiOutlineFire, AiOutlineWifi } from "react-icons/ai";
import { BiInfoCircle } from "react-icons/bi";
import { BsWater } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { ExpenseName, HouseExpenses, TypeExpense } from "../../models/advertisement";
import { useTranslation } from "next-i18next";
import { t } from "i18next";

/**
 * Expenses Logic
 * @returns
 */

interface ExpensesComponentProps {
  expenses?: HouseExpenses;
}

const ExpensesComponent = ({ expenses }: ExpensesComponentProps) => {
  if (!expenses) return <></>;

  const containsExpenses = () => {
    if (!expenses || !expenses.services) return false;
    return expenses.services.length > 0;
  };

  return (
    <>
      {containsExpenses() && (
        <div className="relative mb-2 text-center text-base">
          <div className="flex items-center justify-center gap-2 align-middle">
            <div className="group flex items-center">
              <span>{checkIfExpensesIncluded(expenses?.services || [])}</span>
              <BiInfoCircle className="ml-2" />
            </div>
            <RoomUtilitesPopover expenses={expenses} />
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
              {t("amenities:wifi")}
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

/**
 * Aux functions
 */

export const checkIfExpensesIncluded = (expenses: TypeExpense[]) => {
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
