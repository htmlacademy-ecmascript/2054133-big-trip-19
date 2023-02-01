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
  #isLoading = true;

  #pointsPresenter = new Map();

  #loadingElement = null;
  #eventsListElement = new EventsListView();
  #eventMessageElement = null;
  #eventsInfoElement = new InfoView();
  #pointPresenter = null;
  #eventsSortElement = null;
  #filterPresenter = null;
  #addNewPointElement = null;
  #buttonPresenter = null;


  constructor(eventsElement, filtersElement, mainElement, pointModel, filterModel) {
    this.#eventsElement = eventsElement;
    this.#filtersElement = filtersElement;
    this.#mainElement = mainElement;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#pointModel.addObserver(this.#onModelDataChange);
    this.#filterModel.addObserver(this.#onModelDataChange);
  }

  get points() {
    this.#points = [...this.#pointModel.points];
    console.log(this.#points)
    const filteredPoints = filter[this.#filterModel.currentFilter](this.#points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return sortPrice(filteredPoints);

      case SortType.TIME:
        return sortTime(filteredPoints);

      case SortType.DAY:
        return sortDay(filteredPoints);
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
    this.#typesOfPoints = [...this.#pointModel.typesOfPoints]; // приходится заводит ьгеттер?
    return this.#typesOfPoints;
  }

  get currentFilter() {
    return this.#filterModel.currentFilter;
  }

  init() {
    this.#renderInfo();
    this.#renderfilter();
    this.#renderButton();
  }

  #onPointDataChange = (actionType, updateType, data) => {
    switch(actionType) {
      case UserAction.ADD_TASK:
        this.#pointModel.addPoint(updateType, data);
        break;
      case UserAction.UPDATE_TASK:
        this.#pointModel.updatePoint(updateType, data);
        break;
      case UserAction.DELETE_TASK:
        this.#pointModel.deletePoint(updateType, data);
        break;
    }
  };

  #onModelDataChange = (updateType, data) => {
    switch(updateType) {
      case UpdatePoint.INIT:
        this.#isLoading = false;
        remove(this.#loadingElement);
        this.#renderBoard({resetSort: true});
        break;
      case UpdatePoint.LARGE:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard({resetSort: true});
        break;
      case UpdatePoint.MEDIUM:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdatePoint.LOW:
        this.#pointsPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
    }
  };

  #renderPoint(point) {
    this.#pointPresenter = new PointPresenter(this.#eventsListElement, this.#onPointDataChange, this.#onModeChange, this.typesOfPoints);
    this.#pointPresenter.init(point, this.destinations, this.offers);
    this.#pointsPresenter.set(point.id, this.#pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #clearBoard(resetSortType) {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
      remove(this.#eventsSortElement);
    }
    if (this.#eventMessageElement) {
      remove(this.#eventMessageElement);
    }
    if (this.loadingElement) {
      remove(this.loadingElement);
    }
    this.#destroyNewPoint();
  }

  #renderBoard(resetSort) {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    if (!this.points.length) {
      this.#renderMessage();
      remove(this.#eventsSortElement);
      return;
    }

    if (resetSort) {
      this.#renderSort();
    }

    this.#renderPoints();
    render(this.#eventsListElement, this.#eventsElement);
  }

  #renderSort() {
    this.#eventsSortElement = new PointsSortView(SortType, this.#onSortChange, this.#currentSortType);
    render(this.#eventsSortElement, this.#eventsElement);
  }

  #onSortChange = (target) => {
    if (target === this.#currentSortType) {
      return;
    }
    this.#currentSortType = target;
    this.#clearBoard();
    this.#renderBoard();
  };

  #onModeChange = () => {
    if (this.#addNewPointElement) {
      this.#addNewPointElement.destroy();
    }
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderMessage() {
    this.#eventMessageElement = new EventsMessage(this.currentFilter, this.#points.length);
    render(this.#eventMessageElement, this.#eventsElement);
  }

  #renderInfo() {
    render(this.#eventsInfoElement, this.#mainElement, RenderPosition.AFTERBEGIN);
  }

  #renderButton() {
    this.#buttonPresenter = new ButtonView(this.#onCreateButtonClick);
    render(this.#buttonPresenter, this.#mainElement);
  }

  #onCreateButtonClick = () => {
    this.#renderNewPoint();
  };

  #renderNewPoint() {
    this.#addNewPointElement = new AddPointPresenter(this.#eventsListElement, this.#destinations, this.#offers, this.typesOfPoints, this.#onPointDataChange, this.#destroyNewPoint);
    this.#addNewPointElement.init();

    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdatePoint.LARGE, FilterType.EVERYTHING);
    this.#buttonPresenter.element.disabled = true;
  }

  #destroyNewPoint = () => {
    this.#buttonPresenter.element.disabled = false;
  };

  #renderLoading() {
    this.#loadingElement = new LoadingPresenter();
    render(this.#loadingElement, this.#eventsElement);
  }

  #renderfilter() {
    this.#filterPresenter = new FilterPresenter(this.#filtersElement, this.#filterModel, this.#pointModel);
    this.#filterPresenter.init();
  }
}
