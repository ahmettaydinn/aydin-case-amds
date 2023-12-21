import { useQuery } from "react-query";
import axios from "axios";
import { airportInfo, emptyData } from "../types/service";

const getAirports = async () => {
  const data = await axios.get<airportInfo[] | undefined>(
    "http://localhost:3000/airports?_page=1"
  );

  return data.data;
};

export default function useGetAirports() {
  return useQuery({
    queryKey: "airports",
    queryFn: getAirports,
    initialData: [emptyData],
  });
}
