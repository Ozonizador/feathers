import classNames from "classnames";
import { UserTypes } from "../../models/profile";

interface ToggleProps {
  selectedValue: UserTypes;
  onChange: (value: UserTypes) => void;
}

export default function Toggle({ selectedValue, onChange }: ToggleProps) {
  return (
    <div className="mx-auto mb-20 py-10">
      <div className="relative flex h-14 w-80 items-center rounded-full bg-primary-100 lg:h-16 lg:w-96">
        <div
          className={classNames("z-50 h-full flex-1 rounded-full", {
            "bg-primary-300 text-white": selectedValue == "TENANT",
          })}
          onClick={() => onChange("TENANT")}
        >
          <h6 className="pt-4 text-center lg:pt-5">Estudante</h6>
        </div>
        <div
          className={classNames("z-50 h-full flex-1 rounded-full", {
            "bg-primary-300 text-white": selectedValue == "LANDLORD",
          })}
          onClick={() => onChange("LANDLORD")}
        >
          <h6 className="pt-4 text-center lg:pt-5">Senhorio</h6>
        </div>
      </div>
    </div>
  );
}
