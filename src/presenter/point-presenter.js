import { render } from '../framework/render';
import PointView from '../view/main-views/point-view';
import EditPointView from '../view/main-views/edit-point-view';
import { isEscapeKey } from '../utils/utils';
export default class PointPresenter {

  #point = null;
  #destination = null;
  #offers = null;

  #eventsListElement = null;

  constructor(eventsListElement) {
    this.#eventsListElement = eventsListElement;
  }

  init(point, destination, offers) {
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;

    this.#renderPoint(this.#point, this.#destination, this.#offers);
  }

  #renderPoint(point, destination, offers) {

    const onEscKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        replacePointToCard.call(this);
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

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
        onFormSubmit() {
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

    render(pointElement, this.#eventsListElement.element);
  }
}
