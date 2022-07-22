import Image from "next/image";
import { AdvertisementStatus, ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";

const AnuncioDisponivel = ({ advertisement, onChange }) => {
  return (
    <>
      <div className="my-20 flex flex-col">
        <div className="mb-6 text-xl text-gray-600 ">Estado do anúncio</div>
        <div className="my-6 flex flex-row items-baseline">
          <div>
            <div className="my-5 flex flex-row items-center align-middle">
              <div>
                <input
                  type="radio"
                  name="flex_host_type"
                  value={AdvertisementStatus.NOT_AVAILABLE}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.AVAILABLE, e.target.value)}
                  checked={advertisement.available === AdvertisementStatus.NOT_AVAILABLE}
                />
              </div>
              <div className="mx-5">
                <Image src="/images/red.png" alt="" height={16} width={32} />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xl font-bold">Disponível</div>
            <div className="mt-2 text-base text-secondary-300">
              O seu anúncio não pode ser reservado e não vai aparecer nos resultados de pesquisa.
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
                  value={AdvertisementStatus.DISABLED}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.AVAILABLE, e.target.value)}
                  checked={advertisement.available === AdvertisementStatus.DISABLED}
                />
              </div>
              <div className="mx-5">
                <Image src="/images/orange.png" alt="" height={16} width={32} />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xl font-bold">Pausado</div>
            <div className="mt-2 text-base text-secondary-300">
              O seu anúncio vai ficar pausado de forma temporária.
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
                  value={AdvertisementStatus.AVAILABLE}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.AVAILABLE, e.target.value)}
                  checked={advertisement.available === AdvertisementStatus.AVAILABLE}
                />
              </div>
              <div className="mx-5">
                <Image src="/images/green.png" alt="" height={16} width={32} />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xl font-bold">Não publicado</div>
            <div className="mt-2 text-base text-secondary-300">
              O seu anúncio está disponível para reserva.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnuncioDisponivel;
