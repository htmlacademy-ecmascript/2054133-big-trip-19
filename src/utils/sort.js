import dayjs from 'dayjs';
import { DateFormat } from './date';

const sortDay = (points) => points.sort((a, b) => dayjs(a.dateFrom).format(DateFormat.DAY) - dayjs(b.dateFrom).format(DateFormat.DAY));
const sortTime = (points) => points.sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));
const sortPrice = (points) => points.sort((a, b) => b.basePrice - a.basePrice);

export { sortDay, sortTime, sortPrice };
