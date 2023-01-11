import dayjs from 'dayjs';
import { PRESENT_DATE } from './date';


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

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEqual = (firstValue, secondValue) => firstValue === secondValue;

const updateItem = (points, update) => points.map((point) => point.id === update.id ? update : point);

const getDestination = (point, dest) => dest.find((item) => item.id === point.destination);
const getOffer = (point, offers) => offers.find((item) => item.type === point.type);

export {
  isPointPast,
  isPointPresent,
  isPointFuture,
  getRandomArrayElement,
  getRandomIntInclusive,
  isEscapeKey,
  isEqual,
  humanizeDate,
  updateItem,
  getDestination,
  getOffer
};
