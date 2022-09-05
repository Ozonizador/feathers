import classNames from "classnames";
import Advertisement, {
  ADVERTISEMENT_PROPERTIES,
  EXPENSE_TYPE,
  INCLUSIVE_EXPENSES,
  InfoExpenses,
} from "../../models/advertisement";
import Input from "../utils/Input";

interface PricesComponentProps {
  advertisement: Advertisement;
  onChange: (property, value) => void;
}

const PricesComponent = ({ advertisement, onChange }: PricesComponentProps) => {
  const checkTypeExpenses = (typeExpense: INCLUSIVE_EXPENSES) => {
    const { expenses } = advertisement;
    return expenses.inclusive === typeExpense;
  };

  // check if expenses are partially selected
  const isPartiallyIncluded = () => {
    const { expenses } = advertisement;
    return expenses?.inclusive === INCLUSIVE_EXPENSES.PARTIALLY;
  };

  // for the primary value.
  const defineExpensesTopLevel = (e) => {
    const { expenses } = advertisement;
    const newExpense = { ...expenses, inclusive: e.target.value };
    onChange(ADVERTISEMENT_PROPERTIES.EXPENSES, newExpense);
  };

  const toggleTypeExpenses = (event) => {
    const { expenses } = advertisement;

    const services = expenses.services;
    const newService = { name: event.target.name, max: 0, included: event.target.checked } as InfoExpenses;

    onChange(ADVERTISEMENT_PROPERTIES.HOUSE_RULES, {
      ...expenses,
      services: { ...services, newService },
    });
  };

  const checkPartiallyExpense = (label: EXPENSE_TYPE, included: boolean) => {
    const { expenses } = advertisement;
    return (
      expenses &&
      expenses.services &&
      expenses.services.filter((service) => service.name === label && service.included === included).length > 0
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

        <div className="mt-10 flex flex-col">
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="inclusive"
                value={INCLUSIVE_EXPENSES.INCLUDED}
                onChange={(e) => defineExpensesTopLevel(e)}
                checked={checkTypeExpenses(INCLUSIVE_EXPENSES.INCLUDED)}
              />
            </div>
            <div className="ml-4 text-xl font-bold">Despesas incluídas</div>
          </div>

          <div className="flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="inclusive"
                value={INCLUSIVE_EXPENSES.PARTIALLY}
                onChange={(e) => defineExpensesTopLevel(e)}
                checked={checkTypeExpenses(INCLUSIVE_EXPENSES.PARTIALLY)}
              />
            </div>
            <div className="ml-4 text-xl font-bold">Despesas parcialmente incluídas</div>
          </div>

          <div className={classNames({ hidden: !isPartiallyIncluded() })}>
            <div className="my-8 mt-20 flex items-center">
              <div className="flex items-center">
                <p className="w-24 text-base font-bold">Gás</p>
              </div>

              <div className="ml-6 flex  flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      className=" h-4 w-4 rounded border border-terciary-500"
                      name={EXPENSE_TYPE.GAS}
                      onChange={(e) => toggleTypeExpenses(e)}
                      checked={checkPartiallyExpense(EXPENSE_TYPE.GAS, true)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 mt-4 flex items-center">
              <div className="flex items-center">
                <p className="w-24 text-base font-bold">Internet</p>
              </div>

              <div className="ml-6 flex  flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      className=" h-4 w-4 rounded border border-terciary-500"
                      name={EXPENSE_TYPE.INTERNET}
                      onChange={(e) => toggleTypeExpenses(e)}
                      checked={checkPartiallyExpense(EXPENSE_TYPE.INTERNET, true)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 mt-4 flex items-center">
              <div className="flex items-center">
                <p className="w-24 text-base font-bold">Agua</p>
              </div>

              <div className="ml-6 flex  flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      className=" h-4 w-4 rounded border border-terciary-500"
                      name={EXPENSE_TYPE.WATER}
                      onChange={(e) => toggleTypeExpenses(e)}
                      checked={checkPartiallyExpense(EXPENSE_TYPE.WATER, true)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 mt-4 flex items-center">
              <div className="flex items-center">
                <p className="w-24 text-base font-bold">Luz</p>
              </div>

              <div className="ml-6 flex  flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
                <div>
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      name={EXPENSE_TYPE.LIGHTS}
                      className="h-4 w-4 rounded border border-terciary-500"
                      onChange={(e) => toggleTypeExpenses(e)}
                      checked={checkPartiallyExpense(EXPENSE_TYPE.LIGHTS, true)}
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
                name="inclusive"
                value={INCLUSIVE_EXPENSES.EXCLUDED}
                onChange={(e) => defineExpensesTopLevel(e)}
                checked={checkTypeExpenses(INCLUSIVE_EXPENSES.EXCLUDED)}
              />
            </div>
            <div className="ml-4 text-xl font-bold">Despesas excluídas</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricesComponent;
