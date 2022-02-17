

export const getBoking = ({booking}) => {
  debugger;
  const {data, cartFlag} = booking;
  return {booking: [data], cartFlag};
}

export const getBookingForFlights = ({booking}) => {
  console.log({booking});
  return booking;
}

export const getFinalBooking = ({booking}) => {
  const {cartFlag} = booking;
  return {booking: [booking], ...cartFlag};
}