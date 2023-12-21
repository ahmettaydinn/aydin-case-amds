import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { toast } from "react-toastify";

interface RHFAutoCompleteProps<
  O extends { id: string; name: string; iata_code?: string; city?: string },
  TField extends FieldValues
> {
  control: Control<TField>;
  name: Path<TField>;
  options: O[];
  label: string;
  validate: (newValue: string | undefined, name: string) => string;
}

const RHFAutoComplete = <
  O extends { id: string; name: string; iata_code?: string; city?: string },
  TField extends FieldValues
>(
  props: RHFAutoCompleteProps<O, TField>
) => {
  const { control, name, options, label, validate } = props;
  return (
    <Controller
      name={name}
      control={control}
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
                const isValid = validate(newValue?.iata_code, name);
                if (isValid === "invalid") {
                  toast("Departure and Arrival Location can not be same");
                  return;
                }
                onChange(newValue ? newValue.iata_code : null);
              }}
              // inputValue={departureInput}
              // onInputChange={(_, newInputValue) => {
              //   setDepartureInput(newInputValue);
              // }}

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
