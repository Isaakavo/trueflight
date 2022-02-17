export const availableAirports = (state) => {
  const {
    airports: {
      reducer: { airport, selected, input, hideR, passagers },
    },
  } = state;
  if (selected) {
    const filtered = airport.filter((x) => x.code !== selected.selected);
    return { airport: filtered, airportData: airport ,input: input, hideR, passagers, selected, };
  }
  return state.airports.reducer;
};

export const selectDates = (state) => {
  const { maxDate, minDate, comeback, departure } = state.dates;
  return { maxDate, minDate, comeback, departure, ...state.dates };
};
