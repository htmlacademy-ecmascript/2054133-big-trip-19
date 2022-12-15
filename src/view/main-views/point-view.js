import { createElement } from '../../render';
import { humanizeDate, humanizeTime, humanizeDateTime } from '../../utils';
import dayjs from 'dayjs';

function createPointTemplate (point, pointDestination) {
  const {type, basePrice, dateFrom, dateTo, isFavorite} = point;
  const {name} = pointDestination;

  const formatDate = (date) => humanizeDate(date);
  const formatDateTime = (date) => humanizeDateTime(date);
  const formatTime = (date) => humanizeTime(date.slice(0,-1));

  const timeDuration = () => {
    const differenceTime = dayjs(dateTo).diff(dateFrom,'h', 'm');
    const differenceDays = dayjs(dateTo).diff(dateFrom,'d');

    const days = () => {

      if (differenceDays === 0) {
        return '';
      }
      else if (differenceDays.toString().length === 1) {
        return `0${differenceDays}D`;
      }
      return `${differenceDays}D`;
    };

    const hours = () => {
      const integerHours = Math.trunc(differenceTime);
      if (integerHours === 0) {
        return '';
      }
      else if (integerHours.toString().length === 1) {
        return `0${integerHours}H`;
      }
      return `${integerHours}H`;
    };

    const minutes = () => {
      const roundedMinutes = Math.ceil(Number(`${0}.${differenceTime.toString().split('.')[1]}`) * 60);

      if (roundedMinutes.toString().length === 1) {
        return `0${roundedMinutes}M`;
      }
      return `${roundedMinutes}M`;
    };

    return `${days()} ${hours()} ${minutes()}`;
  };

  const favorite = () => {
    if (isFavorite) {
      return ' event__favorite-btn--active';
    }
    return '';
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${(formatDateTime(dateFrom))}">${formatDate(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${(formatDateTime(dateFrom))}">${formatTime(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="${(formatDateTime(dateTo))}">${formatTime(dateTo)}</time>
          </p>
          <p class="event__duration">${timeDuration()}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
           <span class="event__offer-title">Order Uber</span>
           &plus;&euro;&nbsp;
           <span class="event__offer-price">20</span>
          </li>
        </ul>
        <button class="event__favorite-btn${favorite()}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView {
  constructor(point, destination) {
    this.point = point;
    this.pointDestination = destination;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.pointDestination);
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
