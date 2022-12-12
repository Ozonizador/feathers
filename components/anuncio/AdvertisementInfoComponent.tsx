import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import { Advertisement, ADVERTISEMENT_PROPERTIES, HostType } from "../../models/advertisement";
import { REQUIRED_ERROR_MESSAGE } from "../../models/error";
import Checkbox from "../utils/Checkbox";
import Input from "../utils/Input";
import RadioBox from "../utils/Radiobox";

interface PricesComponentProps {
  advertisement: Advertisement;
}

const AdvertisementInfoComponent = ({ advertisement }: PricesComponentProps) => {
  const { control } = useFormContext();

  return (
    <>
      <div className="my-5 flex w-full flex-col gap-6">
        <div>
          <label className="mb-4 block text-2xl font-bold text-gray-700">Título do Anúncio</label>
          <Controller
            name={ADVERTISEMENT_PROPERTIES.TITLE}
            rules={{ required: { message: REQUIRED_ERROR_MESSAGE, value: true } }}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="Máximo de 50 palavras"
                maxLength={50}
                onChange={onChange}
                value={value}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        <div>
          <label className="mb-4 block text-2xl font-bold text-gray-700">Nome Interno</label>
          <Controller
            name={ADVERTISEMENT_PROPERTIES.SLUG}
            defaultValue={advertisement.slug}
            control={control}
            render={({ field: { value } }) => <Input maxLength={50} disabled defaultValue={value} />}
          />
        </div>

        <div>
          <label className="mb-4 block text-xl font-bold text-gray-700">Quantos quartos tem a habitação?</label>
          <Controller
            name={ADVERTISEMENT_PROPERTIES.MAX_ROOMS}
            control={control}
            rules={{ required: { message: REQUIRED_ERROR_MESSAGE, value: true } }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input maxLength={10} type="number" value={value} onChange={onChange} errorMessage={error?.message} />
            )}
          />
        </div>

        <div>
          <label htmlFor="about" className="text-2xl font-bold text-gray-700">
            Descreva o seu espaço de forma simples e concisa.
          </label>
          <div className="mt-4">
            <Controller
              name={ADVERTISEMENT_PROPERTIES.DESCRIPTION}
              control={control}
              rules={{ required: { message: REQUIRED_ERROR_MESSAGE, value: true } }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <textarea
                    rows={5}
                    className={classNames(
                      "mt-1 block w-full rounded-md border border-solid border-terciary-500 bg-white py-3 px-2 shadow-sm",
                      { "border-red-700": error }
                    )}
                    placeholder="Descreva o seu espaço em 500 palavras"
                    maxLength={500}
                    value={value}
                    onChange={onChange}
                  />
                  {error && <small className="text-red-700">{error.message}</small>}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex flex-row lg:items-center">
          <p className="my-auto mb-3 text-base font-bold lg:w-44">Vive na propriedade?</p>

          <div className="ml-2 flex w-11 flex-row items-center justify-between rounded-lg border border-terciary-500 p-3 lg:ml-6 lg:mb-0">
            <div className="flex h-5 items-center">
              <Controller
                name={ADVERTISEMENT_PROPERTIES.HOST_LIVES_PROPERTY}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Checkbox onChange={onChange} checked={value} name={ADVERTISEMENT_PROPERTIES.HOST_LIVES_PROPERTY} />
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex">
            <p className="my-auto text-base font-bold lg:w-44">Tipo de senhorio</p>
          </div>

          <div className="ml-0 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6 lg:mb-0">
            <div className="mr-16 text-base">Particular</div>
            <div className="flex h-5 items-center">
              <Controller
                name={ADVERTISEMENT_PROPERTIES.TYPE_HOST}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioBox
                    name={ADVERTISEMENT_PROPERTIES.TYPE_HOST}
                    value={HostType.PARTICULAR}
                    checked={value === HostType.PARTICULAR}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="ml-0 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 py-3 px-3 lg:ml-6">
            <div className="mr-16 text-base">Profissional</div>
            <div className="flex h-5 items-center">
              <Controller
                control={control}
                name={ADVERTISEMENT_PROPERTIES.TYPE_HOST}
                render={({ field: { value, onChange } }) => (
                  <RadioBox
                    name={ADVERTISEMENT_PROPERTIES.TYPE_HOST}
                    value={HostType.PROFISSIONAL}
                    checked={value === HostType.PROFISSIONAL}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertisementInfoComponent;
