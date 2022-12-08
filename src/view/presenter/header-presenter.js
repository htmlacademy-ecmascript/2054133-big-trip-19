import {render, RenderPosition} from '../../render.js';
import Info from '../../view/header-views/info-view.js';
import Filters from '../../view/header-views/filters-view.js';

export default class HeaderPresenter {
  constructor({mainContainer, filtersContainer}) {
    this.mainContainer = mainContainer;
    this.filtersContainer = filtersContainer;
  }

  init() {
    render(new Info(), this.mainContainer, RenderPosition.AFTERBEGIN);
    render(new Filters(), this.filtersContainer);
  }
}
