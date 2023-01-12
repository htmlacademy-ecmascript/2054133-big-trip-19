import AbstractView from '../../framework/view/abstract-view';

const createSortItemTemplate = (sortName, isChecked) =>
  `<div class="trip-sort__item  trip-sort__item--${sortName}">
    <input id="sort-${sortName}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortName}" ${isChecked ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${sortName}">${sortName}</label>
  </div>`;

const createEventsSortTemplate = (sorting) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sorting.reduce((prev, sortName) => `${prev}${createSortItemTemplate(sortName)}`, '')}
  </form>`;

export default class EventsSortView extends AbstractView {
  #sorting = null;

  constructor (sorteredPoints) {
    super();
    this.#sorting = sorteredPoints;
  }

  get template() {
    return createEventsSortTemplate(this.#sorting);
  }
}
