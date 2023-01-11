import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/header-views/info-view';
import FiltersView from '../view/header-views/filters-view';
import EventsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import EventsMessage from '../view/main-views/message-view';
import { TYPES_OF_SORT } from '../utils/const';
import { updateItem, getDestination, getOffer } from '../utils/utils';
import { generateFilter } from '../mock/filter';
import PointPresenter from './point-presenter';

export default class EventsPresenter {
  #eventsElement = null;
  #pointModel = null;
  #mainElement = null;
  #filtersElement = null;

  #points = [];
  #destinations = [];
  #offers = [];

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
    this.#points = [...this.#pointModel.points];
    this.#destinations = [...this.#pointModel.destinations];
    this.#offers = [...this.#pointModel.offers];


    this.#renderInfo();
    this.#renderFilter(this.#points);
    this.#renderSort(TYPES_OF_SORT);
    this.#renderList(this.#points);
  }

  #renderPoints(points) {

    if (!points.length) {
      this.#renderMessage();
      return;
    }

    for (const point of points) {
      const pointPresenter = new PointPresenter(this.#eventsListElement, this.#onPointChange);
      this.#pointsPresenter.set(point.id, pointPresenter);

      pointPresenter.init(point, getDestination(point, this.#destinations), getOffer(point, this.#offers));
    }
  }

  #onPointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint, getDestination(updatedPoint, this.#destinations), getOffer(updatedPoint, this.#offers));
  };

  #renderMessage() {
    render(this.#eventMessageElement, this.#eventsElement);
  }

  #renderSort(sortTypes) {
    const eventsSortElement = new EventsSortView(sortTypes);
    render(eventsSortElement, this.#eventsElement);
  }

  #renderList(points) {
    render(this.#eventsListElement, this.#eventsElement);
    this.#renderPoints(points);
  }

  #renderInfo() {
    render(this.#eventsInfoElement, this.#mainElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilter(points) {
    const eventFilterElement = new FiltersView(generateFilter(points));
    render(eventFilterElement, this.#filtersElement);
  }
}
