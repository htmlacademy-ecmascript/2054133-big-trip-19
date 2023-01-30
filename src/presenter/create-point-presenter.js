import { nanoid } from 'nanoid';
import { remove, render, RenderPosition } from '../framework/render';
import { UpdatePoint, UserAction } from '../utils/const';
import { isEscapeKey } from '../utils/utils';
import EditPointView from '../view/main-views/edit-point-view';

export default class CreatePointPresenter {

  #createPointElement = null;
  #eventsListElement = null;
  #destinations = null;
  #offers = null;
  #typesOfPoints = null;
  #onPointDataChange = null;
  #destroyNewPoint = null;

  #blankPoint = null;

  constructor(eventsListElement, destinations, offers, typesOfPoints, onPointDataChange, destroyNewPoint) {
    this.#eventsListElement = eventsListElement;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#typesOfPoints = typesOfPoints;
    this.#onPointDataChange = onPointDataChange;
    this.#destroyNewPoint = destroyNewPoint;
  }

  init() {
    this.#createPointElement = new EditPointView (
      UserAction.ADD_TASK,
      this.#blankPoint,
      this.#destinations,
      this.#offers,
      this.#typesOfPoints,
      this.#onFormSubmit,
      this.#onPointDelete
    );
    render(this.#createPointElement, this.#eventsListElement.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  #onFormSubmit = (point) => {
    this.#onPointDataChange(
      UserAction.ADD_TASK,
      UpdatePoint.LARGE,
      {
        ...point,
        type: point.type,
        destination: point.destination,
        dateFrom: point.dateFrom,
        dateTo: point.dateTo,
        basePrice: point.basePrice,
        id: nanoid()
      }
    );

    this.destroy();
  };

  #onPointDelete = () => {
    this.destroy();
  };

  #onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      this.destroy();
    }
  };

  destroy() {
    if (!this.#createPointElement) {
      return;
    }

    remove(this.#createPointElement);
    this.#createPointElement = null;

    this.#destroyNewPoint();

    document.removeEventListener('keydown', this.#onEscKeydown);
  }
}
