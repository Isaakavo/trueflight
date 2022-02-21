export const availableAirports = ({ data }) => {
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

export const selectDates = ({ data }) => {
  const { maxDate, minDate, comeback, departure } = data.airport.dates;
  return { maxDate, minDate, comeback, departure, ...data.airport.dates };
};
