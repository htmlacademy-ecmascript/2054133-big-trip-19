import dayjs from 'dayjs';
import AbstractView from '../../framework/view/abstract-view';
import { Time } from '../../utils/const';
import { DateFormat, humanizeDate } from '../../utils/date';
import { getDestination, getOffer } from '../../utils/utils';

function createPointTemplate (point, pointDestination, pointOffers) {

  const {type, basePrice, dateFrom, dateTo, isFavorite} = point;
  const {name} = getDestination(point, pointDestination) ?? {};
  const {offers} = getOffer(point, pointOffers) ?? {};

  const differenceDays = dayjs(dateTo).diff(dateFrom, 'd') > 0 ? dayjs(dateTo).diff(dateFrom, 'd') : '';
  const differenceHours = dayjs(dateTo).diff(dateFrom, 'h') % Time.HOURS_IN_DAY > 0 ? dayjs(dateTo).diff(dateFrom, 'h') % Time.HOURS_IN_DAY : '';
  const differenceMinutes = dayjs(dateTo).diff(dateFrom,'m') % Time.MINUTES_IN_HOUR;

  const createOfferElements = () => {
    if (!offers) {
      return '';
    }
    return `${offers.reduce((prev, offer) => {
      const isCheckedOffers = point.offers.includes(offer.id);

      return `${prev}${ isCheckedOffers ?
        `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </li>`
        : ''}`;
    }, '')}`;
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

  const offerElements = createOfferElements();
  const timeDuration = `${getFormattedDate(differenceDays, 'D')} ${getFormattedDate((differenceHours), 'H')} ${getFormattedDate(differenceMinutes, 'M')}`;
  const getFavorite = () => isFavorite ? ' event__favorite-btn--active' : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${humanizeDate(dateFrom, DateFormat.DATE_TIME)}">${humanizeDate(dateFrom, DateFormat.DATE)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${humanizeDate(dateFrom, DateFormat.DATE_TIME)}">${humanizeDate(dateFrom, DateFormat.TIME)}</time>
            &mdash;
            <time class="event__end-time" datetime="${humanizeDate(dateTo, DateFormat.DATE_TIME)}">${humanizeDate(dateTo, DateFormat.TIME)}</time>
          </p>
          <p class="event__duration">${timeDuration}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offerElements}
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
  #onFavoriteClick = null;

  constructor(point, destination, offers, onFavoriteClick, {onButtonClick}) {
    super();
    this.#point = point;
    this.#pointDestination = destination;
    this.#pointOffers = offers;
    this.#onButtonClick = onButtonClick;
    this.#onFavoriteButtonClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onButtonClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavoriteButtonClick);
  }

  get template() {
    return createPointTemplate(this.#point, this.#pointDestination, this.#pointOffers);
  }

  #onFavoriteButtonClick = () => {
    this.#onFavoriteClick(this.#point.isFavorite);
  };
}
