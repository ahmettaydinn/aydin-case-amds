export interface airportInfo {
  name: string;
  city: string;
  country: string;
  iata_code: string;
  _geoloc: {
    lat: number;
    lng: number;
  };
  links_count: number;
  id: string;
}

export const emptyAirportData: airportInfo = {
  name: "",
  city: "",
  country: "",
  iata_code: "",
  _geoloc: {
    lat: 0,
    lng: 0,
  },
  links_count: 0,
  id: "",
};

export interface ticketInfo {
  id: string;
  departure_city: string;
  arrival_city: string;
  departure_airport: string;
  arrival_airport: string;
  departureTime: string;
  return_time: string;
  flight_length: number;
  price: number;
  arrival_image: string;
  return?: boolean;
}

export const emptyTicketData: ticketInfo = {
  id: "",
  departure_city: "",
  arrival_city: "",
  departure_airport: "",
  arrival_airport: "",
  departureTime: "",
  return_time: "",
  flight_length: 0,
  price: 0,
  arrival_image: "",
};
