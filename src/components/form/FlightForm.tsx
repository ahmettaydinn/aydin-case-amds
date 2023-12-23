import { useForm } from "react-hook-form";
import RHFAutoComplete from "./RHFAutoComplete";
import { Box, Button } from "@mui/material";
import { airportInfo } from "../../types/service";
import RHFDatePicker from "./RHFDatePicker";
import RHFCheckbox from "./RHFCheckbox";
import dayjs, { Dayjs } from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import { FlightFormValues } from "../../types/form";

interface IFlightFormProps {
  onSubmitReady: (data: FlightFormValues) => void;
  options: airportInfo[];
  handleScroll: () => void;
}

export function FlightForm(props: IFlightFormProps) {
  const { handleSubmit, control, watch, setValue, resetField, formState } =
    useForm<{
      departureAirPort: string;
      arrivalAirport: string;
      departureDate: Date | Dayjs;
      returnDate: Date | Dayjs;
      isOneWay: boolean;
      isRoundWay: boolean;
    }>({
      defaultValues: {
        isRoundWay: true,
        departureDate: dayjs(),
        returnDate: dayjs(),
      },
    });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        props.onSubmitReady(data);
        if (Object.values(formState.errors).length === 0) {
          props.handleScroll();
        }
      })}
      style={{
        marginTop: 100,
        marginBottom: 80,
        border: "2px solid black",
        padding: "40px 50px 10px 40px",
        borderRadius: 10,
      }}
    >
      <Box>
        <RHFAutoComplete
          name="departureAirPort"
          control={control}
          options={props.options ?? []}
          label="Departure"
          watch={watch}
        />
        <RHFAutoComplete
          name="arrivalAirport"
          control={control}
          options={props.options ?? []}
          label="Arrival"
          watch={watch}
        />
        <RHFDatePicker
          name="departureDate"
          control={control}
          extraStyle={{ marginRight: "10px" }}
          label="Departure Date"
          resetField={resetField}
          watch={watch}
        />
        {watch("isRoundWay") === true && (
          <RHFDatePicker
            name="returnDate"
            control={control}
            extraStyle={{ marginLeft: "10px" }}
            label="Arrival Date"
            resetField={resetField}
            watch={watch}
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
      <Box mt={2} justifyContent="center" display="flex">
        <Button type="submit" variant="contained" endIcon={<SearchIcon />}>
          Search
        </Button>
      </Box>
    </form>
  );
}
