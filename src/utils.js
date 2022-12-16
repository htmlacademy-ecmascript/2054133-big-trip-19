import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
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

const humanizeDate = (dueDate, dataFormat) => dueDate ? dayjs(dueDate).format(dataFormat) : '';

export { getRandomArrayElement, getRandomIntInclusive, isBoolean, humanizeDate, DATE_FORMAT, TIME_FORMAT, DATE_TIME_FORMAT, DATE_TIME_INPUT_FORMAT };
