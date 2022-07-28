import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface FeatherDatePickerProps {
  date: Date;
  onChange: (date) => void;
}

const FeatherDatePicker = ({ date, onChange }: FeatherDatePickerProps) => {
  return (
    <div className="w-full">
      <DatePicker selected={date} onChange={onChange} />
    </div>
  );
};

export default FeatherDatePicker;
