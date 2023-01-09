import { render } from '../framework/render';
import EventsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import PointView from '../view/main-views/point-view';
import EditPointView from '../view/main-views/edit-point-view';
import { getRandomArrayElement, isEscapeKey } from '../utils/utils';
import EventsMessage from '../view/main-views/message-view';
import { SORT_TYPE } from '../utils/const';

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

    this.#renderEvents(this.#points);
  }

  #renderPoint(point, destination, offers) {
    const pointComponent = new PointView(
      point,
      destination,
      offers,
      {
        onButtonClick: () => {
          replacePointToForm.call(this);
          document.addEventListener('keydown', onEscKeydown);
        }
      });
    const pointEditComponent = new EditPointView(point,
      destination,
      offers,
      {
        onButtonClick: () => {
          replacePointToCard.call(this);
          document.removeEventListener('keydown', onEscKeydown);
        },
        onFormSubmit: (evt) => {
          evt.preventDefault();
          replacePointToCard.call(this);
          document.removeEventListener('keydown', onEscKeydown);
        }
      });

    function replacePointToForm() {
      this.#eventsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    }

    function replacePointToCard() {
      this.#eventsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    }

    function onEscKeydown(evt) {
      if(isEscapeKey(evt)) {
        evt.preventDefault();
        replacePointToCard.call(this);
        document.removeEventListener('keydown', onEscKeydown);
      }
    }

    render(pointComponent, this.#eventsListComponent.element);
  }

  #renderEvents(points) {
    const randomPoint = () => getRandomArrayElement(points);
    const getDestination = (point) => this.#destinations.find((item) => item.id === point.destination ? item.id === point.destination : '');
    const getOffer = (point) => this.#offers.find((item) => item.type === point.type ? item.type === point.type : '');

    if (points.length <= 0) {
      render (new EventsMessage(), this.#eventsElement);
      return;
    }
    render(new EventsSortView(SORT_TYPE), this.#eventsElement);
    render(this.#eventsListComponent, this.#eventsElement);
    for (let i = 0; i < points.length; i++) {
      this.#renderPoint(points[i], getDestination(points[i]), getOffer(randomPoint()));
    }
  }
}
