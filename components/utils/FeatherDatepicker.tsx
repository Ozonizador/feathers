import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DatePicker = dynamic(() => import("react-datepicker"), {
  ssr: false,
});

interface FeatherDatePickerProps {
  date?: Date;
  onChange: (date: any) => void;
  className?: string;
  minDate?: Date;
  icon?: any;
  placeholder?: string;
}

const FeatherDatePicker = ({ date, onChange, className, minDate, icon, placeholder }: FeatherDatePickerProps) => {
  const [data, setData] = useState<Date | undefined>(undefined);

  return (
    <div className="date_parent_sub relative w-full">
      <DatePicker
        selected={data || null}
        placeholderText={placeholder}
        onChange={(newDate: Date) => {
          setData(newDate);
          onChange(newDate);
        }}
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
      {icon}
    </div>
  );
};

export default FeatherDatePicker;
