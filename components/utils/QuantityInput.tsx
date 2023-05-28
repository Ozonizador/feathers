import { useState } from "react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

interface QuantityInputProps {
  onChange?: (value: any) => void;
  initValue: number;
}

const QuantityInput = ({ onChange, initValue }: QuantityInputProps) => {
  const [value, setValue] = useState(initValue);

  const decreaseInput = () => {
    let newValue = value - 1 < 0 ? 0 : value - 1;

    setValue(newValue);
    onChange && onChange(newValue);
  };

  const increaseInput = () => {
    let newValue = value + 1;
    setValue(newValue);
    onChange && onChange(newValue);
  };

  return (
    <div className="flex flex-1 items-center rounded-lg border border-terciary-300 px-3 py-1 lg:px-6">
      <div className="flex flex-1 cursor-pointer justify-center border-r border-terciary-300" onClick={decreaseInput}>
        <CgMathMinus />
      </div>
      <div className="px-5">{value}</div>
      <div className="flex flex-1 cursor-pointer justify-center border-l border-terciary-300 " onClick={increaseInput}>
        <CgMathPlus />
      </div>
    </div>
  );
};

export default QuantityInput;
