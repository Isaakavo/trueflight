export const availableAirports = (state) => {
  const {
    airports: {
      reducer: { airport, selected, input, hideR, passagers },
    },
  } = state;
  if (selected) {
    const filtered = airport.filter((x) => x.code !== selected.selected);
    const newState = {
      airport: filtered,
      airportData: airport,
      input: input,
      hideR,
      passagers,
      selected,
      route: input.route,
    };
    debugger;
    return newState;
  }
  return state.airports.reducer;
};

export const selectDates = (state) => {
  debugger;
  const { maxDate, minDate, comeback, departure } = state.dates;
  return { maxDate, minDate, comeback, departure, ...state.dates };
};
