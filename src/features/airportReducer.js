export const availableAirports = (state) => {
  const {
    airports: { reducer: {airport, selected, input, hide} },
  } = state;


  if (selected) {
    debugger;
    const filtered = airport.filter(
      (x) => x.code !== selected.selected
    );
    if (hide) {
      return { airport: filtered, input: input, hide };
    }
    return { airport: filtered, input: input };
  }
  return state.airports.reducer;
};

export const selectDates = (state) => {
  debugger;
  const { maxDate, minDate } = state.dates;
  return {maxDate, minDate};
};