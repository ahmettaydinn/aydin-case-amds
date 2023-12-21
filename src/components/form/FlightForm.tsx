import { useForm } from "react-hook-form";

import RHFAutoComplete from "./RHFAutoComplete";
import { Box, Button } from "@mui/material";
import { airportInfo } from "../../types/service";
import RHFDatePicker from "./RHFDatePicker";
import RHFCheckbox from "./RHFCheckbox";

type FlightFormValues = {
  departureAirPort: string;
  arrivalAirport: string;
};

interface FlightFormProps {
  onSubmitReady: (data: FlightFormValues) => void;
  options: airportInfo[];
}

export function FlightForm(props: FlightFormProps) {
  const { handleSubmit, control, watch, setValue, resetField } = useForm<{
    departureAirPort: string;
    arrivalAirport: string;
    departureDate: Date;
    returnDate: Date;
    isOneWay: boolean;
    isRoundWay: boolean;
  }>({
    defaultValues: {
      isRoundWay: true,
    },
  });

  const validateAutoComplete = (newValue: string | undefined, name: string) => {
    if (name === "arrivalAirport" && newValue === watch("departureAirPort")) {
      return "invalid";
    } else {
      return "valid";
    }
  };

  const validateDatePicker = (
    newValue: string | boolean | Date | null,
    name: string
  ) => {
    if (new Date(newValue as Date) < new Date()) {
      return "invalid";
    }
    newValue = newValue ?? "";

    if (
      name === "returnDate" &&
      new Date(watch("departureDate") as Date) > new Date(newValue as Date)
    ) {
      return "invalid";
    } else {
      return "valid";
    }
  };

  return (
    <form onSubmit={handleSubmit(props.onSubmitReady)}>
      <Box>
        <RHFAutoComplete
          name="departureAirPort"
          control={control}
          options={props.options ?? []}
          label="Departure"
          validate={validateAutoComplete}
        />
        <RHFAutoComplete
          name="arrivalAirport"
          control={control}
          options={props.options ?? []}
          label="Arrival"
          validate={validateAutoComplete}
        />
        <RHFDatePicker
          name="departureDate"
          control={control}
          extraStyle={{ marginRight: "10px" }}
          label="Departure Date"
          validate={validateDatePicker}
          resetField={resetField}
        />
        {watch("isRoundWay") === true && (
          <RHFDatePicker
            name="returnDate"
            control={control}
            extraStyle={{ marginLeft: "10px" }}
            label="Arrival Date"
            validate={validateDatePicker}
            resetField={resetField}
          />
        )}
        <Box>
          <RHFCheckbox
            control={control}
            name="isOneWay"
            label="One Way"
            toggleways={() => {
              if (!watch("isOneWay")) {
                setValue("isRoundWay", false);
              } else {
                setValue("isRoundWay", true);
              }
            }}
          />
          <RHFCheckbox
            control={control}
            name="isRoundWay"
            label="Round Way"
            toggleways={() => {
              if (!watch("isRoundWay")) {
                setValue("isOneWay", false);
              } else {
                setValue("isOneWay", true);
              }
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button variant="contained">Search</Button>
      </Box>
    </form>
  );
}
