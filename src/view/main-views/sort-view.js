import AbstractView from '../../framework/view/abstract-view';

const createSortItemTemplate = (sortItem, isChecked) => {
  const {name} = sortItem;
  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${isChecked ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>`
  );
};

const createEventsSortTemplate = (sorting) =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sorting.reduce((prev, sortItem) => `${prev}${createSortItemTemplate(sortItem)}`, '')}
  </form>`;

export default class EventsSortView extends AbstractView {
  #sorting = null;

  constructor (sorting) {
    super();
    this.#sorting = sorting;
  }

  get template() {
    return createEventsSortTemplate(this.#sorting);
  }
}
