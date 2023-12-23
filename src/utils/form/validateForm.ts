import { Dayjs } from "dayjs";
import { UseFormWatch } from "react-hook-form";

export const validateAutoComplete = (
  newValue: string | undefined,
  name: string,
  watch: UseFormWatch<{
    departureAirPort: string;
    arrivalAirport: string;
    departureDate: Date | Dayjs;
    returnDate: Date | Dayjs;
    isOneWay: boolean;
    isRoundWay: boolean;
  }>
) => {
  if (name === "arrivalAirport" && newValue === watch("departureAirPort")) {
    return "invalid";
  } else if (
    name === "departureAirport" &&
    newValue === watch("arrivalAirport")
  ) {
    return "invalid";
  } else {
    return "valid";
  }
};

export const validateDatePicker = (
  newValue: string | boolean | Date | null | Dayjs,
  name: string,
  watch: UseFormWatch<{
    departureAirPort: string;
    arrivalAirport: string;
    departureDate: Date | Dayjs;
    returnDate: Date | Dayjs;
    isOneWay: boolean;
    isRoundWay: boolean;
  }>
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
