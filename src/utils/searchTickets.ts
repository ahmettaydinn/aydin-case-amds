import { FlightFormValues } from "../types/form";
import { ticketInfo } from "../types/service";

export const searchTickets = (
  data: FlightFormValues,
  ticketsList: ticketInfo[] | undefined,
  setSearchedTickets: React.Dispatch<
    React.SetStateAction<ticketInfo[] | null | undefined>
  >
) => {
  const departureTickets = ticketsList?.filter((ticket) => {
    const departureCondition =
      ticket.departure_airport === data.arrivalAirport &&
      ticket.arrival_airport === data.departureAirPort &&
      new Date(data.departureDate as Date).getTime() <=
        new Date(ticket.departure_time).getTime();

    return departureCondition;
  });

  const returnTickets = ticketsList?.filter((ticket) => {
    const returnCondition =
      ticket.departure_airport === data.departureAirPort &&
      ticket.arrival_airport === data.arrivalAirport &&
      new Date(data.returnDate as Date).getTime() <=
        new Date(ticket.departure_time).getTime();

    return returnCondition;
  });

  returnTickets?.map((ticket) => {
    ticket.return = true;
  });

  if (data.isOneWay) {
    setSearchedTickets(departureTickets);
  } else {
    setSearchedTickets(departureTickets?.concat(returnTickets as ticketInfo[]));
  }
};
