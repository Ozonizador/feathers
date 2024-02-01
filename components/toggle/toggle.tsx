import classNames from "classnames";
import { UserTypes } from "../../models/profile";
import { useTranslation } from "next-i18next";

interface ToggleProps {
  selectedValue: UserTypes;
  onChange: (value: UserTypes) => void;
}

export default function Toggle({ selectedValue, onChange }: ToggleProps) {
  const { t } = useTranslation();
  return (
    <div className="mx-auto py-10">
      <div className="relative flex w-80 items-center rounded-full bg-primary-100 p-1 lg:w-96">
        <div
          className={classNames("z-50 h-full flex-1 rounded-full", {
            "bg-primary-300 text-white": selectedValue == "TENANT",
          })}
          onClick={() => onChange("TENANT")}
        >
          <h6 className="py-3 text-center lg:py-5">{t("student_one")}</h6>
        </div>
        <div
          className={classNames("z-50 h-full flex-1 rounded-full", {
            "bg-primary-300 text-white": selectedValue == "LANDLORD",
          })}
          onClick={() => onChange("LANDLORD")}
        >
          <h6 className="py-3 text-center lg:py-5">{t("landlord_one")}</h6>
        </div>
      </div>
    </div>
  );
}
