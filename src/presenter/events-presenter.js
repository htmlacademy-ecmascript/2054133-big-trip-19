import { render } from '../framework/render';
import EventsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import PointView from '../view/main-views/point-view';
import EditPointView from '../view/main-views/edit-point-view';
import { getRandomArrayElement, isEscapeKey } from '../utils';
import EventsMessage from '../view/main-views/message-view';

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

    this.#renderEvents();
  }

  #renderPoint(point, destination, offers) {
    const pointComponent = new PointView(point, destination, offers);
    const pointEditComponent = new EditPointView(point, destination, offers);

    const replacePointToForm = () =>
      this.#eventsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);

    const replacePointToCard = () =>
      this.#eventsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);

    const onEscKeydown = (evt) => {
      if(isEscapeKey(evt)) {
        evt.preventDefault();
        replacePointToCard();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeydown);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToCard();
      document.removeEventListener('keydown', onEscKeydown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replacePointToCard();
      document.removeEventListener('keydown', onEscKeydown);
    });

    render(pointComponent, this.#eventsListComponent.element);
  }

  #renderEvents() {
    const randomPoint = getRandomArrayElement(this.#points);
    const getDestination = (point) => this.#destinations.find((item) => item.id === point.destination ? item.id === point.destination : '');
    const getOffer = (point) => this.#offers.find((item) => item.type === point.type ? item.type === point.type : '');

    if (this.#points.length <= 0) {
      render (new EventsMessage(), this.#eventsElement);
      return;
    }

    render(new EventsSortView(), this.#eventsElement);
    render(this.#eventsListComponent, this.#eventsElement);
    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], getDestination(this.#points[i]), getOffer(randomPoint));
    }
  }
}
