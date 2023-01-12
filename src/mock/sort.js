import dayjs from 'dayjs';
import { DAY_FORMAT, TIME_FORMAT } from '../utils/date';

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer'
};

const sort = {
  [SortType.DAY]: (points) => points.sort((a, b) => dayjs(b.dateFrom).format(DAY_FORMAT) - dayjs(a.dateFrom).format(DAY_FORMAT)),
  [SortType.EVENT]: (points) => points,
  [SortType.TIME]: (points) => points.sort((a, b) => dayjs(b.dateFrom).format(TIME_FORMAT) - dayjs(a.dateFrom).format(TIME_FORMAT)),
  [SortType.PRICE]: (points) => points.sort((a, b) => b.basePrice - a.basePrice),
  [SortType.OFFERS]: (points) => points,
};

const generateSort = (points) => Object.entries(sort).map(([sortName, sortPoint]) => ({
  name: sortName,
  points: sortPoint(points),
}));

export { generateSort };
