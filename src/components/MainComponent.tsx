import { Box, Typography } from "@mui/material";
import { FlightForm } from "./form/FlightForm";
import useGetAirports from "../service/airports";
import TicketsList from "./TicketsList";
import { useRef, useState } from "react";
import useGetTicket from "../service/ticket";
import Image from "/public/bgg.jpg";
import { ticketInfo } from "../types/service";
import { FlightFormValues } from "../types/form";

const MainComponent = () => {
  const { data: airportsList } = useGetAirports();
  const { data: ticketsList } = useGetTicket();
  const ticketsScrollRef = useRef<null | HTMLElement>(null);

  const handleScrollToTickets = () => {
    ticketsScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [searchedTickets, setSearchedTickets] = useState<
    ticketInfo[] | undefined | null
  >(null);

  const searchTickets = (data: FlightFormValues) => {
    const departureTickets = ticketsList?.filter((ticket) => {
      // console.log("data.returnDate", new Date(data.returnDate).getTime());
      // console.log("data.departureDate", new Date(data.departureDate).getTime());
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
      setSearchedTickets(
        departureTickets?.concat(returnTickets as ticketInfo[])
      );
    }
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
      <Box
        sx={{ backgroundImage: `url(${Image})` }}
        mt={3}
        p={5}
        borderRadius={2}
      >
        <Typography variant="h1">Get Your Dream Holiday</Typography>
      </Box>

      <FlightForm
        onSubmitReady={(data) => {
          searchTickets(data);
        }}
        options={airportsList ?? []}
        handleScroll={handleScrollToTickets}
      />
      <TicketsList
        scrollRef={ticketsScrollRef}
        ticketsList={searchedTickets ? searchedTickets : ticketsList}
        isFiltered={!!searchedTickets}
        setSearchedTickets={setSearchedTickets}
      />
    </Box>
  );
};

export default MainComponent;
