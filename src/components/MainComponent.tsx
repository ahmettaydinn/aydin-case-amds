import { Box } from "@mui/material";
import { FlightForm } from "./form/FlightForm";
import useGetAirports from "../service/airports";

import TicketsList from "./TicketsList";
import { useRef, useState } from "react";
import useGetTicket from "../service/ticket";

interface ISubmitData {
  isRoundWay: string;
  departureAirPort: string;
  arrivalAirport: string;
  departureDate: string;
  returnDate: string;
  isOneWay: true;
}

const MainComponent = () => {
  const { data: airportsList } = useGetAirports();
  const { data: ticketsList } = useGetTicket();
  const ticketsScrollRef = useRef<null | HTMLElement>(null);

  const handleScrollToTickets = () => {
    ticketsScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [searchedTickets, setSearchedTickets] = useState(null);

  const searchTickets = (data: ISubmitData) => {
    const departureTickets = ticketsList?.filter((ticket) => {
      console.log("data.returnDate", new Date(data.returnDate).getTime());
      console.log("data.departureDate", new Date(data.departureDate).getTime());
      const departureCondition =
        ticket.departure_airport === data.arrivalAirport &&
        ticket.arrival_airport === data.departureAirPort &&
        new Date(data.departureDate).getTime() <=
          new Date(ticket.departure_time).getTime();

      return departureCondition;
    });

    const returnTickets = ticketsList?.filter((ticket) => {
      console.log("data.returnDate", new Date(data.returnDate).getTime());
      console.log("data.departureDate", new Date(data.departureDate).getTime());
      const returnCondition =
        ticket.departure_airport === data.departureAirPort &&
        ticket.arrival_airport === data.arrivalAirport &&
        new Date(data.returnDate).getTime() <=
          new Date(ticket.departure_time).getTime();

      return returnCondition;
    });

    returnTickets?.map((ticket) => {
      ticket.return = true;
    });

    console.log("departureTickets", departureTickets);

    setSearchedTickets(departureTickets?.concat(returnTickets));
  };
  console.log("searchedTickets", searchedTickets);
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
    >
      <FlightForm
        onSubmitReady={(data) => {
          console.log("onSubmitReady", data);
          searchTickets(data);
        }}
        options={airportsList ?? []}
        handleScroll={handleScrollToTickets}
      />
      <TicketsList
        scrollRef={ticketsScrollRef}
        ticketsList={searchedTickets ? searchedTickets : ticketsList}
      />
    </Box>
  );
};

export default MainComponent;
