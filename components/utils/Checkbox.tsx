import React from "react";

interface CheckboxProps {
  onChange: (e: React.ChangeEvent<any>) => void;
  checked?: boolean;
  defaultChecked?: boolean;
  name: string;
  [x: string]: any;
}

const Checkbox = ({ onChange, checked, defaultChecked, name, ...props }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      defaultChecked={defaultChecked}
      className="h-6 w-6 rounded-sm border border-gray-300 accent-primary-500 checked:border-primary-500 checked:bg-primary-500 focus:border-primary-500 focus:outline-none focus:ring-0"
      onChange={onChange}
      name={name}
      height={80}
      width={80}
      {...props}
    />
  );
};

export default Checkbox;
