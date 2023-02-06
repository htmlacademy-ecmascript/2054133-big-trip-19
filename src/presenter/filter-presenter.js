import { remove, render, replace } from '../framework/render';
import { UpdatePoint } from '../utils/const';
import { generateFilterList } from '../utils/filter';
import FiltersView from '../view/header-views/filters-view';

export default class FilterPresenter {

  #filtersElement = null;
  #filterModel = null;
  #pointModel = null;

  #filterElement = null;

  constructor(filtersElement, filterModel, pointModel) {
    this.#filtersElement = filtersElement;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#filterModel.addObserver(this.#onModelDataChange);
    this.#pointModel.addObserver(this.#onModelDataChange);
  }

  get currentFilter() {
    return this.#filterModel.currentFilter;
  }

  init() {
    const prevFilterElement = this.#filterElement;
    const points = [...this.#pointModel.points];
    const filters = generateFilterList(points);

    this.#filterElement = new FiltersView(
      filters,
      this.currentFilter,
      this.#onFilterChange
    );

    if (!prevFilterElement) {
      render(this.#filterElement, this.#filtersElement);
      return;
    }

    replace(this.#filterElement, prevFilterElement);
    remove(prevFilterElement);
  }

  #onFilterChange = (targetFilter) => {
    if (targetFilter === this.currentFilter) {
      return;
    }
    this.#filterModel.setFilter(UpdatePoint.LARGE, targetFilter);
  };

  #onModelDataChange = () => this.init();
}
