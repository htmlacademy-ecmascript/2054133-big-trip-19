import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/header-views/info-view';
import FiltersView from '../view/header-views/filters-view';
import { generateFilter } from '../mock/filter';

export default class HeaderPresenter {
  #mainContainer = null;
  #filtersContainer = null;
  #pointModel = null;

  #points = [];

  constructor(mainContainer, filtersContainer, pointModel) {
    this.#mainContainer = mainContainer;
    this.#filtersContainer = filtersContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    const filters = generateFilter(this.#points);

    render(new InfoView(), this.#mainContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView(filters), this.#filtersContainer);
  }
}
