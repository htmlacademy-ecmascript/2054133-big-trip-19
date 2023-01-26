import { remove, render, RenderPosition } from '../framework/render';
import InfoView from '../view/header-views/info-view';
import FiltersView from '../view/header-views/filters-view';
import PointsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import EventsMessage from '../view/main-views/message-view';
import { generateFilter } from '../mock/filter';
import PointPresenter from './point-presenter';
import { SortType, UpdatePoint, UserAction } from '../utils/const';
import { sortDay, sortPrice, sortTime, defaultSort } from '../utils/sort';

export default class EventsPresenter {

  #eventsElement = null;
  #pointModel = null;
  #mainElement = null;
  #filtersElement = null;

  #destinations = [];
  #offers = [];
  #typesOfPoints = null;

  #currentSortType = null;

  #pointsPresenter = new Map();

  #eventsListElement = new EventsListView();
  #eventMessageElement = new EventsMessage();
  #eventsInfoElement = new InfoView();
  #pointPresenter = null;
  #eventsSortElement = null;

  constructor(eventsElement, mainElement, filtersElement, pointModel) {
    this.#eventsElement = eventsElement;
    this.#mainElement = mainElement;
    this.#filtersElement = filtersElement;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#onModelDataChange);
  }

  get points() {
    const defaultPointsSort = defaultSort([...this.#pointModel.points]);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return sortPrice([...this.#pointModel.points]);

      case SortType.TIME:
        return sortTime([...this.#pointModel.points]);

      case SortType.DAY:
        return sortDay([...this.#pointModel.points]);
    }

    return defaultPointsSort;
  }

  init() {
    this.#destinations = [...this.#pointModel.destinations];
    this.#offers = [...this.#pointModel.offers];
    this.#typesOfPoints = [...this.#pointModel.typesOfPoints];

    this.#renderInfo();
    this.#renderFilter();
    this.#renderSort();
    this.#renderBoard();
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
      case UpdatePoint.LARGE:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard({resetSort: true});
        break;
      case UpdatePoint.MEDIUM:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdatePoint.LOW:
        this.#pointsPresenter.get(data.id).init(data, this.#destinations, this.#offers);
        break;
    }
  };

  #renderPoint(point) {
    this.#pointPresenter = new PointPresenter(this.#eventsListElement, this.#onPointDataChange, this.#onModeChange, this.#typesOfPoints);
    this.#pointPresenter.init(point, this.#destinations, this.#offers);
    this.#pointsPresenter.set(point.id, this.#pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #clearBoard(resetSortType) {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();

    if (resetSortType) {
      this.#currentSortType = null;
      remove(this.#eventsSortElement);
    }
  }

  #renderBoard(resetSort) {
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
    this.#eventsSortElement = new PointsSortView(SortType, this.#onSortChange);
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
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderFilter() {
    const eventFilterElement = new FiltersView(generateFilter(this.points));
    render(eventFilterElement, this.#filtersElement);
  }

  #renderMessage() {
    render(this.#eventMessageElement, this.#eventsElement);
  }

  #renderInfo() {
    render(this.#eventsInfoElement, this.#mainElement, RenderPosition.AFTERBEGIN);
  }
}
