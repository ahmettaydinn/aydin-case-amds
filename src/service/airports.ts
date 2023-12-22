import { useQuery } from "react-query";
import axios from "axios";
import { airportInfo, emptyAirportData } from "../types/service";

const getAirports = async () => {
  const data = await axios.get<airportInfo[] | undefined>(
    "http://localhost:3000/airports"
  );

  return data.data;
};

export default function useGetAirports() {
  return useQuery({
    queryKey: "airports",
    queryFn: getAirports,
    initialData: [emptyAirportData],
  });
}
