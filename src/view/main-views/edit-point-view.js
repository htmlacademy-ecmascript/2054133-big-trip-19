import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import { DateFormat, humanizeDate } from '../../utils/date';
import { changeSelectedOffers, getDestination, getOffer, isContainsCity, } from '../../utils/utils';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { UserAction } from '../../utils/const';

const BLANK_POINT = {
  basePrice: 1,
  dateFrom: new Date(2020, 4, 4, 5, 4, 4, 567),
  dateTo: new Date(2020, 4, 11, 5, 11, 4, 567),
  destination: 1,
  id: null,
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

function createItemEditPointTemplate (userAction, point, pointDestination, pointOffers, types) {

  const {type, basePrice, dateFrom, dateTo, isSaving, isDeleting} = point;
  const {offers} = getOffer(point, pointOffers) ?? {};
  const {description, name, pictures} = getDestination(point, pointDestination) ?? {};

  const createArrowElement = () => userAction === UserAction.UPDATE_POINT ? '<button class="event__rollup-btn" type="button"></button>' : '';

  const createTypeOfButtonReset = () => {
    if (isDeleting) {
      return 'Deleting...';
    }
    if (userAction === UserAction.UPDATE_POINT) {
      return 'Delete';
    }
    return 'Cancel';
  };

  const createSaveButton = () => isSaving ? 'Saving...' : 'Save';

  const createOfferElements = () => {

    if (!offers) {
      return '';
    }
    return `${offers.reduce((prev, offer) => {
      const isCheckedOffers = point.offers.includes(offer.id);
      return `${prev} <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').pop()}-${offer.id}"
        type="checkbox" name="event-offer-${offer.title.split(' ').pop()}" ${isCheckedOffers ? 'checked' : ''} ${isSaving || isDeleting ? 'disabled' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.title.split(' ').pop()}-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
        </div>`;
    }, '')}`;
  };

  const createPointsTypeElements = () =>
    `${types.reduce((prev, pointType) =>
      `${prev} <div class="event__type-item">
      <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1" >${pointType}</label>
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
  const arrowElement = createArrowElement();
  const typeOfButtonReset = createTypeOfButtonReset();
  const saveButton = createSaveButton();

  return (
    `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isSaving || isDeleting ? 'disabled' : ''}>

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
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1"
        ${isSaving || isDeleting ? 'disabled' : ''}>
        <datalist id="destination-list-1">
          ${cityDataList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, DateFormat.DATE_TIME_INPUT)}"
        ${isSaving || isDeleting ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, DateFormat.DATE_TIME_INPUT)}"
        ${isSaving || isDeleting ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value="${basePrice}" ${isSaving || isDeleting ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">${saveButton}</button>
      <button class="event__reset-btn" type="reset">${typeOfButtonReset}</button>
        ${arrowElement}
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

  #userAction = null;
  #pointDestination = null;
  #pointOffers = null;
  #types = null;
  #onArrowClick = null;
  #onFormSubmit = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #onPointDelete = null;

  constructor(userAction, point, destination, offers, typesOfPoints, onFormSubmit, onPointDelete, onArrowClick) {
    super();

    if(!point) {
      point = BLANK_POINT;
    }
    this.#userAction = userAction;
    this._state = EditPointView.parsePointToState(point);
    this.#pointDestination = destination;
    this.#pointOffers = offers;
    this.#types = typesOfPoints;
    this.#onArrowClick = onArrowClick;
    this.#onFormSubmit = onFormSubmit;
    this.#onPointDelete = onPointDelete;
    this._restoreHandlers();
  }

  get template() {
    return createItemEditPointTemplate(this.#userAction, this._state, this.#pointDestination, this.#pointOffers, this.#types);
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

  reset(point) {
    this.updateElement(EditPointView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#onSubmitButton);
    if (this.#userAction === UserAction.UPDATE_POINT) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onArrowClick);
    }
    this.element.querySelector('.event__type-group').addEventListener('click', this.#onTypeClick);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onCityChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteButtonClick);
    this.element.querySelector('.event__available-offers').addEventListener('click', this.#onOfferClick);
    this.#setDatepicker();
  }

  #onDateChangeStart = ([userDateStart]) => {
    this.updateElement(EditPointView.parseStateToPoint({dateFrom: userDateStart}));
  };

  #onDateChangeEnd = ([userDateEnd]) => {
    this.updateElement(EditPointView.parseStateToPoint({dateTo: userDateEnd}));
  };

  #onOfferClick = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    const target = Number(evt.target.id.split('-').pop());

    let selectedOffers = [...this._state.offers];

    if (evt.target.checked && !selectedOffers.includes(target)) {
      selectedOffers.push(target);
    }
    if (!evt.target.checked && selectedOffers.includes(target)) {
      selectedOffers = changeSelectedOffers(selectedOffers, target);
    }

    this._state = {...this._state, offers: selectedOffers};
  };

  #onSubmitButton = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #onTypeClick = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.updateElement({type: evt.target.value, offers: []});
  };

  #onCityChange = (evt) => {
    const currentCity = isContainsCity(this.#pointDestination, evt.target);
    if (!currentCity) {
      return;
    }
    this.updateElement({destination: currentCity.id});
  };

  #onPriceChange = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this._state = {...this._state, basePrice: evt.target.value};
  };

  #onDeleteButtonClick = () => {
    this.#onPointDelete();
  };

  static parsePointToState(point) {
    return {...point, isSaving: false, isDeleting: false};
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
