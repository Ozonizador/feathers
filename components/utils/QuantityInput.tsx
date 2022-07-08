import { useState } from "react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

interface QuantityInputProps {
  onChange?: (property, value) => void;
  initValue: number;
  property: string;
}

const QuantityInput = ({ onChange, initValue, property }: QuantityInputProps) => {
  const [value, setValue] = useState(initValue);

  const decreaseInput = () => {
    let newValue = value - 1 < 0 ? 0 : value - 1;

    setValue(newValue);
    onChange && onChange(property, newValue);
  };

  const increaseInput = () => {
    let newValue = value + 1;
    setValue(newValue);
    onChange && onChange(property, newValue);
  };

  return (
    <div className="flex flex-1 items-center rounded-lg border border-terciary-300 px-6 py-1">
      <div
        className="flex flex-1 cursor-pointer justify-center border-r border-terciary-300"
        onClick={decreaseInput}
      >
        <CgMathMinus />
      </div>
      <div className="px-5">{value}</div>
      <div
        className="flex flex-1 cursor-pointer justify-center border-l border-terciary-300 "
        onClick={increaseInput}
      >
        <CgMathPlus />
      </div>
    </div>
  );
};

export default QuantityInput;
