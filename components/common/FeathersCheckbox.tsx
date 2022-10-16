interface FeathersCheckboxProps {
  selected: boolean;
  onChangeFn: () => void;
}

const FeathersCheckbox = ({ selected, onChangeFn }: FeathersCheckboxProps) => {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded border border-terciary-500"
      checked={selected}
      onChange={onChangeFn}
    />
  );
};

export default FeathersCheckbox;
