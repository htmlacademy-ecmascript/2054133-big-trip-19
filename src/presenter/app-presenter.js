import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/header-views/info-view';
import FiltersView from '../view/header-views/filters-view';
import EventsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import EventsMessage from '../view/main-views/message-view';
import { generateFilter } from '../mock/filter';
import PointPresenter from './point-presenter';
import { SortType } from '../utils/const';
import { sortDay, sortPrice, sortTime, defaultSort } from '../utils/sort';
import Observable from '../framework/observable';

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

  constructor(eventsElement, mainElement, filtersElement, pointModel) {
    this.#eventsElement = eventsElement;
    this.#mainElement = mainElement;
    this.#filtersElement = filtersElement;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#onModelEvent);
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
    this.#renderPointsList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#eventsListElement, this.#onViewAction, this.#onModeChange, this.#typesOfPoints);
    pointPresenter.init(point, this.#destinations, this.#offers);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #onViewAction = (updateType, data) => {
    console.log(updateType, data);
  };

  #onModelEvent = (updateType, data) => {
    console.log(updateType, data);
  };

  #onModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderMessage() {
    render(this.#eventMessageElement, this.#eventsElement);
  }

  #renderSort() {
    const eventsSortElement = new EventsSortView(SortType, this.#onSortChange);
    render(eventsSortElement, this.#eventsElement);
  }

  #onSortChange = (target) => {
    if (target === this.#currentSortType) {
      return;
    }
    this.#currentSortType = target;
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderPointsList() {
    render(this.#eventsListElement, this.#eventsElement);

    if (!this.points.length) {
      this.#renderMessage();
      return;
    }
    this.#renderPoints();
  }

  #clearPointsList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }

  #renderInfo() {
    render(this.#eventsInfoElement, this.#mainElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilter() {
    const eventFilterElement = new FiltersView(generateFilter(this.points));
    render(eventFilterElement, this.#filtersElement);
  }
}
