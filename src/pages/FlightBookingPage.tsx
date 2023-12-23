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
  const [selectedDepartDate, setSelectedDepartDate] = useState("");
  const [selectedReturnDate, setSelectedReturnDate] = useState<null | string>(
    ""
  );
  const [sortList, setSortList] = useState(initialSort);

  // ! ---------------------------------------------------------------------------

  const { data: airportsList, isFetching: airportsLoading } = useGetAirports();
  const { data: ticketsList, isFetching: ticketsLoading } = useGetTicket({
    departAirport: selectedDepartAirport,
    arrivalAirport: selectedArrivalAirport,
    sortList: sortList,
    departDate: selectedDepartDate,
    returnDate: selectedReturnDate,
  });
  const ticketsScrollRef = useRef<null | HTMLElement>(null);
  const [searchedTickets, setSearchedTickets] = useState<
    ticketInfo[] | undefined | null
  >(null);

  // ! ---------------------------------------------------------------------------s

  const isLoading = airportsLoading || ticketsLoading;

  console.log("selectedReturnDate", selectedReturnDate);

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
          setSelectedArrivalAirport(data.arrivalAirport);
          setSelectedDepartAirport(data.departureAirPort);
          setSelectedDepartDate(
            `${new Date(data.departureDate as Date).getFullYear()}-${new Date(
              data.departureDate as Date
            ).getMonth()}-${new Date(data.departureDate as Date).getDate()}`
          );

          if (data.isOneWay === true) {
            setSelectedReturnDate(null);
          } else {
            setSelectedReturnDate(
              `${new Date(data.returnDate as Date).getFullYear()}-${new Date(
                data.returnDate as Date
              ).getMonth()}-${new Date(data.returnDate as Date).getDate()}`
            );
          }
        }}
        options={airportsList ?? []}
        handleScroll={() => handleScrollToTickets(ticketsScrollRef)}
      />
      <TicketsList
        scrollRef={ticketsScrollRef}
        ticketsList={searchedTickets ? searchedTickets : ticketsList}
        isFiltered={!!searchedTickets}
        setSearchedTickets={setSearchedTickets}
        sortList={sortList}
        setSortList={setSortList}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default FlightBookingPage;
