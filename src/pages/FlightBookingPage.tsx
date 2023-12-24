import { Box, Typography } from "@mui/material";
import { FlightForm } from "../components/form/FlightForm";
import useGetAirports from "../service/airports";
import TicketsList from "../components/TicketsList";
import { useEffect, useRef, useState } from "react";
import useGetTicket from "../service/ticket";
import Image from "/public/bgg.jpg";
import { ticketInfo } from "../types/service";
import { handleScrollToTickets } from "../utils/scrollToElement";
import { initialSort } from "../types/ticket";
import { toast } from "react-toastify";

const FlightBookingPage = () => {
  const [selectedDepartAirport, setSelectedDepartAirport] = useState("");
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState("");
  const [selectedDepartDate, setSelectedDepartDate] = useState("");
  const [selectedReturnDate, setSelectedReturnDate] = useState<null | string>(
    ""
  );
  const [sortList, setSortList] = useState(initialSort);

  // ! ---------------------------------------------------------------------------

  const {
    data: airportsList,
    isFetching: airportsLoading,
    isError,
  } = useGetAirports();
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

  useEffect(() => {
    if (isError === true) {
      toast("We encountered a problem");
    }
  }, [isError]);

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
            `${new Date(data.departureDate as Date).getFullYear()}-${
              new Date(data.departureDate as Date).getMonth() + 1
            }-${new Date(data.departureDate as Date).getDate()}`
          );

          if (data.isOneWay === true) {
            setSelectedReturnDate(null);
          } else {
            setSelectedReturnDate(
              `${new Date(data.returnDate as Date).getFullYear()}-${
                new Date(data.returnDate as Date).getMonth() + 1
              }-${new Date(data.returnDate as Date).getDate()}`
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
        isError={isError}
      />
    </Box>
  );
};

export default FlightBookingPage;
