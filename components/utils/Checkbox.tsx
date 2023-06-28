import React from "react";

interface CheckboxProps {
  onChange: (e: React.ChangeEvent<any>) => void;
  checked: boolean;
  name: string;
  [x: string]: any;
}

const Checkbox = ({ onChange, checked, name, ...props }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      className="h-4 w-4 rounded-sm border border-gray-300 accent-primary-500 checked:bg-primary-500 focus:border-primary-500 focus:outline-none focus:ring-0"
      onChange={onChange}
      name={name}
      {...props}
    />
  );
};

export default Checkbox;
