import { UserTypes } from "../../models/profile";

interface ToggleProps {
  selectedValue: UserTypes;
  onChange: (value: UserTypes) => void;
}

export default function Toggle({ selectedValue, onChange }: ToggleProps) {
  return (
    <div className="mx-auto mb-20 py-10">
      <div className="relative flex h-14 w-80 items-center justify-between rounded-full bg-primary-100 px-12 lg:h-16 lg:w-96 lg:px-16">
        <div className="absolute left-1 h-12 w-3/6 rounded-full bg-primary-300 lg:left-2"></div>
        <div className="z-50" onClick={() => onChange("TENANT")}>
          Estudante
        </div>
        <div onClick={() => onChange("LANDLORD")}>Senhorio</div>
      </div>
    </div>
  );
}
