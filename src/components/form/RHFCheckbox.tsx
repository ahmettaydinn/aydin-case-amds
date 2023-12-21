import { Checkbox, FormControlLabel } from "@mui/material";

import { Control, Controller } from "react-hook-form";

interface RHFCheckboxProps {
  control: Control<{
    departureAirPort: string;
    arrivalAirport: string;
    departureDate: Date;
    returnDate: Date;
    isOneWay: boolean;
    isRoundWay: boolean;
  }>;
  name:
    | "departureAirPort"
    | "arrivalAirport"
    | "departureDate"
    | "returnDate"
    | "isRoundWay"
    | "isOneWay";
  extraStyle?: object;
  label: string;
  toggleways: () => void;
}

const RHFCheckbox = (props: RHFCheckboxProps) => {
  const { name, control, label, toggleways } = props;

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <Checkbox
                // {...props}
                ref={ref}
                checked={!!value}
                onChange={(e) => {
                  toggleways();
                  onChange(e.target.checked);
                }}
              />
            );
          }}
        />
      }
      label={label}
    />
  );
};

export default RHFCheckbox;
