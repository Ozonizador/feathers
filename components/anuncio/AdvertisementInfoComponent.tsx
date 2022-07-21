import Advertisement, { ADVERTISEMENT_PROPERTIES, HOST_TYPE } from "../../models/advertisement";

interface PricesComponentProps {
  advertisement: Advertisement;
  onChange: (property, value) => void;
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

        <label className="mb-4 block text-2xl font-bold text-gray-700">None Interno</label>
        <input
          className="mt-1 mb-6 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2  shadow-sm"
          placeholder="Máximo de 50 palavras"
          maxLength={50}
          defaultValue={advertisement.title}
          onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TITLE, e.target.value)}
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

        {/* missing here */}
        <div className="mt-24 flex items-center">
          <div className="flex">
            <p className="w-44 text-base font-bold">Vive na propriedade?</p>{" "}
          </div>
          <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div className="mr-16 text-base">Sim</div>

            <div>
              <div className="flex h-5 items-center">
                <input
                  name="host_lives_apartment"
                  type="radio"
                  value="true"
                  className="h-4 w-4 rounded border border-terciary-500"
                  checked={advertisement.hostLivesProperty === true}
                  onChange={(e) =>
                    onChange(
                      ADVERTISEMENT_PROPERTIES.HOST_LIVES_PROPERTY,
                      e.target.value === "true"
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div className="mr-16 text-base">Não</div>

            <div>
              <div className="flex h-5 items-center">
                <input
                  name="host_lives_apartment"
                  type="radio"
                  value="false"
                  className="h-4 w-4 rounded border border-terciary-500"
                  checked={advertisement.hostLivesProperty === false}
                  onChange={(e) =>
                    onChange(
                      ADVERTISEMENT_PROPERTIES.HOST_LIVES_PROPERTY,
                      e.target.value === "true"
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-8 flex items-center">
          <div className="flex">
            <p className="w-44 text-base font-bold">Tipo de senhorio</p>{" "}
          </div>

          <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div className="mr-16 text-base">Particular</div>
            <div>
              <div className="flex h-5 items-center">
                <input
                  name="host_type"
                  type="radio"
                  className="h-4 w-4 rounded border border-terciary-500"
                  value={HOST_TYPE.PARTICULAR}
                  checked={advertisement.typeHost === HOST_TYPE.PARTICULAR}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_HOST, e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="ml-6 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3">
            <div className="mr-16 text-base">Profissional</div>
            <div>
              <div className="flex h-5 items-center">
                <input
                  name="host_type"
                  type="radio"
                  className="h-4 w-4 rounded border border-terciary-500"
                  value={HOST_TYPE.PROFISSIONAL}
                  checked={advertisement.typeHost === HOST_TYPE.PROFISSIONAL}
                  onChange={(e) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_HOST, e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertisementInfoComponent;
