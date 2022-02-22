import moment from 'moment';
export const formatDate = (date) => {
  return moment(date).format('ddd D MMM YYYY');
};
