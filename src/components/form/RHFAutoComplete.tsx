import { Autocomplete, TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "react-toastify";
import { validateAutoComplete } from "../../utils/form/validateForm";

interface IRHFAutoCompleteProps<
  O extends { id: string; name: string; iata_code?: string; city?: string },
  TField extends FieldValues
> {
  control: Control<TField>;
  name: Path<TField>;
  options: O[];
  label: string;
  watch: UseFormWatch<{
    departureAirPort: string;
    arrivalAirport: string;
    departureDate: Date | Dayjs;
    returnDate: Date | Dayjs;
    isOneWay: boolean;
    isRoundWay: boolean;
  }>;
  setSelectedDepartAirport: React.Dispatch<React.SetStateAction<string>>;
  setSelectedArrivalAirport: React.Dispatch<React.SetStateAction<string>>;
}

const RHFAutoComplete = <
  O extends { id: string; name: string; iata_code?: string; city?: string },
  TField extends FieldValues
>(
  props: IRHFAutoCompleteProps<O, TField>
) => {
  const { control, name, options, label, watch } = props;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
            <Autocomplete
              value={
                value
                  ? options.find((option) => {
                      return option.iata_code === value;
                    }) ?? null
                  : null
              }
              onChange={(_, newValue) => {
                const isValid = validateAutoComplete(
                  newValue?.iata_code,
                  name,
                  watch
                );
                if (isValid === "invalid") {
                  toast("Departure and Arrival Location can not be same");
                  return;
                }
                onChange(newValue ? newValue.iata_code : null);
              }}
              options={options}
              sx={{ width: 400, marginBottom: 2 }}
              getOptionLabel={(option) => `${option.name} - ${option.city}`}
              getOptionKey={(option) => option.id}
              renderInput={(params) => (
                <TextField {...params} label={label} inputRef={ref} />
              )}
            />
            {error ? (
              <span style={{ color: "#EF4040" }}>{error.message}</span>
            ) : null}
          </>
        );
      }}
    />
  );
};

export default RHFAutoComplete;
