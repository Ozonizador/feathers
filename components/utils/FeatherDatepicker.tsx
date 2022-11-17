import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import dynamic from "next/dynamic";

const DatePicker = dynamic(() => import("react-datepicker"), {
  ssr: true,
});

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
        className={classNames(`${className ? className : ""}`)}
      />
    </div>
  );
};

export default FeatherDatePicker;
