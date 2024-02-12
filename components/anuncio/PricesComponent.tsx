import classNames from "classnames";
import { ChangeEvent, SetStateAction, useCallback, useState } from "react";
import {
  Advertisement,
  ADVERTISEMENT_PROPERTIES,
  ExpenseName,
  TypeExpense,
  Included,
} from "../../models/advertisement";
import Checkbox from "../utils/Checkbox";
import Input from "../utils/Input";
import RadioBox from "../utils/Radiobox";
import { on } from "process";
import { useTranslation } from "next-i18next";

interface PricesComponentProps {
  advertisement: Advertisement;
  onChange: (property: string, value: any) => void;
}

const PricesComponent = ({ advertisement, onChange }: PricesComponentProps) => {
  const [selectedOption, setSelectedOption] = useState<Included>();
  const { t } = useTranslation();
  // radio yes or no per expense */

  const toggleTypeExpenses = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { expenses } = advertisement;

    const services = (expenses && expenses.services?.filter((service) => service.name !== event.target.name)) || [];
    const newService = { name: event.target.name, max: 0, included: event.target.value } as TypeExpense;

    onChange(ADVERTISEMENT_PROPERTIES.EXPENSES, {
      ...expenses,
      services: [...services, newService],
    });
  };

  const setTypeExpenseIncluded = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { expenses } = advertisement;
    const expenseType = event.target.getAttribute("data-expense");

    const services = (expenses && expenses.services?.filter((service) => service.name !== expenseType)) || [];
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

  const setMaxExpenseValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { expenses } = advertisement;
    const expenseType = event.target.getAttribute("data-expense");

    const services =
      expenses &&
      expenses.services?.map((service) => {
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

  const setExpenses = (included: Included) => {
    const { expenses } = advertisement;

    setSelectedOption(included);

    if (included == "INCLUDED" || included == "EXCLUDED") {
      const services =
        expenses &&
        expenses.services?.map((service) => {
          return { name: service.name, included: included };
        });

      onChange(ADVERTISEMENT_PROPERTIES.EXPENSES, {
        ...expenses,
        services,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex flex-col md:flex-row md:gap-2 lg:items-center">
          <div className="md:w-80">
            <p className="items-start text-base font-bold">{t("common:monthly_rent")}</p>
          </div>
          <div className="flex flex-row items-center lg:ml-6 lg:w-fit">
            <Input
              name={ADVERTISEMENT_PROPERTIES.MONTH_RENT}
              labelText=""
              customCss="euro"
              value={String(advertisement.month_rent)}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.MONTH_RENT, e.target.value)}
            />
            <div className="ml-2 text-base font-bold">/{t("common:month")}</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-2 lg:items-center">
          <div className="md:w-80">
            <p className="items-start text-base font-bold">{t("common:extra_per_person")}</p>
          </div>
          <div className="flex flex-row items-center lg:ml-6 lg:w-fit">
            <Input
              name={ADVERTISEMENT_PROPERTIES.EXTRA_PER_HOST}
              labelText=""
              customCss="euro"
              value={String(advertisement.extra_per_host)}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.EXTRA_PER_HOST, e.target.value)}
            />
            <div className="ml-2 text-base font-bold">/{t("common:month")}</div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-2 lg:items-center">
          <div className="md:w-80">
            <p className="items-start text-base font-bold">{t("common:deposit")}</p>
          </div>
          <div className="flex flex-row items-center lg:ml-6 lg:w-fit">
            <Input
              name={ADVERTISEMENT_PROPERTIES.GUARANTEE_VALUE}
              labelText=""
              customCss="euro"
              value={String(advertisement.guarantee_value)}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.GUARANTEE_VALUE, e.target.value)}
            />
          </div>
        </div>

        <section>
          <div>
            <div className="my-5 flex items-center gap-2 pb-2">
              <p className="text-xl font-bold">{t("admin:unidesk.student.expenses")}</p>
              <p className="text-sm text-gray-400">{"(Agua, Luz, Internet, Gás)"}</p>
            </div>
            <ul className="flex flex-col gap-2">
              <li>
                <label className="flex items-center gap-2">
                  <RadioBox
                    name="options"
                    value={"INCLUDED"}
                    onChange={() => setExpenses("INCLUDED")}
                    checked={selectedOption === "INCLUDED"}
                  />
                  <p>{t("advertisements:expenses_included")}</p>
                </label>
              </li>
              <li>
                <label className="flex items-center gap-2">
                  <RadioBox
                    name="options"
                    value="PARTIALLY"
                    checked={selectedOption === "PARTIALLY"}
                    onChange={() => setExpenses("PARTIALLY")}
                  />
                  <p>{t("advertisements:expenses_partially_included")}</p>
                </label>

                {selectedOption == "PARTIALLY" && (
                  <div className="relative left-2">
                    <ExpenseSelection
                      expense={"GAS"}
                      title={t("advertisements:gas")}
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
                      title={t("advertisements:water")}
                      setMaxExpenseValue={setMaxExpenseValue}
                      toggleTypeExpenses={toggleTypeExpenses}
                      getExpenseInfoByInfo={getExpenseInfoByInfo}
                      setTypeExpenseIncluded={setTypeExpenseIncluded}
                    />
                    <ExpenseSelection
                      expense={"LIGHTS"}
                      title={t("advertisements:electricity")}
                      setMaxExpenseValue={setMaxExpenseValue}
                      toggleTypeExpenses={toggleTypeExpenses}
                      getExpenseInfoByInfo={getExpenseInfoByInfo}
                      setTypeExpenseIncluded={setTypeExpenseIncluded}
                    />
                  </div>
                )}
              </li>
              <li>
                <label className="flex items-center gap-2">
                  <RadioBox
                    name="options"
                    value="EXCLUDED"
                    checked={selectedOption === "EXCLUDED"}
                    onChange={() => setExpenses("EXCLUDED")}
                  />
                  {t("advertisements:expenses_not_included")}
                </label>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
};

interface ExpenseSelectionProps {
  expense: ExpenseName;
  title: string;
  toggleTypeExpenses: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setMaxExpenseValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getExpenseInfoByInfo: (label: ExpenseName) => TypeExpense | undefined;
  setTypeExpenseIncluded: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        <div className="mb-auto flex items-center justify-start gap-2 pt-4">
          <p className="text-lg font-black italic text-primary-500">{title}</p>
          <p className="text-gray-400">{"(Incluído?)"}</p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex w-fit flex-row lg:flex-col">
            <div className="flex w-fit flex-row items-center justify-between rounded-lg px-3 py-3">
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
            <div className="relative left-3 w-fit">
              {expenseInfo?.included !== "EXCLUDED" && (
                <div className="flex h-full flex-col gap-4 rounded-lg px-2 py-3">
                  <div className="flex items-center">
                    <label htmlFor="all_included" className="mr-1 w-1/2 text-xs">
                      Totalmente incluído?
                    </label>
                    <Checkbox
                      name="all_included"
                      data-expense={expense}
                      onChange={setTypeExpenseIncluded}
                      checked={(expenseInfo && expenseInfo.included === "INCLUDED") || false}
                    />
                  </div>
                  <div className="flex flex-row gap-3 rounded-lg lg:w-11/12">
                    <label className="my-auto w-1/2 text-base" htmlFor="max_value">
                      Incluído até:
                    </label>
                    <Input
                      labelText=""
                      customCss="euro"
                      defaultValue={expenseInfo?.max || 0}
                      disabled={!expenseInfo || (expenseInfo && expenseInfo.included === "INCLUDED")}
                      onChange={setMaxExpenseValue}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="flex w-fit flex-row items-center justify-between rounded-lg px-3 py-3">
              <div className="flex h-fit items-center">
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
        </div>
      </div>
    </>
  );
};

export default PricesComponent;
