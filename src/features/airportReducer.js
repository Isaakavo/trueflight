export const availableAirports = (state) => {
  const {
    airports: { reducer: {airport, selected, input} },
  } = state;


  
  if (selected) {
    const filtered = airport.filter(
      (x) => x.code !== selected.selected
    );
    return { airport: filtered, input: input };
  }
  return state.airports.reducer;
};
