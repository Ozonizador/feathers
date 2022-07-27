import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

// const DatePicker = dynamic(() => import("react-datepicker"));

interface FeatherDatePickerProps {
  date: Date;
  onChange: (date) => void;
}

const FeatherDatePicker = ({ date, onChange }: FeatherDatePickerProps) => {
  return (
    <>
      <DatePicker selected={date} onChange={onChange} />
    </>
  );
};

export default FeatherDatePicker;
