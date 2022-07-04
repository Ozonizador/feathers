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
    <div className="flex flex-1 border border-neutral-500">
      <div className="flex flex-1 cursor-pointer justify-center" onClick={decreaseInput}>
        <CgMathMinus />
      </div>
      <div>{value}</div>
      <div className="flex flex-1 cursor-pointer justify-center" onClick={increaseInput}>
        <CgMathPlus />
      </div>
    </div>
  );
};

export default QuantityInput;
