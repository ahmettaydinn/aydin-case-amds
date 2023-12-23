import { ticketInfo } from "../types/service";
import { IinitialSort, initialSort } from "../types/ticket";

export const handleSort = (
  column: "price" | "departure_time" | "return_time" | "flight_length",
  setSortedTickets: React.Dispatch<
    React.SetStateAction<ticketInfo[] | null | undefined>
  >,
  setSortList: React.Dispatch<React.SetStateAction<IinitialSort>>,

  sortList: IinitialSort
) => {
  const spreadSortList = { ...sortList };

  Object.keys(initialSort).forEach((sortItem) => {
    if (sortItem !== column) {
      spreadSortList[
        sortItem as "price" | "departure_time" | "return_time" | "flight_length"
      ] = 0;
    }
  });
  if (spreadSortList[column] !== 2) {
    spreadSortList[column] += 1;
  } else {
    spreadSortList[column] = 0;
    setSortedTickets(null);
  }

  setSortList(spreadSortList);

  //! -------------------------------------------------------------------------------

  // if (spreadSortList[column] === 2) {
  //   setSortedTickets(ticketsList);
  // } else {
  //   const spreadTicketList = [...(ticketsList || [emptyTicketData])];

  //   if (column === "departure_time" || column === "return_time") {
  //     spreadTicketList.sort((b, a) => {
  //       if (new Date(a[column]) < new Date(b[column])) {
  //         return -1;
  //       }
  //       if (new Date(a[column]) > new Date(b[column])) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   } else {
  //     spreadTicketList.sort((b, a) => {
  //       if (a[column] < b[column]) {
  //         return -1;
  //       }
  //       if (a[column] > b[column]) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //   }

  //   setSortedTickets(spreadTicketList);
  // }
};
