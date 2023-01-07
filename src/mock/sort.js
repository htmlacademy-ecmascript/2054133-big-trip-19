import dayjs from 'dayjs';
import { DAY_FORMAT, TIME_FORMAT } from '../utils/utils';

const SortType = {
  DAY: 'day',
  EVENTS: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer'
};

const sort = {
  [SortType.EVENTS]: (points) => points,
  [SortType.TIME]: (points) => points.sort((a, b) => dayjs(a.dateFrom).format(TIME_FORMAT) - dayjs(b.dateFrom).format(TIME_FORMAT)),
  [SortType.PRICE]: (points) => points.sort((a, b) => a.basePrice - b.basePrice),
  [SortType.OFFERS]: (points) => points,
  [SortType.DAY]: (points) => points.sort((a, b) => dayjs(a.dateFrom).format(DAY_FORMAT) - dayjs(b.dateFrom).format(DAY_FORMAT)),
};

const generateSort = (points) => Object.entries(sort).map(([sortName, sortPoint]) => ({
  name: sortName,
  points: sortPoint(points),
}));

export { generateSort};
