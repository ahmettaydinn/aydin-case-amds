import { Box, Typography } from "@mui/material";
import TicketCard from "./TicketCard";
import { ticketInfo } from "../types/service";

interface ITicketsListProps {
  scrollRef: React.MutableRefObject<HTMLElement | null>;
  ticketsList: ticketInfo[] | undefined;
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
        <Typography variant="h3" ref={props.scrollRef}>
          Tickets
        </Typography>

        {props.ticketsList && props.ticketsList?.length < 0 ? (
          <Typography
            textAlign={"center"}
            variant="h5"
            color={"#FF0060"}
            mt={10}
          >
            No ticket matches your request
          </Typography>
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
