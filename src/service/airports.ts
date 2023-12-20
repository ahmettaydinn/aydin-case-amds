import { useQuery } from "react-query";
import axios from "axios";
import { airportInfo } from "../types/service";

const getAirports = async () => {
  const data = await axios.get<airportInfo[]>("http://localhost:3000/airports");

  return data.data;
};

export default function useGetAirports() {
  return useQuery({
    queryKey: "airports",
    queryFn: getAirports,
    initialData: [
      {
        name: "string",
        city: "string",
        country: "string",
        iata_code: "string",
        _geoloc: {
          lat: 0,
          lng: 0,
        },
        links_count: 2,
        id: "string",
      },
    ],
  });
}
