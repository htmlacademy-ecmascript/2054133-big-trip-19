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
  #eventsElement = null;
  #pointModel = null;

  #points = [];
  #destinations = [];
  #offers = [];

  #eventsListComponent = new EventsListView();

  constructor(eventsElement, pointModel) {
    this.#eventsElement = eventsElement;
    this.#pointModel = pointModel;
  }

  init() {
    this.#points = [...this.#pointModel.points];
    this.#destinations = [...this.#pointModel.destinations];
    this.#offers = [...this.#pointModel.offers];

    const randomPoint = getRandomArrayElement(this.#points);
    const getDestination = (point) => this.#destinations.find((item) => item.id === point.destination);
    const getOffer = (point) => this.#offers.find((item) => item.type === point.type);

    render(new EventsSortView(), this.#eventsElement);
    render(this.#eventsListComponent, this.#eventsElement);
    // render(new EditPointView(randomPoint, getDestination(randomPoint), getOffer(randomPoint)), eventslistElement);
    for (let i = 0; i < POINT_VIEW_COUNT; i++) {
      this.#renderPoint(this.#points[i], getDestination(this.#points[i]), getOffer(randomPoint));
    }
    render(new CreatePointView(), this.#eventsListComponent.element);
    render(new CreatePointOffersView(), this.#eventsListComponent.element);
    render(new CreatePointDestinationView(), this.#eventsListComponent.element);
  }

  #renderPoint(point, destination, offers) {
    const pointComponent = new PointView(point, destination, offers);
    const pointEditComponent = new EditPointView(point, destination, offers);

    const replacePointToForm = () =>
      this.#eventsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);

    const replacePointToCard = () =>
      this.#eventsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => replacePointToForm());

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replacePointToCard();
    });
    render(pointComponent, this.#eventsListComponent.element);
  }
}
