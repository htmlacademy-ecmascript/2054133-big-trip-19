import dayjs from 'dayjs';

const sortDay = (pointA, pointB) => {
  if (pointA.dateFrom > pointB.dateFrom) {
    return 1;
  } else if (pointB.dateFrom > pointA.dateFrom) {
    return -1;
  } else {
    return 0;
  }
};

const sortTime = (pointA, pointB) => {
  if (dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo)) > dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo))) {
    return 1;
  } else if (dayjs(pointB.dateFrom).diff(dayjs(pointB.dateTo)) > dayjs(pointA.dateFrom).diff(dayjs(pointA.dateTo))) {
    return -1;
  } else {
    return 0;
  }
};

const sortPrice = (pointA, pointB) => {
  if (pointB.basePrice > pointA.basePrice) {
    return 1;
  } else if (pointA.basePrice > pointB.basePrice) {
    return -1;
  } else {
    return 0;
  }
};

export { sortDay, sortTime, sortPrice };
