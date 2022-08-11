import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface FeatherDatePickerProps {
  date: Date;
  onChange: (date) => void;
}

const FeatherDatePicker = ({ date, onChange }: FeatherDatePickerProps) => {
  return (
    <div className="w-full">
      <DatePicker selected={date} onChange={onChange} dateFormat="yyyy-MM-dd" />
    </div>
  );
};

export default FeatherDatePicker;
