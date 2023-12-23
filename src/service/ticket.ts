import { useQuery } from "react-query";
import axios from "axios";
import { emptyTicketData, ticketInfo } from "../types/service";
import { IinitialSort } from "../types/ticket";

const getTicket = async (
  departAirport: string,
  arrivalAirport: string,
  sortList: IinitialSort
) => {
  let endpoint = "http://localhost:3000/tickets?";

  let toBeSorted: string = "";
  let sortDirection: number = 0;

  // ? Add Sort queries
  Object.keys(sortList).forEach((sortKey) => {
    sortKey as "price" | "departure_time" | "return_time" | "flight_length";
    console.log("sortList[sortKey]", sortList[sortKey as keyof IinitialSort]);
    if (sortList[sortKey as keyof IinitialSort] !== 0) {
      console.log("trigger");

      toBeSorted = sortKey;
      sortDirection = sortList[sortKey as keyof IinitialSort];
    }
  });

  if (toBeSorted) {
    endpoint += `_sort=${toBeSorted}&_order=${
      sortDirection === 1 ? "desc" : "asc"
    }`;
  }

  // ? Add Search queries
  if (departAirport) {
    endpoint += `departure_airport=${departAirport || ""}`;
  }

  if (arrivalAirport) {
    endpoint += `&arrival_airport=${arrivalAirport || ""}`;
  }
  const data = await axios.get<ticketInfo[] | undefined>(endpoint);

  return data.data;
};

export default function useGetTicket({
  departAirport,
  arrivalAirport,
  sortList,
}: {
  departAirport: string;
  arrivalAirport: string;
  sortList: IinitialSort;
}) {
  return useQuery({
    queryKey: ["tickets", departAirport, sortList],
    queryFn: () => getTicket(departAirport, arrivalAirport, sortList),
    initialData: [emptyTicketData],
  });
}
