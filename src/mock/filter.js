import { isPointFuture, isPointPast, isPointPresent } from '../utils/utils';

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateFrom)),
};

const generateFilter = (points) => Object.entries(filter).map(([filterName, filterPoint]) => ({
  name: filterName,
  points: filterPoint(points),
}));

export { generateFilter };
