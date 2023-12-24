import { Box, Button, Typography } from "@mui/material";
import TicketCard from "./TicketCard";
import { ticketInfo } from "../types/service";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import { IinitialSort } from "../types/ticket";
import { handleSort } from "../utils/sortTickets";
import { ClimbingBoxLoader } from "react-spinners";

interface ITicketsListProps {
  scrollRef: React.MutableRefObject<HTMLElement | null>;
  ticketsList: ticketInfo[] | undefined;
  isFiltered: boolean;
  setSearchedTickets: React.Dispatch<
    React.SetStateAction<ticketInfo[] | undefined | null>
  >;
  sortList: IinitialSort;
  setSortList: React.Dispatch<React.SetStateAction<IinitialSort>>;
  isLoading: boolean;
  isError: boolean;
}

const TicketsList = (props: ITicketsListProps) => {
  const [sortedTickets, setSortedTickets] = useState<
    ticketInfo[] | undefined | null
  >(null);

  const ticketData = sortedTickets ?? props.ticketsList;

  const flexCenter = props.isLoading
    ? {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 500,
      }
    : {};
  return (
    <Box
      sx={{
        overflow: "hidden",
        marginBottom: 10,
        border: "2px solid #232D3F",
        borderRadius: 3,
        width: 500,

        ...flexCenter,
      }}
    >
      {props.isLoading ? (
        <ClimbingBoxLoader
          color={"black"}
          loading={props.isLoading}
          // cssOverride={override}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
          // style={{ textAlign: "center" }}
        />
      ) : (
        <>
          <Box display={"flex"} justifyContent={"space-between"} p={1}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              borderBottom={
                props.sortList.price !== 0 ? "1px solid gray" : "0px solid gray"
              }
            >
              <Button
                onClick={() => {
                  handleSort(
                    "price",
                    setSortedTickets,
                    props.setSortList,
                    props.sortList
                  );
                }}
                color="info"
              >
                Price
              </Button>
              {props.sortList.price === 1 ? (
                <ArrowDropUpIcon sx={{ mt: 0.5 }} color="info" />
              ) : (
                <ArrowDropDownIcon sx={{ mt: 0.5 }} color="info" />
              )}
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              borderBottom={
                props.sortList.departureTime !== 0
                  ? "1px solid gray"
                  : "0px solid gray"
              }
            >
              <Button
                onClick={() => {
                  handleSort(
                    "departureTime",
                    setSortedTickets,
                    props.setSortList,
                    props.sortList
                  );
                }}
              >
                Departure
              </Button>
              {props.sortList.departureTime === 1 ? (
                <ArrowDropUpIcon sx={{ mt: 0.5 }} color="info" />
              ) : (
                <ArrowDropDownIcon sx={{ mt: 0.5 }} color="info" />
              )}
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              borderBottom={
                props.sortList.return_time !== 0
                  ? "1px solid gray"
                  : "0px solid gray"
              }
            >
              <Button
                onClick={() => {
                  handleSort(
                    "return_time",
                    setSortedTickets,
                    props.setSortList,
                    props.sortList
                  );
                }}
              >
                Return
              </Button>
              {props.sortList.return_time === 1 ? (
                <ArrowDropUpIcon sx={{ mt: 0.5 }} color="info" />
              ) : (
                <ArrowDropDownIcon sx={{ mt: 0.5 }} color="info" />
              )}
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              borderBottom={
                props.sortList.flight_length !== 0
                  ? "1px solid gray"
                  : "0px solid gray"
              }
            >
              <Button
                onClick={() => {
                  handleSort(
                    "flight_length",
                    setSortedTickets,
                    props.setSortList,
                    props.sortList
                  );
                }}
              >
                Duration
              </Button>
              {props.sortList.flight_length === 1 ? (
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
              {"Tickets"}
            </Typography>

            {(props.ticketsList && props.ticketsList?.length === 0) ||
            props.isError ? (
              <>
                <Typography
                  textAlign={"center"}
                  variant="h5"
                  color={"error"}
                  mt={10}
                >
                  No ticket matches your request. Check other tickets that may
                  suit your plan.
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
        </>
      )}
    </Box>
  );
};

export default TicketsList;
