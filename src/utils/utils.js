const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEqual = (firstValue, secondValue) => firstValue === secondValue;

const getDestination = (point, dest) => dest.find((item) => item.id === point.destination);
const getOffer = (point, offers) => offers.find((item) => item.type === point.type);

const isContainsCity = (destinations, target) => destinations.find((destination) => destination.name === target.value);

const changeSelectedOffers = (offers, target) => offers.filter((offer) => offer !== target);

export {
  getRandomArrayElement,
  getRandomIntInclusive,
  isEscapeKey,
  isEqual,
  getDestination,
  getOffer,
  isContainsCity,
  changeSelectedOffers
};
