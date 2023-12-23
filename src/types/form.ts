import { Dayjs } from "dayjs";

export type FlightFormValues = {
  departureAirPort: string;
  arrivalAirport: string;
  departureDate: Date | Dayjs;
  returnDate: Date | Dayjs;
  isOneWay: boolean;
  isRoundWay: boolean;
};
