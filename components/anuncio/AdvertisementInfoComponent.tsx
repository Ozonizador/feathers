import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import { Advertisement, ADVERTISEMENT_PROPERTIES, HostType } from "../../models/advertisement";
import { REQUIRED_ERROR_MESSAGE } from "../../models/error";
import Checkbox from "../utils/Checkbox";
import Input from "../utils/Input";
import RadioBox from "../utils/Radiobox";
import { useTranslation } from "next-i18next";

type PricesComponentProps = {
  advertisement: Advertisement;
  showInternalName?: boolean;
};

const AdvertisementInfoComponent = ({ advertisement, showInternalName = false }: PricesComponentProps) => {
  const { t } = useTranslation("advertisements");
  const { control } = useFormContext();

  return (
    <>
      <div className="my-5 flex w-full flex-col gap-6">
        <div>
          <label className="mb-4 block text-2xl font-bold text-gray-700">{t("add_advert.title_advert")}</label>
          <Controller
            name={ADVERTISEMENT_PROPERTIES.TITLE}
            rules={{ required: { message: REQUIRED_ERROR_MESSAGE, value: true } }}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder={t("add_advert.title_input_description")}
                maxLength={50}
                onChange={onChange}
                value={value}
                errorMessage={error?.message}
              />
            )}
          />
        </div>
        {showInternalName && (
          <div>
            <label className="mb-4 block text-2xl font-bold text-gray-700">{t("add_advert.internal_name")}</label>
            <Input maxLength={50} disabled value={advertisement.slug} />
          </div>
        )}

        <div>
          <label htmlFor="about" className="text-2xl font-bold text-gray-700">
            {t("add_advert.description_title")}
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
                      "mt-1 block w-full rounded-md border border-solid border-terciary-500 bg-white px-2 py-3 shadow-sm",
                      { "border-red-700": error }
                    )}
                    placeholder={t("add_advert.description_placeholder")}
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
          <p className="my-auto text-base font-bold lg:w-44">{t("add_advert.owner_lives_property_title")}</p>
            <Controller
              name={ADVERTISEMENT_PROPERTIES.HOST_LIVES_PROPERTY}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Checkbox onChange={onChange} checked={value} name={ADVERTISEMENT_PROPERTIES.HOST_LIVES_PROPERTY} />
              )}
            />
        </div>

        <div className="flex flex-col gap-3 md:flex-row lg:items-center">
          <p className="my-auto text-base font-bold lg:w-44">{t("add_advert.owner_type")}</p>

          <div className="flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 px-3 py-3 md:ml-7 lg:mb-0 lg:ml-3">
            <div className="mr-16 text-base">{t("add_advert.private_owner")}</div>
            <div className="flex h-5 items-center">
              <Controller
                name={ADVERTISEMENT_PROPERTIES.TYPE_HOST}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <RadioBox
                    name={ADVERTISEMENT_PROPERTIES.TYPE_HOST}
                    value={"PARTICULAR" as HostType}
                    checked={value == ("PARTICULAR" as HostType)}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="ml-0 flex w-60 flex-row items-center justify-between rounded-lg border border-terciary-500 px-3 py-3 lg:ml-6">
            <div className="mr-16 text-base">{t("add_advert.profissional_owner")}</div>
            <div className="flex h-5 items-center">
              <Controller
                control={control}
                name={ADVERTISEMENT_PROPERTIES.TYPE_HOST}
                render={({ field: { value, onChange } }) => {
                  return (
                    <RadioBox
                      name={ADVERTISEMENT_PROPERTIES.TYPE_HOST}
                      value={"PROFISSIONAL" as HostType}
                      checked={value == ("PROFISSIONAL" as HostType)}
                      onChange={onChange}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertisementInfoComponent;
