import Advertisement, {
  FLEX_HOST_TYPE,
  ADVERTISEMENT_PROPERTIES,
} from "../../models/advertisement";
import Image from "next/image";

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
                name="flex_host_type"
                value={FLEX_HOST_TYPE.SUPER_FLEX}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.typeFlexHost === FLEX_HOST_TYPE.SUPER_FLEX}
              />
            </div>
            <div className="mx-5">
              <Image src="/images/green.png" alt="" height={16} width={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Super Flex</div>
          <div className="mt-2 text-base text-secondary-300">
            Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse
            período e até 2 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento
            é integral.
          </div>
        </div>
      </div>
      <div className="my-6 flex flex-row items-baseline">
        <div>
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="flex_host_type"
                value={FLEX_HOST_TYPE.FLEX}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.typeFlexHost === FLEX_HOST_TYPE.FLEX}
              />
            </div>
            <div className="mx-5">
              <Image src="/images/yellow.png" alt="" height={16} width={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Flex</div>
          <div className="mt-2 text-base text-secondary-300">
            Até 30 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse
            período e até 7 dias antes , o valor reembolsado é de 50%. Após esse período o pagamento
            é integral.
          </div>
        </div>
      </div>
      <div className="my-6 flex flex-row items-baseline">
        <div>
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="flex_host_type"
                value={FLEX_HOST_TYPE.MODERATE}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.typeFlexHost === FLEX_HOST_TYPE.MODERATE}
              />
            </div>
            <div className="mx-5">
              <Image src="/images/orange.png" alt="" height={16} width={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Moderado</div>
          <div className="mt-2 text-base text-secondary-300">
            Até 60 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse
            período e até 15 dias antes , o valor reembolsado é de 50%. Após esse período o
            pagamento é integral.
          </div>
        </div>
      </div>
      <div className="my-6 flex flex-row items-baseline">
        <div>
          <div className="my-5 flex flex-row items-center align-middle">
            <div>
              <input
                type="radio"
                name="flex_host_type"
                value={FLEX_HOST_TYPE.RIGID}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
                checked={advertisement.typeFlexHost === FLEX_HOST_TYPE.RIGID}
              />
            </div>
            <div className="mx-5">
              <Image src="/images/red.png" alt="" height={16} width={32} />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-xl font-bold">Host Rígido</div>
          <div className="mt-2 text-base text-secondary-300">
            Até 90 dias antes do check-in: 100% do valor da renda é reembolsado. Depois desse
            período e até 30 dias antes , o valor reembolsado é de 50%. Após esse período o
            pagamento é integral.
          </div>
        </div>
      </div>
    </>
  );
};

export default HostFlexTypeComponent;
