import { Box, Typography } from "@mui/material";
import { FlightForm } from "../components/form/FlightForm";
import useGetAirports from "../service/airports";
import TicketsList from "../components/TicketsList";
import { useRef, useState } from "react";
import useGetTicket from "../service/ticket";
import Image from "/public/bgg.jpg";
import { ticketInfo } from "../types/service";
import { handleScrollToTickets } from "../utils/scrollToElement";
import { initialSort } from "../types/ticket";

const FlightBookingPage = () => {
  const [selectedDepartAirport, setSelectedDepartAirport] = useState("");
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState("");
  const [sortList, setSortList] = useState(initialSort);

  // ! ----------------------------------------------------

  const { data: airportsList } = useGetAirports();
  const { data: ticketsList } = useGetTicket({
    departAirport: selectedDepartAirport,
    arrivalAirport: selectedArrivalAirport,
    sortList: sortList,
  });
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
          // searchTickets(data, ticketsList, setSearchedTickets);
          setSelectedArrivalAirport(data.arrivalAirport);
          setSelectedDepartAirport(data.departureAirPort);
        }}
        options={airportsList ?? []}
        handleScroll={() => handleScrollToTickets(ticketsScrollRef)}
        setSelectedArrivalAirport={setSelectedArrivalAirport}
        setSelectedDepartAirport={setSelectedDepartAirport}
      />
      <TicketsList
        scrollRef={ticketsScrollRef}
        ticketsList={searchedTickets ? searchedTickets : ticketsList}
        isFiltered={!!searchedTickets}
        setSearchedTickets={setSearchedTickets}
        sortList={sortList}
        setSortList={setSortList}
      />
    </Box>
  );
};

export default FlightBookingPage;
