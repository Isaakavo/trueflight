

export const getBoking = ({booking}) => {
  const {data, cartFlag} = booking;
  return {booking: [data], cartFlag};
}

export const getBookingForFlights = ({booking}) => {
  console.log({booking});
  return booking;
}