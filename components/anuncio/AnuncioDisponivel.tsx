import { Controller } from "react-hook-form";
import { Advertisement, AdvertisementStatus, ADVERTISEMENT_PROPERTIES } from "../../models/advertisement";
import RadioBox from "../utils/Radiobox";

interface AnuncioDisponivelProps {
  advertisement: Advertisement;
}

const AnuncioDisponivel = ({ advertisement }: AnuncioDisponivelProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="mb-10 mt-20 flex flex-col">
        <div className="mb-6 text-2xl text-gray-600">Estado do anúncio</div>
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
                      value={"NOT_AVAILABLE" as AdvertisementStatus}
                      onChange={onChange}
                      checked={value === ("NOT_AVAILABLE" as AdvertisementStatus)}
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
            <div className="text-start text-lg font-bold">Não publicado</div>
            <div className="mt-2 text-start text-base text-secondary-300">
              O seu anúncio não pode ser reservado e não vai aparecer nos resultados de pesquisa.
            </div>
          </div>
        </div>
        <div className="flex flex-row items-baseline">
          <div>
            <div className="my-5 flex flex-row items-center align-middle">
              <div>
                <Controller
                  name={ADVERTISEMENT_PROPERTIES.AVAILABLE}
                  defaultValue={advertisement.available}
                  render={({ field: { value, onChange } }) => (
                    <RadioBox
                      name="availability"
                      value={"DISABLED" as AdvertisementStatus}
                      onChange={onChange}
                      checked={value === ("DISABLED" as AdvertisementStatus)}
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
            <div className="text-start text-lg font-bold">Pausado</div>
            <div className="mt-2 text-start text-base text-secondary-300">
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
                      value={"AVAILABLE"}
                      onChange={onChange}
                      checked={value === "AVAILABLE"}
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
            <div className="text-start text-lg font-bold">Disponível</div>
            <div className="mt-2 text-start text-base text-secondary-300">
              O seu anúncio está disponível para reserva.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnuncioDisponivel;
