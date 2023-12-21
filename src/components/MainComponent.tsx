import { Box } from "@mui/material";
import { FlightForm } from "./form/FlightForm";
import useGetAirports from "../service/airports";
import FlightCard from "./FlightCard";

const MainComponent = () => {
  const { data: airportsList } = useGetAirports();
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      sx={{ border: "2px solid red" }}
      display={"flex"}
      flexDirection={"column"}
    >
      <FlightForm
        onSubmitReady={(data) => {
          console.log("onSubmitReady", data);
        }}
        options={airportsList ?? []}
      />
      <FlightCard />
    </Box>
  );
};

export default MainComponent;
