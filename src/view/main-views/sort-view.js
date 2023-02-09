import AbstractView from '../../framework/view/abstract-view';

const createSortItemTemplate = (sortName, currentSort) =>
  `<div class="trip-sort__item  trip-sort__item--${sortName}">
    <input id="sort-${sortName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
      data-sort-type="${sortName}" value="sort-${sortName}" ${(sortName === 'event' || sortName === 'offer') ? 'disabled' : ''}
      ${currentSort === sortName ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${sortName}">${sortName}</label>
  </div>`;

const createEventsSortTemplate = (sortType, currentSort) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(sortType).reduce((prev, sortName) => `${prev}${createSortItemTemplate(sortName, currentSort)}`, '')}
  </form>`;

export default class PointsSortView extends AbstractView {
  #sortType = null;
  #onSortClick = null;
  #currentSort = null;

  constructor (sortType, onSortChange, currentSort) {
    super();
    this.#sortType = sortType;
    this.#onSortClick = onSortChange;
    this.#currentSort = currentSort;

    this.element.addEventListener('click', this.#sortClickHandler);
  }

  get template() {
    return createEventsSortTemplate(this.#sortType, this.#currentSort);
  }

  #sortClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#onSortClick(evt.target.dataset.sortType);
  };
}
