import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format('ddd D MMM YYYY');
};

export const getActualMinDate = (currentDate) => {
  const convert = moment(currentDate.date).isBefore(
    moment().toISOString(),
    'day'
  );

  return convert
    ? { ...currentDate, date: moment().format('YYYY-MM-DD') }
    : currentDate;
};
