import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/header-views/info-view';
import FiltersView from '../view/header-views/filters-view';
import EventsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import EventsMessage from '../view/main-views/message-view';
import { updateItem } from '../utils/utils';
import { generateFilter } from '../mock/filter';
import PointPresenter from './point-presenter';
import { SortType } from '../utils/const';
import { sortDay, sortPrice, sortTime, defaultSort } from '../utils/sort';

export default class EventsPresenter {

  #eventsElement = null;
  #pointModel = null;
  #mainElement = null;
  #filtersElement = null;

  #points = [];
  #destinations = [];
  #offers = [];
  #typesOfPoints = null;

  #currentSortType = null;
  #defaultPointSort = [];

  #pointsPresenter = new Map();

  #eventsListElement = new EventsListView();
  #eventMessageElement = new EventsMessage();
  #eventsInfoElement = new InfoView();

  constructor(eventsElement, mainElement, filtersElement, pointModel) {
    this.#eventsElement = eventsElement;
    this.#mainElement = mainElement;
    this.#filtersElement = filtersElement;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = defaultSort([...this.#pointModel.points]);
    this.#destinations = [...this.#pointModel.destinations];
    this.#offers = [...this.#pointModel.offers];
    this.#typesOfPoints = [...this.#pointModel.typesOfPoints];

    this.#defaultPointSort = defaultSort([...this.#pointModel.points]);

    this.#renderInfo();
    this.#renderFilter();
    this.#renderSort();
    this.#renderPointsList();
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(this.#eventsListElement, this.#onPointChange, this.#onModeChange, this.#typesOfPoints);
    pointPresenter.init(point, this.#destinations, this.#offers);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #onPointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#defaultPointSort = updateItem(this.#defaultPointSort, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#offers);
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
    this.#sortPoints(target);
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #sortPoints(target) {
    switch (target) {
      case SortType.PRICE:
        sortPrice(this.#points);
        break;

      case SortType.TIME:
        sortTime(this.#points);
        break;

      case SortType.DAY:
        sortDay(this.#points);
        break;

      default:
        this.#points = this.#defaultPointSort;
    }
    this.#currentSortType = target;
  }

  #renderPointsList() {
    render(this.#eventsListElement, this.#eventsElement);

    if (!this.#points.length) {
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
    const eventFilterElement = new FiltersView(generateFilter(this.#points));
    render(eventFilterElement, this.#filtersElement);
  }
}
