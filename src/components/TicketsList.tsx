import { Box, Button, Typography } from "@mui/material";
import TicketCard from "./TicketCard";
import { ticketInfo } from "../types/service";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import { initialSort } from "../types/ticket";
import { handleSort } from "../utils/sortTickets";

interface ITicketsListProps {
  scrollRef: React.MutableRefObject<HTMLElement | null>;
  ticketsList: ticketInfo[] | undefined;
  isFiltered: boolean;
  setSearchedTickets: React.Dispatch<
    React.SetStateAction<ticketInfo[] | undefined | null>
  >;
}

const TicketsList = (props: ITicketsListProps) => {
  const [sortList, setSortList] = useState(initialSort);

  const [sortedTickets, setSortedTickets] = useState<
    ticketInfo[] | undefined | null
  >(null);

  const ticketData = sortedTickets ?? props.ticketsList;

  console.log("sortList", sortList);
  return (
    <Box
      sx={{
        overflow: "hidden",
        marginBottom: 10,
        border: "2px solid #232D3F",
        borderRadius: 3,
        width: 500,
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} p={1}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          borderBottom={
            sortList.price !== 0 ? "1px solid gray" : "0px solid gray"
          }
        >
          <Button
            onClick={() => {
              handleSort(
                "price",
                setSortedTickets,
                setSortList,
                props.ticketsList,
                sortList
              );
            }}
            color="info"
          >
            Price
          </Button>
          {sortList.price === 1 ? (
            <ArrowDropUpIcon sx={{ mt: 0.5 }} color="info" />
          ) : (
            <ArrowDropDownIcon sx={{ mt: 0.5 }} color="info" />
          )}
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          borderBottom={
            sortList.departure_time !== 0 ? "1px solid gray" : "0px solid gray"
          }
        >
          <Button
            onClick={() => {
              handleSort(
                "departure_time",
                setSortedTickets,
                setSortList,
                props.ticketsList,
                sortList
              );
            }}
          >
            Departure
          </Button>
          {sortList.departure_time === 1 ? (
            <ArrowDropUpIcon sx={{ mt: 0.5 }} color="info" />
          ) : (
            <ArrowDropDownIcon sx={{ mt: 0.5 }} color="info" />
          )}
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          borderBottom={
            sortList.return_time !== 0 ? "1px solid gray" : "0px solid gray"
          }
        >
          <Button
            onClick={() => {
              handleSort(
                "return_time",
                setSortedTickets,
                setSortList,
                props.ticketsList,
                sortList
              );
            }}
          >
            Return
          </Button>
          {sortList.return_time === 1 ? (
            <ArrowDropUpIcon sx={{ mt: 0.5 }} color="info" />
          ) : (
            <ArrowDropDownIcon sx={{ mt: 0.5 }} color="info" />
          )}
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          borderBottom={
            sortList.flight_length !== 0 ? "1px solid gray" : "0px solid gray"
          }
        >
          <Button
            onClick={() => {
              handleSort(
                "flight_length",
                setSortedTickets,
                setSortList,
                props.ticketsList,
                sortList
              );
            }}
          >
            Duration
          </Button>
          {sortList.flight_length === 1 ? (
            <ArrowDropUpIcon sx={{ mt: 0.5 }} color="info" />
          ) : (
            <ArrowDropDownIcon sx={{ mt: 0.5 }} color="info" />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          overflow: "auto",
          height: 700,
          padding: 5,
        }}
      >
        <Typography variant="h3" ref={props.scrollRef} textAlign={"center"}>
          {props?.isFiltered ? "Searched Tickets" : "All Tickets"}
        </Typography>

        {props.ticketsList && props.ticketsList?.length === 0 ? (
          <>
            <Typography
              textAlign={"center"}
              variant="h5"
              color={"error"}
              mt={10}
            >
              No ticket matches your request. Check other tickets that may suit
              your plan.
            </Typography>
            <Button
              color="error"
              sx={{ ml: "34%", mt: 3 }}
              variant="outlined"
              onClick={() => {
                props.setSearchedTickets(null);
              }}
            >
              All Tickets
            </Button>
          </>
        ) : (
          ticketData?.map((ticket) => {
            return <TicketCard ticket={ticket} key={ticket.id} />;
          })
        )}
      </Box>
    </Box>
  );
};

export default TicketsList;
