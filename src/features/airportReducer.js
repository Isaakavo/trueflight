export const availableAirports = (state) => {
  const {
    airports: {
      reducer: { airport, selected, input, hideR, passagers },
    },
  } = state;
  debugger;
  if (selected) {
    const filtered = airport.filter((x) => x.code !== selected.selected);
    debugger;
    return { airport: filtered, input: input, hideR, passagers };
  }
  return state.airports.reducer;
};

export const selectDates = (state) => {
  const { maxDate, minDate, comeback, departure } = state.dates;
  return { maxDate, minDate, comeback, departure, ...state.dates };
};
