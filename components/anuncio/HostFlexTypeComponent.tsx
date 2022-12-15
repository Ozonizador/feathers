import { Advertisement, ADVERTISEMENT_PROPERTIES, HostFlexType } from "../../models/advertisement";
import RadioBox from "../utils/Radiobox";

interface HostFlexTypeComponentProps {
  advertisement: Advertisement;
  onChange: (flexLabel: string, flexType: unknown) => void;
}

const HostFlexTypeComponent = ({ advertisement, onChange }: HostFlexTypeComponentProps) => {
  return (
    <div>
      <div className=" flex flex-row items-baseline">
        <div>
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <RadioBox
                name={ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST}
                value={"SUPER_FLEX" as HostFlexType}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.type_flex_host === "SUPER_FLEX"}
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
              <RadioBox
                name={ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST}
                value={"FLEX" as HostFlexType}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.type_flex_host === "FLEX"}
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
              <RadioBox
                name={ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST}
                value={"MODERATE" as HostFlexType}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.type_flex_host === "MODERATE"}
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
              <RadioBox
                name={ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST}
                value={"RIGID" as HostFlexType}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.type_flex_host === "RIGID"}
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
    </div>
  );
};

export default HostFlexTypeComponent;
