import dayjs from 'dayjs';
import { TIME_FORMAT } from '../utils/utils';

const SortType = {
  DAY: 'day',
  EVENTS: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offer'
};

const sort = {
  [SortType.DAY]: (points) => points.sort((a, b) => dayjs(a.dateFrom).format('DD') - dayjs(b.dateFrom).format('DD')),
  [SortType.EVENTS]: (points) => points,
  [SortType.TIME]: (points) => points.sort((a, b) => dayjs(a.dateFrom).format(TIME_FORMAT) - dayjs(b.dateFrom).format(TIME_FORMAT)),
  [SortType.PRICE]: (points) => points.sort((a, b) => a.basePrice - b.basePrice),
  [SortType.OFFERS]: (points) => points,
};

const generateSort = (points) => Object.entries(sort).map(([sortName, sortPoint]) => ({
  name: sortName,
  points: sortPoint(points),
}));

export { generateSort };
