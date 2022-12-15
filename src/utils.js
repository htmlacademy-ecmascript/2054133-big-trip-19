import dayjs from 'dayjs';

const DATA_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const DATE_TIME_INPUT_FORMAT = 'DD/MM/YY HH:mm';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isBoolean = (firstValue, secondValue) => firstValue === secondValue;

const humanizeDate = (dueDate) => dueDate ? dayjs(dueDate).format(DATA_FORMAT) : '';

const humanizeTime = (dueDate) => dueDate ? dayjs(dueDate).format(TIME_FORMAT) : '';

const humanizeDateTime = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_TIME_FORMAT) : '';

const humanizeDateTimeInput = (dueDate) => dueDate ? dayjs(dueDate).format(DATE_TIME_INPUT_FORMAT) : '';

export { getRandomArrayElement, getRandomIntInclusive, isBoolean, humanizeDate, humanizeTime, humanizeDateTime, humanizeDateTimeInput };
