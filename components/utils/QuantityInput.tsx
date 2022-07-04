import { useState } from "react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";

const QuantityInput = () => {
  const [value, setValue] = useState(1);

  const decreaseInput = () => {
    let newValue = value - 1 < 0 ? 0 : value - 1;

    setValue(newValue);
  };

  const increaseInput = () => {
    let newValue = value + 1;
    setValue(newValue);
  };

  return (
    <div className="flex flex-1 border border-terciary-300 px-6 py-1 items-center rounded-lg">
      <div className="flex flex-1 cursor-pointer justify-center border-r border-terciary-300" onClick={decreaseInput}>
        <CgMathMinus />
      </div>
      <div className="px-2">{value}</div>
      <div className="flex flex-1 cursor-pointer justify-center border-l border-terciary-300" onClick={increaseInput}>
        <CgMathPlus />
      </div>
    </div>
  );
};

export default QuantityInput;
