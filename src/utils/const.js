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

const UpdateTask = {
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

const TYPES_OF_POINT = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export { SortType, POINT_PRICE, Time, UserAction, UpdateTask, TYPES_OF_POINT };
