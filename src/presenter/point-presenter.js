import { remove, render, replace } from '../framework/render';
import PointView from '../view/main-views/point-view';
import EditPointView from '../view/main-views/edit-point-view';
import { isEscapeKey } from '../utils/utils';
import { UpdatePoint, UserAction } from '../utils/const';

const PointMode = {
  DEFAULT: 'DEFALUT',
  EDITING: 'EDITING'
};

export default class PointPresenter {

  #eventsListElement = null;
  #onPointDataChange = null;
  #onModeChange = null;

  #point = null;
  #destination = null;
  #offers = null;
  #types = null;

  #pointElement = null;
  #pointEditElement = null;

  #pointMode = PointMode.DEFAULT;

  constructor(eventsListElement, onPointDataChange, onModeChange, typesOfPoints) {
    this.#eventsListElement = eventsListElement;
    this.#onPointDataChange = onPointDataChange;
    this.#onModeChange = onModeChange;
    this.#types = typesOfPoints;
  }

  init(point, destination, offers) {
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;

    const prevPointElement = this.#pointElement;
    const prevPointEditElement = this.#pointEditElement;

    this.#pointElement = new PointView (
      this.#point,
      this.#destination,
      this.#offers,
      this.#onFavoritClick,
      {
        onButtonClick: () => this.#replacePointToForm(),
      }
    );

    this.#pointEditElement = new EditPointView (
      UserAction.UPDATE_TASK,
      this.#point,
      this.#destination,
      this.#offers,
      this.#types,
      this.#onFormSubmit,
      this.#onPointDelete,
      this.#onArrowClick,
    );

    if (!prevPointElement || !prevPointEditElement) {
      render(this.#pointElement, this.#eventsListElement.element);
      return;
    }

    if (this.#pointMode === PointMode.DEFAULT) {
      replace(this.#pointElement, prevPointElement);
    }

    if (this.#pointMode === PointMode.EDITING) {
      replace(this.#pointEditElement, prevPointEditElement);
    }

    remove(prevPointElement);
    remove(prevPointEditElement);
  }

  #onArrowClick = () => {
    this.#pointEditElement.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #onPointDelete = () => {
    this.#onPointDataChange(
      UserAction.DELETE_TASK,
      UpdatePoint.MEDIUM,
      this.#point
    );
  };

  #onFormSubmit = (point) => {
    const howUpdatePoint = point.dateFrom === this.#point.dateFrom ? UpdatePoint.LOW : UpdatePoint.MEDIUM;
    this.#onPointDataChange(
      UserAction.UPDATE_TASK,
      howUpdatePoint,
      {
        ...this.#point,
        type: point.type,
        destination: point.destination,
        dateFrom: point.dateFrom,
        dateTo: point.dateTo,
        basePrice: point.basePrice,
        offers: point.offers
      }
    );
    this.#replaceFormToPoint();
  };

  #onFavoritClick = () => {
    this.#onPointDataChange(
      UserAction.UPDATE_TASK,
      UpdatePoint.LOW,
      {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#pointEditElement.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditElement, this.#pointElement);
    this.#onModeChange();
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#pointMode = PointMode.EDITING;
  };

  #replaceFormToPoint() {
    replace(this.#pointElement, this.#pointEditElement);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#pointMode = PointMode.DEFAULT;
  }

  resetView() {
    if (this.#pointMode !== PointMode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointElement);
    remove(this.#pointEditElement);
    this.#pointElement = null;
    this.#pointEditElement = null;
  }
}
