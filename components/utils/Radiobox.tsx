interface RadioBoxProps {
  name: string;
  [x: string]: any;
}

const RadioBox = ({ name, ...props }: RadioBoxProps) => {
  return (
    <input
      type="radio"
      name={name}
      className="h-5 w-5 rounded accent-primary-500 checked:bg-primary-500 focus:border-primary-500 focus:outline-none focus:ring-0"
      {...props}
    />
  );
};

export default RadioBox;
