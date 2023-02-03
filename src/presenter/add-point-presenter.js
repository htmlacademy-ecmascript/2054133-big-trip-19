import { remove, render, RenderPosition } from '../framework/render';
import { UpdatePoint, UserAction } from '../utils/const';
import { isEscapeKey } from '../utils/utils';
import EditPointView from '../view/main-views/edit-point-view';

export default class AddPointPresenter {

  #addPointElement = null;
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
    this.#addPointElement = new EditPointView (
      UserAction.ADD_POINT,
      this.#blankPoint,
      this.#destinations,
      this.#offers,
      this.#typesOfPoints,
      this.#onFormSubmit,
      this.#onCancelButton
    );
    render(this.#addPointElement, this.#eventsListElement.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  #onFormSubmit = (point) => {
    this.#onPointDataChange(
      UserAction.ADD_POINT,
      UpdatePoint.MEDIUM,
      point
    );
  };

  #onCancelButton = () => {
    this.destroy();
  };

  #onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      this.destroy();
    }
  };

  setSaving = () => {
    this.#addPointElement.updateElement({isSaving: true});
  };

  destroy() {
    if (!this.#addPointElement) {
      return;
    }

    remove(this.#addPointElement);
    this.#addPointElement = null;

    this.#destroyNewPoint();

    document.removeEventListener('keydown', this.#onEscKeydown);
  }
}
