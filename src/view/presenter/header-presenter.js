import {render, RenderPosition} from '../../render.js';
import InfoView from '../../view/header-views/info-view.js';
import FiltersView from '../../view/header-views/filters-view.js';

export default class HeaderPresenter {
  constructor({mainContainer, filtersContainer}) {
    this.mainContainer = mainContainer;
    this.filtersContainer = filtersContainer;
  }

  init() {
    render(new InfoView(), this.mainContainer, RenderPosition.AFTERBEGIN);
    render(new FiltersView(), this.filtersContainer);
  }
}
