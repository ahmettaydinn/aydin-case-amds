import { useQuery } from "react-query";
import axios from "axios";
import { emptyTicketData, ticketInfo } from "../types/service";
import { IinitialSort } from "../types/ticket";

const getTicket = async (
  departAirport: string,
  arrivalAirport: string,
  sortList: IinitialSort,
  returnDate: null | string,
  departDate: string
) => {
  let endpoint = "http://localhost:3000/tickets?";

  let toBeSorted: string = "";
  let sortDirection: number = 0;

  // ? Add Sort queries
  Object.keys(sortList).forEach((sortKey) => {
    sortKey as "price" | "departureTime" | "return_time" | "flight_length";
    console.log("sortList[sortKey]", sortList[sortKey as keyof IinitialSort]);
    if (sortList[sortKey as keyof IinitialSort] !== 0) {
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
    endpoint += `&departure_airport=${departAirport || ""}`;
  }

  if (arrivalAirport) {
    endpoint += `&arrival_airport=${arrivalAirport || ""}`;
  }

  if (returnDate) {
    endpoint += `&departureTime_gte=${departDate}&departureTime_lte=${returnDate}`;
  } else {
    endpoint += `&departureTime_gte=${departDate}&departureTime_lte=${"2099-12-30"}`;
  }
  const data = await axios.get<ticketInfo[] | undefined>(endpoint);

  return data.data;
};

export default function useGetTicket({
  departAirport,
  arrivalAirport,
  sortList,
  returnDate,
  departDate,
}: {
  departAirport: string;
  arrivalAirport: string;
  sortList: IinitialSort;
  returnDate: string | null;
  departDate: string;
}) {
  return useQuery({
    queryKey: ["tickets", departAirport, sortList],
    queryFn: () =>
      getTicket(
        departAirport,
        arrivalAirport,
        sortList,
        returnDate,
        departDate
      ),
    initialData: [emptyTicketData],
  });
}
