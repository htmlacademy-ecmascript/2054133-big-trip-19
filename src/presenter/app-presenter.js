import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/header-views/info-view';
import FiltersView from '../view/header-views/filters-view';
import EventsSortView from '../view/main-views/sort-view';
import EventsListView from '../view/main-views/list-view';
import PointView from '../view/main-views/point-view';
import EditPointView from '../view/main-views/edit-point-view';
import { getRandomArrayElement, isEscapeKey } from '../utils/utils';
import EventsMessage from '../view/main-views/message-view';
import { TYPES_OF_SORT } from '../utils/const';
import { generateFilter } from '../mock/filter';

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
    this.#renderPoints(this.#points);
  }

  #renderPoint(point, destination, offers) {
    const pointElement = new PointView(
      point,
      destination,
      offers,
      {
        onButtonClick: () => {
          replacePointToForm.call(this);
          document.addEventListener('keydown', onEscKeydown);
        }
      });
    const pointEditElement = new EditPointView(point,
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
      this.#eventsListElement.element.replaceChild(pointEditElement.element, pointElement.element);
    }

    function replacePointToCard() {
      this.#eventsListElement.element.replaceChild(pointElement.element, pointEditElement.element);
    }

    function onEscKeydown(evt) {
      if(isEscapeKey(evt)) {
        evt.preventDefault();
        replacePointToCard.call(this);
        document.removeEventListener('keydown', onEscKeydown);
      }
    }

    render(pointElement, this.#eventsListElement.element);
  }

  #renderPoints(points) {
    const randomPoint = () => getRandomArrayElement(points);
    const getDestination = (point) => this.#destinations.find((item) => item.id === point.destination ? item.id === point.destination : '');
    const getOffer = (point) => this.#offers.find((item) => item.type === point.type ? item.type === point.type : '');

    if (points.length <= 0) {
      this.#renderMessage();
      return;
    }
    this.#renderSort(TYPES_OF_SORT);
    this.#renderList();
    for (const point of points) {
      this.#renderPoint(point, getDestination(point), getOffer(randomPoint()));
    }
  }

  #renderMessage() {
    render(this.#eventMessageElement, this.#eventsElement);
  }

  #renderSort(sortTypes) {
    const eventsSortElement = new EventsSortView(sortTypes);
    render(eventsSortElement, this.#eventsElement);
  }

  #renderList() {
    render(this.#eventsListElement, this.#eventsElement);
  }

  #renderInfo() {
    render(this.#eventsInfoElement, this.#mainElement, RenderPosition.AFTERBEGIN);
  }

  #renderFilter(points) {
    const eventFilterElement = new FiltersView(generateFilter(points));
    render(eventFilterElement, this.#filtersElement);
  }
}
