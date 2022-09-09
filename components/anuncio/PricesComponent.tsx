import classNames from "classnames";
import { useCallback, useMemo } from "react";
import Advertisement, { ADVERTISEMENT_PROPERTIES, ExpenseName, TypeExpense } from "../../models/advertisement";
import Input from "../utils/Input";

interface PricesComponentProps {
  advertisement: Advertisement;
  onChange: (property, value) => void;
}

interface ExpenseSelectionProps {
  expense: ExpenseName;
  title: string;
}

const PricesComponent = ({ advertisement, onChange }: PricesComponentProps) => {
  // radio yes or no per expense */
  const toggleTypeExpenses = (event) => {
    const { expenses } = advertisement;

    const services = expenses && expenses.services.filter((service) => service.name !== event.target.name);
    const newService = { name: event.target.name, max: 0, included: event.target.value } as TypeExpense;

    onChange(ADVERTISEMENT_PROPERTIES.EXPENSES, {
      ...expenses,
      services: [...services, newService],
    });
  };

  const setTypeExpenseIncluded = (event) => {
    const { expenses } = advertisement;
    const expenseType = event.target.getAttribute("data-expense");

    const services = expenses && expenses.services.filter((service) => service.name !== expenseType);
    const newService = {
      name: expenseType,
      max: 0,
      included: event.target.checked ? "INCLUDED" : "PARTIALLY",
    } as TypeExpense;

    onChange(ADVERTISEMENT_PROPERTIES.EXPENSES, {
      ...expenses,
      services: [...services, newService],
    });
  };

  const getExpenseInfoByInfo = useCallback(
    (label: ExpenseName) => {
      const { expenses } = advertisement;

      return expenses && expenses.services && expenses.services.find((service) => service.name === label);
    },
    [advertisement]
  );

  const setMaxExpenseValue = (event) => {
    const { expenses } = advertisement;
    const expenseType = event.target.getAttribute("data-expense");

    const services =
      expenses &&
      expenses.services.map((service) => {
        if (service.name === expenseType) {
          return { ...service, max: parseInt(event.target.value) };
        } else {
          return service;
        }
      });

    onChange(ADVERTISEMENT_PROPERTIES.EXPENSES, {
      ...expenses,
      services,
    });
  };

  const ExpenseSelection = ({ expense, title }: ExpenseSelectionProps) => {
    const expenseInfo = getExpenseInfoByInfo(expense);
    return (
      <div className="my-8 mt-4 flex items-center">
        <div className="mb-auto flex py-4">
          <p className="w-16 text-base font-bold">{title}</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="ml-6 flex flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div>
              <div className="flex h-5 items-center">
                <div className="mr-3">Sim</div>
                <input
                  type="radio"
                  name={expense}
                  value={"PARTIALLY"}
                  className="h-4 w-4 rounded border border-terciary-500"
                  onChange={(e) => toggleTypeExpenses(e)}
                  checked={expenseInfo && expenseInfo.included !== "EXCLUDED"}
                />
              </div>
            </div>
          </div>
          <div className="ml-6 flex flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div className="flex h-5 items-center">
              <div className="mr-3">Não</div>
              <input
                type="radio"
                className="h-4 w-4 rounded border border-terciary-500"
                name={expense}
                value={"EXCLUDED"}
                onChange={(e) => toggleTypeExpenses(e)}
                checked={expenseInfo && expenseInfo.included === "EXCLUDED"}
              />
            </div>
          </div>
        </div>

        {expenseInfo?.included !== "EXCLUDED" && (
          <div className="ml-3 flex flex-col gap-2">
            <div className="ml-6 flex flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
              <label htmlFor="all_included">Totalmente incluído.</label>
              <input
                name="all_included"
                data-expense={expense}
                onChange={(e) => setTypeExpenseIncluded(e)}
                checked={expenseInfo && expenseInfo.included === "INCLUDED"}
                type="checkbox"
                className="h-4 w-4 rounded border border-terciary-500"
              />
            </div>
            <div className="ml-6 flex flex-row items-center justify-between rounded-lg border border-terciary-500 py-2 px-3">
              <label htmlFor="max_value">Incluído até:</label>
              <input
                name="max_value"
                data-expense={expense}
                type="number"
                value={expenseInfo?.max || 0}
                disabled={!expenseInfo || (expenseInfo && expenseInfo.included === "INCLUDED")}
                onChange={(e) => setMaxExpenseValue(e)}
                className={classNames("ml-2 rounded border border-terciary-500 p-1", {
                  "bg-gray-200": !expenseInfo || expenseInfo?.included === "INCLUDED",
                })}
              ></input>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center align-middle">
          <p className="w-60 text-base font-bold">Valor Mensal</p>
          <div className=" ml-6 flex flex-row items-center">
            <div className="w-full  text-base">
              <Input
                label={ADVERTISEMENT_PROPERTIES.MONTH_RENT}
                labelText=""
                customCss="euro"
                value={String(advertisement.monthRent)}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.MONTH_RENT, e.target.value)}
              />
            </div>
            <div className="ml-2 text-base font-bold">/mês</div>
          </div>
        </div>

        <div className="flex items-center align-middle">
          <p className="w-60 text-base font-bold">Preço por pessoa extra</p>
          <div className=" ml-6 flex flex-row items-center">
            <div className="w-full  text-base">
              <Input
                label={ADVERTISEMENT_PROPERTIES.EXTRA_PER_HOST}
                labelText=""
                customCss="euro"
                value={String(advertisement.extraPerHost)}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.EXTRA_PER_HOST, e.target.value)}
              />
            </div>
            <div className="ml-2 text-base font-bold">/mês</div>
          </div>
        </div>

        <div className="flex items-center align-middle">
          <p className="w-60 text-base font-bold">Caução</p>
          <div className=" ml-6 flex flex-row items-center ">
            <div className="w-full  text-base">
              <Input
                label={ADVERTISEMENT_PROPERTIES.GUARANTEE_VALUE}
                labelText=""
                customCss="euro"
                value={String(advertisement.guaranteeValue)}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.GUARANTEE_VALUE, e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="my-8 flex flex-col">
            <ExpenseSelection expense={ExpenseName.GAS} title="Gás" />
            <ExpenseSelection expense={ExpenseName.INTERNET} title="Internet" />
            <ExpenseSelection expense={ExpenseName.WATER} title="Água" />
            <ExpenseSelection expense={ExpenseName.LIGHTS} title="Luz" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PricesComponent;
