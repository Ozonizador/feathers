import { Advertisement, ADVERTISEMENT_PROPERTIES, HostType } from "../../models/advertisement";
import Checkbox from "../utils/Checkbox";

interface PricesComponentProps {
  advertisement: Advertisement;
  onChange: (property: string, value: string | boolean) => void;
}

const AdvertisementInfoComponent = ({ advertisement, onChange }: PricesComponentProps) => {
  return (
    <>
      <div className="w-full">
        <label className="mb-4 block text-2xl font-bold text-gray-700">Título do Anúncio</label>
        <input
          className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
          placeholder="Máximo de 50 palavras"
          maxLength={50}
          defaultValue={advertisement.title}
          onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TITLE, e.target.value)}
        />

        <label className="mb-4 block text-2xl font-bold text-gray-700">Nome Interno</label>
        <input
          className="bg-grey mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 py-3 px-2 shadow-sm"
          maxLength={50}
          disabled
          defaultValue={advertisement.slug}
        />

        <label className="mb-4 block text-xl font-bold text-gray-700">Quantos quartos tem a habitação?</label>
        <input
          className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 py-3 px-2 shadow-sm"
          maxLength={10}
          type="number"
          defaultValue={advertisement.max_rooms}
          onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.MAX_ROOMS, e.target.value)}
        />

        <div className="mt-12">
          <label htmlFor="about" className="text-2xl font-bold text-gray-700">
            Descreva o seu espaço de forma simples e concisa.
          </label>
          <div className="mt-4">
            <textarea
              rows={5}
              className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
              placeholder="Descreva o seu espaço em 500 palavras"
              maxLength={500}
              defaultValue={advertisement.description}
              onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.DESCRIPTION, e.target.value)}
            />
          </div>
        </div>

        <div className="mt-24 flex flex-row lg:items-center">
          <p className="my-auto mb-3 w-44 text-base font-bold lg:mb-0">Vive na propriedade?</p>

          <div className="ml-0 flex w-11 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6 lg:mb-0">
            <div className="flex h-5 items-center">
              <Checkbox
                onChange={(e) =>
                  onChange(ADVERTISEMENT_PROPERTIES.HOST_LIVES_PROPERTY, !advertisement.host_lives_property)
                }
                checked={advertisement.host_lives_property === true}
                name="host_lives_apartment"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col lg:mt-14 lg:flex-row lg:items-center">
          <div className="flex">
            <p className="w-44 text-base font-bold">Tipo de senhorio</p>
          </div>

          <div className="mb-5 ml-0 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6 lg:mb-0">
            <div className="mr-16 text-base">Particular</div>

            <div className="flex h-5 items-center">
              <input
                name="host_type"
                type="radio"
                className="h-4 w-4 rounded border border-terciary-500"
                value={HostType.PARTICULAR}
                checked={advertisement.type_host === HostType.PARTICULAR}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_HOST, e.target.value)}
              />
            </div>
          </div>

          <div className="ml-0  flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6">
            <div className="mr-16 text-base">Profissional</div>
            <div className="flex h-5 items-center">
              <input
                name="host_type"
                type="radio"
                className="h-4 w-4 rounded border border-terciary-500"
                value={HostType.PROFISSIONAL}
                checked={advertisement.type_host === HostType.PROFISSIONAL}
                onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_HOST, e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertisementInfoComponent;
