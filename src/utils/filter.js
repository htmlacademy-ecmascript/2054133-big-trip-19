import { FilterType } from './const';
import { isPointFuture, isPointPast, isPointPresent } from './date';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointPresent(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointPast(point.dateFrom)),
};

const generateFilterList = (points) => Object.entries(filter).map(([filterName, filterPoint]) => ({
  name: filterName,
  count: filterPoint(points).length,
}));

export { filter, generateFilterList };
