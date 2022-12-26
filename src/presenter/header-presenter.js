import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/header-views/info-view';
import FiltersView from '../view/header-views/filters-view';

export default class HeaderPresenter {
  #mainContainer = null;
  #filtersContainer = null;

  constructor(mainContainer, filtersContainer) {
    this.#mainContainer = mainContainer;
    this.#filtersContainer = filtersContainer;
  }

  init() {
    render(new InfoView(), this.#mainContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.#filtersContainer);
  }
}
