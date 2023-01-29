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
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK'
};

const UpdatePoint = {
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
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

const TypeOfPoint = {
  EDIT: 'EDIT',
  ADD: 'ADD'
};

const TYPES_OF_POINT_EVENT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export { SortType, POINT_PRICE, Time, UserAction, UpdatePoint, FilterType, TYPES_OF_POINT_EVENT, TypeOfPoint, NoPointsMessage };
