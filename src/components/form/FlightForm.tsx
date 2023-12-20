import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import useGetAirports from "../../service/airports";
import { DatePicker } from "@mui/x-date-pickers";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  departure: string;
  setDeparture?: Dispatch<SetStateAction<string>>;
  arrival?: string;
  setArrival?: Dispatch<SetStateAction<string>>;
  departureDate?: Date;
  setDepartureDate?: Dispatch<SetStateAction<Date>>;
  returnDate?: Date;
  setReturnDate?: Dispatch<SetStateAction<Date>>;
}

const FlightForm = ({
  departure,
  setDeparture,
  arrival,
  setArrival,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
}) => {
  const { data: airportsList } = useGetAirports();
  return (
    <Box>
      <Autocomplete
        options={airportsList ?? []}
        sx={{ width: 500, mb: 2 }}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Departure Location" />
        )}
        onChange={(e, value) => {
          setDeparture(value?.iata_code);
        }}
      />
      <Autocomplete
        options={airportsList ?? []}
        sx={{ width: 500, mb: 2 }}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Arrival Location" />
        )}
        onChange={(e, value) => {
          setArrival(value?.iata_code);
        }}
      />
      <DatePicker
        sx={{ width: 240 }}
        label="Departure Date"
        onChange={(value: Date) => {
          console.log(
            "value, typeof value",
            value["$d"].toString(),
            typeof value
          );
        }}
      />
      <DatePicker
        sx={{ width: 240, ml: 2.5 }}
        label="Return Date"
        onChange={(value: Date) => {
          console.log(
            "value, typeof value",
            value["$d"].toString(),
            typeof value
          );
        }}
      />
      <FormGroup row={true}>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="One Way"
          onChange={() => {}}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Round Trip"
          onChange={() => {}}
        />
      </FormGroup>
    </Box>
  );
};

export default FlightForm;
