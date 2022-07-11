import { useCurrentStep, useSetCurrentStep } from "../../context/AnunciarProvider";
import Input from "../utils/Input";
import {
  ADVERTISEMENT_PROPERTIES,
  EXPENSES_TYPE,
  INCLUSIVE_EXPENSES,
} from "../../models/advertisement";
import classNames from "classnames";
import {
  useAdvertisement,
  useSetAdvertisementProperty,
} from "../../context/AdvertisementController";

const FormPasso6 = () => {
  const currentStep = useCurrentStep();
  const setCurrentStep = useSetCurrentStep();

  const advertisement = useAdvertisement();
  const setAdvertisementProperty = useSetAdvertisementProperty();

  const nextStep = (e) => {
    e.preventDefault();
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  // for the primary value.
  const defineExpensesTopLevel = (e) => {
    const { expenses } = advertisement;
    const newExpense = { ...expenses, expenses: e.target.value };
    setAdvertisementProperty(ADVERTISEMENT_PROPERTIES.EXPENSES, newExpense);
  };

  // for the expenses.
  const defineTypeExpenses = (e) => {
    const { expenses } = advertisement;

    const typeLabel = e.target.name;
    const typeValue = e.target.value;

    const newTypeExpense = { ...expenses, [typeLabel]: typeValue };
    setAdvertisementProperty(ADVERTISEMENT_PROPERTIES.EXPENSES, newTypeExpense);
  };

  // check if expenses are partially selected
  const isPartiallyIncluded = () => {
    const { expenses } = advertisement;
    return expenses?.inclusive === INCLUSIVE_EXPENSES.PARTIALLY;
  };

  return (
    <section className="container mx-auto my-20 w-5/6">
      <div className="mb-28 text-2xl font-bold text-gray-700">Vamos a valores!</div>
      <div className="flex flex-col">
        <div className="flex items-center align-middle">
          <p className="w-60 text-base font-bold">Valor Mensal</p>
          <div className=" ml-6 flex flex-row items-center">
            <div className="w-full  text-base">
              <Input
                label={ADVERTISEMENT_PROPERTIES.MONTH_RENT}
                labelText=""
                customCss="euro"
                value=""
                onChange={(e) =>
                  setAdvertisementProperty(ADVERTISEMENT_PROPERTIES.MONTH_RENT, e.target.value)
                }
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
                value=""
                onChange={(e) =>
                  setAdvertisementProperty(ADVERTISEMENT_PROPERTIES.EXTRA_PER_HOST, e.target.value)
                }
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
                value=""
                onChange={(e) =>
                  setAdvertisementProperty(ADVERTISEMENT_PROPERTIES.GUARANTEE_VALUE, e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col">
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="included_expenses"
                value={INCLUSIVE_EXPENSES.INCLUDED}
                onChange={(e) => defineExpensesTopLevel(e)}
              />
            </div>
            <div className="ml-4 text-xl font-bold">Despesas incluídas</div>
          </div>

          <div className="flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="included_expenses"
                value={INCLUSIVE_EXPENSES.PARTIALLY}
                onChange={(e) => defineExpensesTopLevel(e)}
              />
            </div>
            <div className="ml-4 text-xl font-bold">Despesas parcialmente incluídas</div>
          </div>

          <div className={classNames({ hidden: !isPartiallyIncluded() })}>
            <div className="my-8 mt-20 flex items-center">
              <div className="flex items-center">
                <p className="w-24 text-base font-bold">Gás</p>
              </div>

              <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div className="mr-16 text-base">Sim</div>
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      className=" h-4 w-4 rounded border border-terciary-500"
                      name={EXPENSES_TYPE.GAS}
                      value="true"
                      onChange={(e) => defineTypeExpenses(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div className="mr-16 text-base">Não</div>
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      className=" h-4 w-4 rounded border border-terciary-500"
                      name={EXPENSES_TYPE.GAS}
                      value="false"
                      onChange={(e) => defineTypeExpenses(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 mt-4 flex items-center">
              <div className="flex items-center">
                <p className="w-24 text-base font-bold">Internet</p>
              </div>

              <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div className="mr-16 text-base">Sim</div>
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      className=" h-4 w-4 rounded border border-terciary-500"
                      name={EXPENSES_TYPE.INTERNET}
                      value="true"
                      onChange={(e) => defineTypeExpenses(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div className="mr-16 text-base">Não</div>
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      className=" h-4 w-4 rounded border border-terciary-500"
                      name={EXPENSES_TYPE.INTERNET}
                      value="false"
                      onChange={(e) => defineTypeExpenses(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 mt-4 flex items-center">
              <div className="flex items-center">
                <p className="w-24 text-base font-bold">Agua</p>
              </div>

              <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div className="mr-16 text-base">Sim</div>
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      className=" h-4 w-4 rounded border border-terciary-500"
                      name={EXPENSES_TYPE.WATER}
                      value="true"
                      onChange={(e) => defineTypeExpenses(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div className="mr-16 text-base">Não</div>
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      name={EXPENSES_TYPE.WATER}
                      className="h-4 w-4 rounded border border-terciary-500"
                      value="false"
                      onChange={(e) => defineTypeExpenses(e)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 mt-4 flex items-center">
              <div className="flex items-center">
                <p className="w-24 text-base font-bold">Luz</p>
              </div>

              <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div className="mr-16 text-base">Sim</div>
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      name={EXPENSES_TYPE.LIGHTS}
                      className="h-4 w-4 rounded border border-terciary-500"
                      value="true"
                      onChange={(e) => defineTypeExpenses(e)}
                    />
                  </div>
                </div>
              </div>

              <div className="ml-6 flex w-40 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div className="mr-16 text-base">Não</div>
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      name={EXPENSES_TYPE.LIGHTS}
                      className="h-4 w-4 rounded border border-terciary-500"
                      value="false"
                      onChange={(e) => defineTypeExpenses(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="included_expenses"
                value={INCLUSIVE_EXPENSES.EXCLUDED}
                onChange={(e) => defineExpensesTopLevel(e)}
              />
            </div>
            <div className="ml-4 text-xl font-bold">Despesas excluídas</div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-16 flex items-center rounded-md bg-primary-500 py-4  px-9 text-center uppercase  leading-tight text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg "
        onClick={(e) => nextStep(e)}
      >
        Seguinte &#8594;
      </button>
    </section>
  );
};

export default FormPasso6;
