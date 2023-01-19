import AbstractView from '../../framework/view/abstract-view';

const createSortItemTemplate = (sortName) =>
  `<div class="trip-sort__item  trip-sort__item--${sortName}">
    <input id="sort-${sortName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      data-sort-type="${sortName}" value="sort-${sortName}" ${(sortName === 'event' || sortName === 'offer') ? 'disabled' : ''}
      ${'day' === sortName ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${sortName}">${sortName}</label>
  </div>`;

const createEventsSortTemplate = (sortType) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(sortType).reduce((prev, sortName) => `${prev}${createSortItemTemplate(sortName)}`, '')}
  </form>`;

export default class EventsSortView extends AbstractView {
  #sortType = null;
  #onSortClick = null;

  constructor (sortType, onSortChange) {
    super();
    this.#sortType = sortType;
    this.#onSortClick = onSortChange;

    this.element.addEventListener('click', this.#sortClickHandler);
  }

  #sortClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#onSortClick(evt.target.dataset.sortType);
  };

  get template() {
    return createEventsSortTemplate(this.#sortType);
  }
}
