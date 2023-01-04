import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '../utils/utils';

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price'
};

const sort = {
  [SortType.DAY]: (points) => points.sort((a, b) => dayjs(a.dateFrom).format('MM DD') - dayjs(b.dateFrom).format('DD')),
  [SortType.TIME]: (points) => points.sort((a, b) => dayjs(a.dateFrom).format(TIME_FORMAT) - dayjs(b.dateFrom).format(TIME_FORMAT)),
  [SortType.PRICE]: (points) => points.sort((a, b) => a.basePrice - b.basePrice),
};

export const sortDate = (pointA, pointB) => {
  if (pointA.dateFrom > pointB.dateFrom) {
    return 1;
  } else if (pointB.dateFrom > pointA.dateFrom) {
    return -1;
  } else {
    return 0;
  }
};

const generateSort = (points) => Object.entries(sort).map(([sortName, sortPoint]) => ({
  name: sortName,
  points: sortPoint(points),
}));

export { generateSort };
