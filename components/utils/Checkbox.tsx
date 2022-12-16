interface CheckboxProps {
  onChange: (e) => void;
  checked: boolean;
  name: string;
  [x: string]: any;
}

const Checkbox = ({ onChange, checked, name, ...props }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      className="h-4 w-4 rounded-sm border border-gray-300"
      onChange={onChange}
      name={name}
      {...props}
    />
  );
};

export default Checkbox;
