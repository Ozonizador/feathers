import { Controller } from "react-hook-form";
import { Advertisement, AdvertisementStatus, ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import RadioBox from "../utils/Radiobox";

interface AnuncioDisponivelProps {
  advertisement: Advertisement;
}

const AnuncioDisponivel = ({ advertisement }: AnuncioDisponivelProps) => {
  return (
    <>
      <div className="my-20 flex flex-col">
        <div className="mb-6 text-xl text-gray-600 ">Estado do anúncio</div>
        <div className="my-6 flex flex-row items-baseline">
          <div>
            <div className="my-5 flex flex-row items-center align-middle">
              <div>
                <Controller
                  name={ADVERTISEMENT_PROPERTIES.AVAILABLE}
                  defaultValue={advertisement.available}
                  render={({ field: { value, onChange } }) => (
                    <RadioBox
                      name="availability"
                      value={AdvertisementStatus.NOT_AVAILABLE}
                      onChange={onChange}
                      checked={value === AdvertisementStatus.NOT_AVAILABLE}
                    />
                  )}
                />
              </div>
              <div className="mx-5">
                <div className="h-4 w-8 rounded-full bg-red-600"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xl font-bold">Não publicado</div>
            <div className="mt-2 text-base text-secondary-300">
              O seu anúncio não pode ser reservado e não vai aparecer nos resultados de pesquisa.
            </div>
          </div>
        </div>
        <div className="my-6 flex flex-row items-baseline">
          <div>
            <div className="my-5 flex flex-row items-center align-middle">
              <div>
                <Controller
                  name={ADVERTISEMENT_PROPERTIES.AVAILABLE}
                  defaultValue={advertisement.available}
                  render={({ field: { value, onChange } }) => (
                    <RadioBox
                      name="availability"
                      value={AdvertisementStatus.DISABLED}
                      onChange={onChange}
                      checked={value === AdvertisementStatus.DISABLED}
                    />
                  )}
                />
              </div>
              <div className="mx-5">
                <div className="h-4 w-8 rounded-full bg-orange-400"></div>
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
                <Controller
                  name={ADVERTISEMENT_PROPERTIES.AVAILABLE}
                  defaultValue={advertisement.available}
                  render={({ field: { value, onChange } }) => (
                    <RadioBox
                      name="availability"
                      value={AdvertisementStatus.AVAILABLE}
                      onChange={onChange}
                      checked={value === AdvertisementStatus.AVAILABLE}
                    />
                  )}
                />
              </div>
              <div className="mx-5">
                <div className="h-4 w-8 rounded-full bg-green-400"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xl font-bold">Disponível</div>
            <div className="mt-2 text-base text-secondary-300">O seu anúncio está disponível para reserva.</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnuncioDisponivel;
