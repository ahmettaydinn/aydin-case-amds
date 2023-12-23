import { Box, Typography } from "@mui/material";
import { FlightForm } from "../components/form/FlightForm";
import useGetAirports from "../service/airports";
import TicketsList from "../components/TicketsList";
import { useRef, useState } from "react";
import useGetTicket from "../service/ticket";
import Image from "/public/bgg.jpg";
import { ticketInfo } from "../types/service";
import { searchTickets } from "../utils/searchTickets";
import { handleScrollToTickets } from "../utils/scrollToElement";

const FlightBookingPage = () => {
  const { data: airportsList } = useGetAirports();
  const { data: ticketsList } = useGetTicket();
  const ticketsScrollRef = useRef<null | HTMLElement>(null);
  const [searchedTickets, setSearchedTickets] = useState<
    ticketInfo[] | undefined | null
  >(null);

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
          searchTickets(data, ticketsList, setSearchedTickets);
        }}
        options={airportsList ?? []}
        handleScroll={() => handleScrollToTickets(ticketsScrollRef)}
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

export default FlightBookingPage;
