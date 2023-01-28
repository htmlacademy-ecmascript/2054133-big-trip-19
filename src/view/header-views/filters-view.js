import AbstractView from '../../framework/view/abstract-view';

const createItemFilterTemplate = (filter, currentFilter) => {
  const {name, count} = filter;
  return `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}"
      ${currentFilter === name ? 'checked' : ''}
      ${count < 1 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`;
};

const createFiltersTemplate = (filters, currentFilter) =>
  `<form class="trip-filters" action="#" method="get">
    ${Object.values(filters).reduce((prev, filter) => `${prev}${createItemFilterTemplate(filter, currentFilter)}`, '')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #onFilterClick = null;

  constructor (filters, currentFilter, onFilterChange) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#onFilterClick = onFilterChange;

    this.element.addEventListener('click', this.#filterClickHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#onFilterClick(evt.target.value);
  };
}
