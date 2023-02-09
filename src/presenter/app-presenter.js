import { remove, render, RenderPosition } from '../framework/render';
import InfoView from '../view/header-views/info-view';
import PointsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import EventsMessage from '../view/main-views/message-view';
import PointPresenter from './point-presenter';
import { FilterType, SortType, UpdatePoint, UserAction } from '../utils/const';
import { sortDay, sortPrice, sortTime } from '../utils/sort';
import FilterPresenter from './filter-presenter';
import { filter } from '../utils/filter';
import ButtonView from '../view/header-views/button-view';
import AddPointPresenter from './add-point-presenter';
import LoadingPresenter from '../view/main-views/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class AppPresenter {

  #eventsElement = null;
  #filtersElement = null;
  #mainElement = null;
  #pointModel = null;
  #filterModel = null;

  #points = [];
  #destinations = [];
  #offers = [];
  #typesOfPoints = null;

  #currentSortType = SortType.DAY;

  #pointsPresenter = new Map();

  #loadingElement = null;
  #eventsListElement = new EventsListView();
  #eventMessageElement = null;
  #eventsInfoElement = null;
  #pointPresenter = null;
  #eventsSortElement = null;
  #filterPresenter = null;
  #addNewPointPresenter = null;
  #buttonPresenter = null;

  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(eventsElement, filtersElement, mainElement, pointModel, filterModel) {
    this.#eventsElement = eventsElement;
    this.#filtersElement = filtersElement;
    this.#mainElement = mainElement;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#onModelDataChange);
    this.#filterModel.addObserver(this.#onModelDataChange);
  }

  get filteredPoints() {
    this.#points = [...this.#pointModel.points];

    const filteredPoints = filter[this.#filterModel.currentFilter](this.#points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);

      case SortType.TIME:
        return filteredPoints.sort(sortTime);

      case SortType.DAY:
        return filteredPoints.sort(sortDay);
    }
    return filteredPoints;
  }

  get destinations() {
    this.#destinations = [...this.#pointModel.destinations];
    return this.#destinations;
  }

  get offers() {
    this.#offers = [...this.#pointModel.offers];
    return this.#offers;
  }

  get typesOfPoints() {
    this.#typesOfPoints = [...this.#pointModel.typesOfPoints];
    return this.#typesOfPoints;
  }

  get currentFilter() {
    return this.#filterModel.currentFilter;
  }

  init() {
    this.#renderButton();
    this.renderLoading();
  }

  renderLoading() {
    this.#loadingElement = new LoadingPresenter();
    render(this.#loadingElement, this.#eventsElement);
  }

  renderfilter() {
    this.#filterPresenter = new FilterPresenter(this.#filtersElement, this.#filterModel, this.#pointModel);
    this.#filterPresenter.init();
  }

  #renderPoint(point) {
    this.#buttonPresenter.element.disabled = false;
    this.#pointPresenter = new PointPresenter(this.#eventsListElement, this.#onViewDataChange, this.#onModeChange, this.typesOfPoints);
    this.#pointPresenter.init(point, this.destinations, this.offers);
    this.#pointsPresenter.set(point.id, this.#pointPresenter);
  }

  #renderPoints() {
    this.filteredPoints.forEach((point) => this.#renderPoint(point));
  }

  #clearBoard(resetSortType) {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
    remove(this.#eventsSortElement);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
    if (this.#eventMessageElement) {
      remove(this.#eventMessageElement);
    }
    if (this.loadingElement) {
      remove(this.loadingElement);
    }

    if (this.#addNewPointPresenter) {
      this.#addNewPointPresenter.destroy();
    }

    remove(this.#eventsInfoElement);
  }

  #renderBoard() {
    if (!this.filteredPoints.length) {
      this.#renderMessage();
      remove(this.#eventsSortElement);
      return;
    }
    this.#renderSort();

    this.#renderPoints();
    render(this.#eventsListElement, this.#eventsElement);
    this.#renderInfo();
  }

  #renderSort() {
    this.#eventsSortElement = new PointsSortView(SortType, this.#onSortChange, this.#currentSortType);
    render(this.#eventsSortElement, this.#eventsElement);
  }

  #renderMessage() {
    this.#eventMessageElement = new EventsMessage(this.currentFilter, this.#points.length);
    render(this.#eventMessageElement, this.#eventsElement);
  }

  #renderInfo(updateData) {
    this.#eventsInfoElement = new InfoView(this.#points, this.destinations, this.offers, updateData);
    render(this.#eventsInfoElement, this.#mainElement, RenderPosition.AFTERBEGIN);
  }

  #renderButton() {
    this.#buttonPresenter = new ButtonView(this.#onCreateButtonClick);
    render(this.#buttonPresenter, this.#mainElement);
    this.#buttonPresenter.element.disabled = true;
  }

  #renderNewPoint() {
    this.#addNewPointPresenter = new AddPointPresenter(this.#eventsListElement, this.#destinations, this.#offers, this.typesOfPoints, this.#onViewDataChange, this.#destroyNewPoint);

    if (this.#filterModel.currentFilter !== FilterType.EVERYTHING) {
      this.#filterModel.setFilter(UpdatePoint.LARGE, FilterType.EVERYTHING);
    }
    this.#onSortChange(SortType.DAY);
    this.#buttonPresenter.element.disabled = true;

    this.#addNewPointPresenter.init();
  }

  #destroyNewPoint = () => {
    this.#buttonPresenter.element.disabled = false;
  };

  #onModeChange = () => {
    if (this.#addNewPointPresenter) {
      this.#addNewPointPresenter.destroy();
    }
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #onViewDataChange = async (actionType, updateType, data) => {
    this.#uiBlocker.block();

    switch(actionType) {
      case UserAction.ADD_POINT:
        this.#addNewPointPresenter.setSaving();
        try {
          await this.#pointModel.addPoint(updateType, data);
        }
        catch(err) {
          this.#addNewPointPresenter.setAborting();
        }
        break;
      case UserAction.UPDATE_POINT:
        this.#pointsPresenter.get(data.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, data);
        }
        catch(err) {
          this.#pointsPresenter.get(data.id).setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenter.get(data.id).setDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, data);
        }
        catch(err) {
          this.#pointsPresenter.get(data.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #onModelDataChange = (updateType, data) => {
    switch(updateType) {
      case UpdatePoint.INIT:
        remove(this.#loadingElement);
        this.#renderBoard({resetSort: true});
        break;
      case UpdatePoint.LARGE:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdatePoint.MEDIUM:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdatePoint.LOW:
        this.#pointsPresenter.get(data.id).init(data, this.destinations, this.offers);
        remove(this.#eventsInfoElement);
        this.#renderInfo(data);
        break;
    }
  };

  #onCreateButtonClick = () => {
    this.#onModeChange();
    this.#renderNewPoint();
  };

  #onSortChange = (target) => {
    if (target === this.#currentSortType) {
      return;
    }
    if (this.#addNewPointPresenter) {
      this.#addNewPointPresenter.destroy();
    }
    this.#currentSortType = target;
    this.#clearBoard();
    this.#renderBoard();
  };
}
