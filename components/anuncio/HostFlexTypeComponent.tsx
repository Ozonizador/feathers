import { Advertisement, FlexHostType, ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";

interface HostFlexTypeComponentProps {
  advertisement: Advertisement;
  onChange: (flexLabel, flexType) => void;
}

/* PARA UTILIZAR NOS EDITS */

const HostFlexTypeComponent = ({ advertisement, onChange }: HostFlexTypeComponentProps) => {
  return (
    <>
      <div className=" flex flex-row items-baseline">
        <div>
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="FlexHostType"
                value={FlexHostType.SUPER_FLEX}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.type_flex_host === FlexHostType.SUPER_FLEX}
              />
            </div>
            <div className="mx-5">
              <div className="h-4 w-8 rounded-full bg-green-400"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Super Flex</div>
          <div className="mt-2 text-base text-secondary-300">
            Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 2 dias antes
            , o valor reembolsado é de 50%. Após esse período o pagamento é integral.
          </div>
        </div>
      </div>
      <div className="my-6 flex flex-row items-baseline">
        <div>
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="FlexHostType"
                value={FlexHostType.FLEX}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.type_flex_host === FlexHostType.FLEX}
              />
            </div>
            <div className="mx-5">
              <div className="h-4 w-8 rounded-full bg-yellow-300"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Flex</div>
          <div className="mt-2 text-base text-secondary-300">
            Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 7 dias antes
            , o valor reembolsado é de 50%. Após esse período o pagamento é integral.
          </div>
        </div>
      </div>
      <div className="my-6 flex flex-row items-baseline">
        <div>
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="FlexHostType"
                value={FlexHostType.MODERATE}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.type_flex_host === FlexHostType.MODERATE}
              />
            </div>
            <div className="mx-5">
              <div className="h-4 w-8 rounded-full bg-orange-400"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Moderado</div>
          <div className="mt-2 text-base text-secondary-300">
            Até 60 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 15 dias
            antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.
          </div>
        </div>
      </div>
      <div className="my-6 flex flex-row items-baseline">
        <div>
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="FlexHostType"
                value={FlexHostType.RIGID}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.type_flex_host === FlexHostType.RIGID}
              />
            </div>
            <div className="mx-5">
              <div className="h-4 w-8 rounded-full bg-red-600"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Rígido</div>
          <div className="mt-2 text-base text-secondary-300">
            Até 90 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse período e até 30 dias
            antes , o valor reembolsado é de 50%. Após esse período o pagamento é integral.
          </div>
        </div>
      </div>
    </>
  );
};

export default HostFlexTypeComponent;
