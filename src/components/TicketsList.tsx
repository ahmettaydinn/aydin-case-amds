import { Box, Button, Typography } from "@mui/material";
import TicketCard from "./TicketCard";
import { ticketInfo } from "../types/service";

interface ITicketsListProps {
  scrollRef: React.MutableRefObject<HTMLElement | null>;
  ticketsList: ticketInfo[] | undefined;
  isFiltered: boolean;
  setSearchedTickets: React.Dispatch<
    React.SetStateAction<ticketInfo[] | undefined | null>
  >;
}

const TicketsList = (props: ITicketsListProps) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        marginBottom: 10,
        border: "2px solid #232D3F",
        borderRadius: 3,
        width: 450,
      }}
    >
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
          props.ticketsList?.map((ticket) => {
            return <TicketCard ticket={ticket} key={ticket.id} />;
          })
        )}
      </Box>
    </Box>
  );
};

export default TicketsList;
