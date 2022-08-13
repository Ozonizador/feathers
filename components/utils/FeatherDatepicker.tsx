import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import classNames from "classnames";

interface FeatherDatePickerProps {
  date: Date;
  onChange: (date) => void;
  className?: string;
}

const FeatherDatePicker = ({ date, onChange, className }: FeatherDatePickerProps) => {
  return (
    <div className="w-full">
      <DatePicker
        selected={date}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className={classNames("h-16", `${className}`)}
      />
    </div>
  );
};

export default FeatherDatePicker;
