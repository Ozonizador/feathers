import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";

interface PhoneCountrySelectProps {
  country: string;
  setCountry: (event: any) => void;
}

const PhoneCountrySelect = ({ country, setCountry }: PhoneCountrySelectProps) => {
  return (
    <select
      value={country}
      onChange={(event) => setCountry(event.target.value || undefined)}
      className="flex w-32 justify-between rounded-xl border border-terciary-500 p-3 focus:border-primary-500 focus:ring-0"
    >
      {getCountries().map((country) => (
        <option key={country} value={country}>
          {country} +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  );
};

export default PhoneCountrySelect;
