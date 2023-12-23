import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import {
  Control,
  Controller,
  UseFormResetField,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "react-toastify";
import { validateDatePicker } from "../../utils/form/validateForm";

interface IRHFDatePickerProps {
  control: Control<{
    departureAirPort: string;
    arrivalAirport: string;
    departureDate: Date | Dayjs;
    returnDate: Date | Dayjs;
    isOneWay: boolean;
    isRoundWay: boolean;
  }>;
  name:
    | "departureAirPort"
    | "arrivalAirport"
    | "departureDate"
    | "returnDate"
    | "isOneWay"
    | "isRoundWay";
  extraStyle: object;
  label: string;
  resetField: UseFormResetField<{
    departureAirPort: string;
    arrivalAirport: string;
    departureDate: Date | Dayjs;
    returnDate: Date | Dayjs;
    isOneWay: boolean;
    isRoundWay: boolean;
  }>;
  watch: UseFormWatch<{
    departureAirPort: string;
    arrivalAirport: string;
    departureDate: Date | Dayjs;
    returnDate: Date | Dayjs;
    isOneWay: boolean;
    isRoundWay: boolean;
  }>;
}

const RHFDatePicker = (props: IRHFDatePickerProps) => {
  const { control, name, extraStyle, label, resetField, watch } = props;
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: name === "departureDate" ? true : false }}
      render={({ field: { onChange, value, ref } }) => {
        return (
          <DatePicker
            sx={{ width: 190, ...extraStyle }}
            label={label}
            value={value}
            inputRef={ref}
            onChange={(date) => {
              const isValid = validateDatePicker(date, name, watch);
              if (isValid === "invalid") {
                resetField("departureDate");
                resetField("returnDate");

                toast("Plase check your flight dates");
                return;
              }
              onChange(date);
            }}
          />
        );
      }}
    />
  );
};

export default RHFDatePicker;
