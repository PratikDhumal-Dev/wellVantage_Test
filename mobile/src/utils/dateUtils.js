import { format, parse } from 'date-fns';

export const formatDate = (date) => {
  return format(date, 'dd MMMM yyyy');
};

export const formatTime = (date) => {
  return format(date, 'h:mm a');
};

export const formatDateForAPI = (date) => {
  return format(date, 'yyyy-MM-dd');
};

export const parseTime = (timeString) => {
  return parse(timeString, 'h:mm a', new Date());
};

export const formatTimeForDisplay = (timeString) => {
  // If timeString is already in "HH:mm" format, convert to "h:mm a"
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};


