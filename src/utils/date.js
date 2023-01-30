import dayjs from 'dayjs';

const PRESENT_DATE = new Date();

const DateFormat = {
  DAY: 'DD',
  DATE: 'MMM DD',
  TIME: 'HH:mm',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
  DATE_TIME_INPUT: 'DD/MM/YY HH:mm'
};

function isPointFuture(dueDate) {
  return dayjs(dueDate).isAfter(PRESENT_DATE, 'D');
}

function isPointPresent(dueDate) {
  return dayjs(dueDate).isSame(PRESENT_DATE, 'D');
}

function isPointPast(dueDate) {
  return dayjs(dueDate).isBefore(PRESENT_DATE, 'D');
}

const humanizeDate = (dueDate, dateFormat) => dueDate ? dayjs(dueDate).format(dateFormat) : '';

export { DateFormat, PRESENT_DATE, isPointFuture, isPointPresent, isPointPast, humanizeDate };
