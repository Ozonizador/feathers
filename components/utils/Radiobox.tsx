interface RadioBoxProps {
  name: string;
  [x: string]: any;
}

const RadioBox = ({ name, ...props }: RadioBoxProps) => {
  return <input type="radio" name={name} className="h-4 w-4 rounded border border-terciary-500" {...props} />;
};

export default RadioBox;
