import { useTranslation } from "next-i18next";
import { Advertisement, ADVERTISEMENT_PROPERTIES, HostFlexType } from "../../models/advertisement";
import RadioBox from "../utils/Radiobox";

interface HostFlexTypeComponentProps {
  advertisement: Advertisement;
  onChange: (flexLabel: string, flexType: unknown) => void;
}

const HostFlexTypeComponent = ({ advertisement, onChange }: HostFlexTypeComponentProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row items-baseline gap-2">
        <div className="my-5 flex flex-row items-center align-middle">
          <div>
            <RadioBox
              name={ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST}
              value={"SUPER_FLEX" as HostFlexType}
              onChange={(e: any) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
              checked={advertisement.type_flex_host === "SUPER_FLEX"}
            />
          </div>
          <div className="mx-5">
            <div className="h-4 w-8 rounded-full bg-green-400"></div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-start text-lg font-bold">
            {t("advertisements:host_type.compose_host", { type: t("advertisements:host_type.super_flex") })}
          </div>
          <div className="mt-2 text-start text-sm text-secondary-300 lg:text-base">
            {t("advertisements:host_type.super_flex_description")}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-baseline gap-2">
        <div className="my-5 flex flex-row items-center align-middle">
          <div>
            <RadioBox
              name={ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST}
              value={"FLEX" as HostFlexType}
              onChange={(e: any) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
              checked={advertisement.type_flex_host === "FLEX"}
            />
          </div>
          <div className="mx-5">
            <div className="h-4 w-8 rounded-full bg-yellow-300"></div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-start text-lg font-bold">
            {t("advertisements:host_type.compose_host", { type: t("advertisements:host_type.flex") })}
          </div>
          <div className="mt-2 text-start text-sm text-secondary-300 lg:text-base">
            {t("advertisements:host_type.flex_description")}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-baseline gap-2">
        <div className="my-5 flex flex-row items-center align-middle">
          <div>
            <RadioBox
              name={ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST}
              value={"MODERATE" as HostFlexType}
              onChange={(e: any) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
              checked={advertisement.type_flex_host === "MODERATE"}
            />
          </div>
          <div className="mx-5">
            <div className="h-4 w-8 rounded-full bg-orange-400"></div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-start text-lg font-bold">
            {t("advertisements:host_type.compose_host", { type: t("advertisements:host_type.moderate") })}
          </div>
          <div className="mt-2 text-start text-sm text-secondary-300 lg:text-base">
            {t("advertisements:host_type.moderate_description")}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-baseline gap-2">
        <div className="my-5 flex flex-row items-center align-middle">
          <div>
            <RadioBox
              name={ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST}
              value={"RIGID" as HostFlexType}
              onChange={(e: any) => onChange(ADVERTISEMENT_PROPERTIES.TYPE_FLEX_HOST, e.target.value)}
              checked={advertisement.type_flex_host === "RIGID"}
            />
          </div>
          <div className="mx-5">
            <div className="h-4 w-8 rounded-full bg-red-600"></div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-start text-lg font-bold">
            {t("advertisements:host_type.compose_host", { type: t("advertisements:host_type.rigid") })}
          </div>
          <div className="mt-2 text-start text-sm text-secondary-300 lg:text-base">
            {t("advertisements:host_type.rigid_description")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostFlexTypeComponent;
