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

export const emptyData: airportInfo = {
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
