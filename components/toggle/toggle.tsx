import { useState } from "react";

interface ToggleProps {
  selectedValue: "senhorio" | "estudante";
  onChange: (value: "senhorio" | "estudante") => void;
}

export default function Toggle({ selectedValue, onChange }: ToggleProps) {
  return (
    <div className="mx-auto mb-20 py-10">
      <div className="relative flex h-14 w-80 items-center justify-between rounded-full bg-primary-100 px-12 lg:h-16 lg:w-96 lg:px-16">
        <div className="absolute left-1 h-12 w-3/6 rounded-full bg-primary-300 lg:left-2"></div>
        <div className="z-50" onClick={() => onChange("estudante")}>
          Estudante
        </div>
        <div onClick={() => onChange("senhorio")}>Senhorio</div>
      </div>
      {/* <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-primary-300" : "bg-primary-500"}
        relative inline-flex h-[38px] w-[174px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}

      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? "translate-x-10" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[100px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div> */}
    </div>
  );
}
