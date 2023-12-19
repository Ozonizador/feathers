import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import dynamic from "next/dynamic";

const DatePicker = dynamic(() => import("react-datepicker"), {
  ssr: false,
});

interface FeatherDatePickerProps {
  date: Date;
  onChange: (date: any) => void;
  className?: string;
  minDate?: Date;
}

const FeatherDatePicker = ({ date, onChange, className, minDate }: FeatherDatePickerProps) => {
  return (
    <div className="w-full relative">
      <DatePicker
        selected={date}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className={classNames(
          `${
            className
              ? `focus:border-primary-500 focus:outline-0 focus:ring-transparent ${className}`
              : "focus:border-primary-500 focus:outline-0 focus:ring-transparent"
          }`
        )}
        minDate={minDate}
      />
    </div>
  );
};

export default FeatherDatePicker;
