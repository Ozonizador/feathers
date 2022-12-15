import classNames from "classnames";
import { useCallback } from "react";
import { Advertisement, ADVERTISEMENT_PROPERTIES, ExpenseName, TypeExpense } from "../../models/advertisement";
import Checkbox from "../utils/Checkbox";
import Input from "../utils/Input";
import RadioBox from "../utils/Radiobox";

interface PricesComponentProps {
  advertisement: Advertisement;
  onChange: (property, value) => void;
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

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:mx-5 md:flex-row md:gap-2 lg:items-center">
          <div className="md:w-80">
            <p className="items-start text-base font-bold">Valor Mensal</p>
          </div>
          <div className="flex flex-row items-center lg:ml-6 lg:w-fit">
            <Input
              label={ADVERTISEMENT_PROPERTIES.MONTH_RENT}
              labelText=""
              customCss="euro"
              value={String(advertisement.month_rent)}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.MONTH_RENT, e.target.value)}
            />
            <div className="ml-2 text-base font-bold">/mês</div>
          </div>
        </div>

        <div className="flex flex-col md:mx-5 md:flex-row md:gap-2 lg:items-center">
          <div className="md:w-80">
            <p className="items-start text-base font-bold">Preço por pessoa extra</p>
          </div>
          <div className="flex flex-row items-center lg:ml-6 lg:w-fit">
            <Input
              label={ADVERTISEMENT_PROPERTIES.EXTRA_PER_HOST}
              labelText=""
              customCss="euro"
              value={String(advertisement.extra_per_host)}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.EXTRA_PER_HOST, e.target.value)}
            />
            <div className="ml-2 text-base font-bold">/mês</div>
          </div>
        </div>

        <div className="flex flex-col md:mx-5 md:flex-row md:gap-2 lg:items-center">
          <div className="md:w-80">
            <p className="items-start text-base font-bold">Caução</p>
          </div>
          <div className="flex flex-row items-center lg:ml-6 lg:w-fit">
            <Input
              label={ADVERTISEMENT_PROPERTIES.GUARANTEE_VALUE}
              labelText=""
              customCss="euro"
              value={String(advertisement.guarantee_value)}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.GUARANTEE_VALUE, e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="my-8 flex flex-col lg:grid lg:grid-cols-2">
            <ExpenseSelection
              expense={"GAS"}
              title="Gás"
              setMaxExpenseValue={setMaxExpenseValue}
              toggleTypeExpenses={toggleTypeExpenses}
              getExpenseInfoByInfo={getExpenseInfoByInfo}
              setTypeExpenseIncluded={setTypeExpenseIncluded}
            />
            <ExpenseSelection
              expense={"INTERNET"}
              title="Internet"
              setMaxExpenseValue={setMaxExpenseValue}
              toggleTypeExpenses={toggleTypeExpenses}
              getExpenseInfoByInfo={getExpenseInfoByInfo}
              setTypeExpenseIncluded={setTypeExpenseIncluded}
            />
            <ExpenseSelection
              expense={"WATER"}
              title="Água"
              setMaxExpenseValue={setMaxExpenseValue}
              toggleTypeExpenses={toggleTypeExpenses}
              getExpenseInfoByInfo={getExpenseInfoByInfo}
              setTypeExpenseIncluded={setTypeExpenseIncluded}
            />
            <ExpenseSelection
              expense={"LIGHTS"}
              title="Luz"
              setMaxExpenseValue={setMaxExpenseValue}
              toggleTypeExpenses={toggleTypeExpenses}
              getExpenseInfoByInfo={getExpenseInfoByInfo}
              setTypeExpenseIncluded={setTypeExpenseIncluded}
            />
          </div>
        </div>
      </div>
    </>
  );
};

interface ExpenseSelectionProps {
  expense: ExpenseName;
  title: string;
  toggleTypeExpenses: (e) => void;
  setMaxExpenseValue: (e) => void;
  getExpenseInfoByInfo: (label: string) => TypeExpense;
  setTypeExpenseIncluded: (e) => void;
}

const ExpenseSelection = ({
  expense,
  title,
  toggleTypeExpenses,
  setMaxExpenseValue,
  getExpenseInfoByInfo,
  setTypeExpenseIncluded,
}: ExpenseSelectionProps) => {
  const expenseInfo = getExpenseInfoByInfo(expense);
  return (
    <>
      <div>
        <div className="mb-auto flex justify-center py-4 lg:justify-start">
          <p className="text-base font-bold">{title}</p>
        </div>
        <div className="my-4 flex flex-col items-center gap-4 lg:flex-row">
          <div className="flex w-full flex-row justify-between gap-2 lg:flex-col">
            <div className="flex flex-row items-center rounded-lg border border-terciary-500 py-3 px-3">
              <div className="flex h-full items-center">
                <div className="mr-3">Sim</div>
                <RadioBox
                  name={expense}
                  value={"PARTIALLY"}
                  onChange={toggleTypeExpenses}
                  checked={expenseInfo && expenseInfo.included !== "EXCLUDED"}
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
              <div className="flex h-full items-center">
                <div className="mr-3">Não</div>
                <RadioBox
                  name={expense}
                  value={"EXCLUDED"}
                  onChange={toggleTypeExpenses}
                  checked={expenseInfo && expenseInfo.included === "EXCLUDED"}
                />
              </div>
            </div>
          </div>
          <div>
            {expenseInfo?.included !== "EXCLUDED" && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:w-11/12">
                  <label htmlFor="all_included">Totalmente incluído.</label>
                  <Checkbox
                    name="all_included"
                    data-expense={expense}
                    onChange={setTypeExpenseIncluded}
                    checked={expenseInfo && expenseInfo.included === "INCLUDED"}
                  />
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border border-terciary-500 py-2 px-3 lg:w-11/12">
                  <label className="text-xs" htmlFor="max_value">
                    Incluído até:
                  </label>
                  <input
                    name="max_value"
                    data-expense={expense}
                    type="number"
                    value={expenseInfo?.max || 0}
                    disabled={!expenseInfo || (expenseInfo && expenseInfo.included === "INCLUDED")}
                    onChange={setMaxExpenseValue}
                    className={classNames("ml-2 w-1/2 rounded border border-terciary-500 p-1 pl-2 lg:w-full", {
                      "bg-gray-200": !expenseInfo || expenseInfo?.included === "INCLUDED",
                    })}
                  ></input>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricesComponent;
