import AbstractView from '../../framework/view/abstract-view';

const createItemFilterTemplate = (filterItem, isChecked) => {
  const {name, count} = filterItem;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything"
        ${isChecked ? 'checked' : ''}${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-everything">${name}</label>
    </div>`
  );
};

const createFiltersTemplate = (filters) =>
  `<form class="trip-filters" action="#" method="get">
    ${filters.reduce((prev, filterItem) => `${prev}${createItemFilterTemplate(filterItem)}`, '')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor (filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
