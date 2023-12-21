import { useQuery } from "react-query";
import axios from "axios";
import { emptyTicketData, ticketInfo } from "../types/service";

const getAirports = async () => {
  const data = await axios.get<ticketInfo[] | undefined>(
    "http://localhost:3000/tickets"
  );

  return data.data;
};

export default function useGetAirports() {
  return useQuery({
    queryKey: "airports",
    queryFn: getAirports,
    initialData: [emptyTicketData],
  });
}
