import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  // Chip,
  Typography,
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { ticketInfo } from "../types/service";

interface ITicketCardProps {
  ticket: ticketInfo;
}

const TicketCard = (props: ITicketCardProps) => {
  const { ticket } = props;
  return (
    <Card sx={{ maxWidth: 500, marginTop: 3 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={ticket.arrival_image}
        title={ticket.arrival_city}
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${ticket.departure_city} (${ticket.departure_airport}) - ${ticket.arrival_city} (${ticket.arrival_airport})`}
        </Typography>
        <Typography textAlign={"left"}>{ticket.departureTime}</Typography>
        <Typography variant="body2" color="text.secondary">
          Embark on your dream journey to
          <span style={{ fontWeight: "bold" }}> {ticket.arrival_city}</span> !
          Unleash wanderlust with our exclusive flight deals. Explore new
          horizons from
          <span style={{ fontWeight: "bold" }}> {ticket.departure_city}</span>,
          and create memories that last a lifetime. Your ticket to excitement
          awaits book now and let the journey begin!
        </Typography>
      </CardContent>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mr={2}
      >
        <CardActions>
          <Button size="small">Buy</Button>

          {/* <Chip
            label={ticket.return ? "return ticket" : "departure ticket"}
            color="primary"
            variant="outlined"
          /> */}
        </CardActions>

        <Box display={"flex"}>
          <Typography textAlign={"center"}>{ticket.flight_length}m</Typography>
          <HourglassEmptyIcon fontSize="small" sx={{ ml: 0.5 }} />
        </Box>

        <Typography variant="h5" textAlign={"right"}>
          {ticket.price}$
        </Typography>
      </Box>
    </Card>
  );
};

export default TicketCard;
