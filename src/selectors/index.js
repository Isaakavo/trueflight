export const getBooking = ({data}) => data.booking;
export const getDates = ({ data }) => data.airport.dates;
export const getFlights = ({ data }) => data.flights;
export const getUi = ({ ui }) => ui;
export const getAvailableAirports = ({ data }) => {
  const {
    airport: { airport, selected, input, hideList, passengers },
  } = data;
  if (selected) {
    const filtered = airport.filter((x) => x.code !== selected.selected);
    const newState = {
      airport: filtered,
      airportData: airport,
      input: input,
      hideList,
      passengers,
      selected,
      route: input.route,
    };
    return newState;
  }
  return data.airport;
};