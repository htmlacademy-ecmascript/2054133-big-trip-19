import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/header-views/info-view';
import FiltersView from '../view/header-views/filters-view';
import EventsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import EventsMessage from '../view/main-views/message-view';
import { TYPES_OF_SORT } from '../utils/const';
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
    const getDestination = (point) => this.#destinations.find((item) => item.id === point.destination ? item.id === point.destination : '');
    const getOffer = (point) => this.#offers.find((item) => item.type === point.type ? item.type === point.type : '');

    if (!points.length) {
      this.#renderMessage();
      return;
    }

    for (const point of points) {
      new PointPresenter(this.#eventsListElement).init(point, getDestination(point), getOffer(point));
    }
  }

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
