import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { DateFormat, humanizeDate } from '../../utils/date';
import { getDestination, getOffer, isContainsCity } from '../../utils/utils';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function createItemEditPointTemplate (point, pointDestination, pointOffers, types) {
  const {type, basePrice, dateFrom, dateTo} = point;
  const {offers} = getOffer(point, pointOffers);
  const {description, name, pictures} = getDestination(point, pointDestination);

  const createOfferElements = () => {
    if(!offers) {
      return '';
    }
    return `${offers.reduce((prev, offer) =>
      `${prev} <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').pop()}-1" type="checkbox" name="event-offer-${offer.title.split(' ').pop()}">
        <label class="event__offer-label" for="event-offer-${offer.title.split(' ').pop()}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
        </div>`, '')}`;
  };

  const createPointsTypeElements = () =>
    `${types.reduce((prev, typeOfPoint) =>
      `${prev} <div class="event__type-item">
      <input id="event-type-${typeOfPoint}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeOfPoint}">
      <label class="event__type-label  event__type-label--${typeOfPoint}" for="event-type-${typeOfPoint}-1">${typeOfPoint}</label>
    </div>`, '')}`;

  const createPrictureElements = () =>
    `${pictures.reduce((prev, picture) =>
      `${prev} <img class="event__photo" src="${picture.src}" alt="Event photo">`, '')}`;

  const createDataCityList = () =>
    `${pointDestination.reduce((prev, destintation) =>
      `${prev} <option value="${destintation.name}""></option>`, '')}`;

  const offerElements = createOfferElements();
  const pointsTypeElements = createPointsTypeElements();
  const prictureElements = createPrictureElements();
  const cityDataList = createDataCityList();

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${pointsTypeElements}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${cityDataList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, DateFormat.DATE_TIME_INPUT)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, DateFormat.DATE_TIME_INPUT)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offerElements}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${prictureElements}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`
  );
}

export default class EditPointView extends AbstractStatefulView {

  #pointDestination = null;
  #pointOffers = null;
  #types = null;
  #onButtonClick = null;
  #onFormSubmit = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor(point, destination, offers, typesOfPoints, onFormSubmit, {onButtonClick}) {
    super();

    this._state = EditPointView.parsePointToState(point);

    this.#pointDestination = destination;
    this.#pointOffers = offers;
    this.#types = typesOfPoints;
    this.#onButtonClick = onButtonClick;
    this.#onFormSubmit = onFormSubmit;
    this._restoreHandlers();
  }

  get template() {
    return createItemEditPointTemplate(this._state, this.#pointDestination, this.#pointOffers, this.#types);
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }

  #setDatepicker() {
    if (this._state.dateFrom) {
      this.#datepickerStart = flatpickr(this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          'time_24hr': true,
          dateFormat: 'd/m/y H:i',
          maxDate: this._state.dateTo,
          defaultDate: this._state.dateFrom,
          onChange: this.#onDateChangeStart
        });
    }

    if (this._state.dateTo) {
      this.#datepickerEnd = flatpickr(this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          'time_24hr': true,
          dateFormat: 'd/m/y H:i',
          minDate: this._state.dateFrom,
          defaultDate: this._state.dateTo,
          onChange: this.#onDateChangeEnd
        });
    }
  }

  #onDateChangeStart = ([userDateStart]) => {
    this.updateElement({...this._state, dateFrom: userDateStart});
  };

  #onDateChangeEnd = ([userDateEnd]) => {
    this.updateElement({...this._state, dateTo: userDateEnd});
  };

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }
    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#onSubmitButton);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onButtonClick);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#onTypeClick);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#onInputChange);
    this.#setDatepicker();
  }

  #onSubmitButton = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #onTypeClick = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.updateElement({type: evt.target.value});
  };

  #onInputChange = (evt) => {
    const currentCity = isContainsCity(this.#pointDestination, evt.target);
    if (!currentCity) {
      return;
    }
    this.updateElement({destination: currentCity.id});
  };

  reset(point) {
    this.updateElement(EditPointView.parsePointToState(point));
  }
}
