import { Container } from "@mui/material";
import FlightForm from "./form/flightForm";
import { useState } from "react";

const MainComponent = () => {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  return (
    <Container
      sx={{
        border: "2px solid red",
        height: "83%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <FlightForm
        departure={departure}
        setDeparture={setDeparture}
        arrival={arrival}
        setArrival={setArrival}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        returnDate={returnDate}
        setReturnDate={setReturnDate}
      />
    </Container>
  );
};

export default MainComponent;
