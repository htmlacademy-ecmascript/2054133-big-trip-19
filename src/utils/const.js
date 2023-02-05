const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer'
};

const POINT_PRICE = {
  min: 100,
  max: 2000,
};

const Time = {
  HOURS_IN_DAY: 24,
  MINUTES_IN_HOUR: 60
};

const UserAction = {
  ADD_POINT: 'ADD_POINT',
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdatePoint = {
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
  INIT: 'INIT'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const NoPointsMessage = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no past events now',
  [FilterType.FUTURE]: 'There are no future events now'
};

const TYPES_OF_POINT_EVENT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export { SortType, POINT_PRICE, Time, UserAction, UpdatePoint, FilterType, TYPES_OF_POINT_EVENT, NoPointsMessage };
