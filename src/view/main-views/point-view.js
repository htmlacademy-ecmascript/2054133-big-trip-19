import { humanizeDate } from '../../utils/utils';
import dayjs from 'dayjs';
import AbstractView from '../../framework/view/abstract-view';
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from '../../utils/date';

function createPointTemplate (point, pointDestination, pointOffers) {
  const {type, basePrice, dateFrom, dateTo, isFavorite} = point;
  const {name} = pointDestination || {};
  const {offers} = pointOffers || {};

  const differenceTime = dayjs(dateTo).diff(dateFrom,'h', 'm');
  const differenceDays = dayjs(dateTo).diff(dateFrom,'d');
  const roundedMinutes = Math.ceil(Number(`${0}.${differenceTime.toString().split('.')[1]}`) * 60);

  const createOfferElements = () => {
    if (!offers) {
      return '';
    }
    return `${offers.reduce((prev, offer) =>
      `${prev}<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </li>`, '')}`;
  };

  const getFormattedDate = (date, format) => {
    if (!date.toString().length) {
      return '';
    }

    if (date.toString().length === 1) {
      return `0${date}${format}`;
    }

    return `${date}${format}`;
  };

  const timeDuration = `${getFormattedDate(differenceDays, 'D')} ${getFormattedDate(Math.trunc(differenceTime), 'H')} ${getFormattedDate(roundedMinutes, 'M')}`;

  const getFavorite = () => {
    if (isFavorite) {
      return ' event__favorite-btn--active';
    }
    return '';
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizeDate(dateFrom, DATE_TIME_FORMAT)}">${humanizeDate(dateFrom, DATE_FORMAT)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${humanizeDate(dateFrom, DATE_TIME_FORMAT)}">${humanizeDate(dateFrom.slice(0,-1), TIME_FORMAT)}</time>
            &mdash;
            <time class="event__end-time" datetime="${humanizeDate(dateTo, DATE_TIME_FORMAT)}">${humanizeDate(dateTo.slice(0,-1), TIME_FORMAT)}</time>
          </p>
          <p class="event__duration">${timeDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOfferElements()}
        </ul>
        <button class="event__favorite-btn${getFavorite()}" type="button">
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

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffers = null;
  #onButtonClick = null;

  constructor(point, destination, offers, {onButtonClick}) {
    super();
    this.#point = point;
    this.#pointDestination = destination;
    this.#pointOffers = offers;
    this.#onButtonClick = onButtonClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onButtonClick);

    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoritClickHandler);
  }

  #favoritClickHandler() {
    this.classList.toggle('event__favorite-btn--active');
  }

  get template() {
    return createPointTemplate(this.#point, this.#pointDestination, this.#pointOffers);
  }
}
