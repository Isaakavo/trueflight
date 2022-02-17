

export const getBoking = ({booking}) => {
  debugger;
  const {data, cartFlag} = booking;
  return {booking: [data], cartFlag};
}