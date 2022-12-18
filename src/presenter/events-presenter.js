import { render } from '../render';
import EventsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import PointView from '../view/main-views/point-view';
import CreatePointView from '../view/main-views/create-point-view';
import CreatePointOffersView from '../view/main-views/create-point-offers-view';
import CreatePointDestinationView from '../view/main-views/create-point-destination-view';
import EditPointView from '../view/main-views/edit-point-view';
import { getRandomArrayElement } from '../utils';

const POINT_VIEW_COUNT = 3;

export default class EventsPresenter {
  #eventsContainer = null;
  #pointModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  constructor(eventsContainer, pointModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#destinations = [...this.#pointModel.destinations];
    this.#offers = [...this.#pointModel.offers];

    const randomPoint = getRandomArrayElement(this.#points);
    const getDestination = (point) => this.#destinations.find((item) => item.id === point.destination);
    const getOffer = (point) => this.#offers.find((item) => item.type === point.type);

    render(new EventsSortView(), this.#eventsContainer);
    render(new EventsListView(), this.#eventsContainer);
    const listElement = document.querySelector('.trip-events__list');
    render(new EditPointView(randomPoint, getDestination(randomPoint), getOffer(randomPoint)), listElement);
    for (let i = 0; i < POINT_VIEW_COUNT; i++) {
      render(new PointView(this.#points[i], getDestination(this.#points[i])), listElement);
    }
    render(new CreatePointView(), listElement);
    render(new CreatePointOffersView(), listElement);
    render(new CreatePointDestinationView(), listElement);
  }
}
