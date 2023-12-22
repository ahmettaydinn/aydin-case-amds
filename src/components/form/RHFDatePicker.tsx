import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Control, Controller, UseFormResetField } from "react-hook-form";
import { toast } from "react-toastify";

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
  validate: (
    newValue: string | boolean | Date | null | Dayjs,
    name: string
  ) => string;
  resetField: UseFormResetField<{
    departureAirPort: string;
    arrivalAirport: string;
    departureDate: Date | Dayjs;
    returnDate: Date | Dayjs;
    isOneWay: boolean;
    isRoundWay: boolean;
  }>;
}

const RHFDatePicker = (props: IRHFDatePickerProps) => {
  const { control, name, extraStyle, label, validate, resetField } = props;
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
            value={value ?? dayjs()}
            inputRef={ref}
            onChange={(date) => {
              const isValid = validate(date, name);
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
