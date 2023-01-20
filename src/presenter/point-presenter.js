import { remove, render, replace } from '../framework/render';
import PointView from '../view/main-views/point-view';
import EditPointView from '../view/main-views/edit-point-view';
import { isEscapeKey } from '../utils/utils';

const PointMode = {
  DEFAULT: 'DEFALUT',
  EDITING: 'EDITING'
};

export default class PointPresenter {

  #eventsListElement = null;
  #onPointChange = null;
  #onModeChange = null;

  #point = null;
  #destination = null;
  #offers = null;
  #types = null;

  #pointElement = null;
  #pointEditElement = null;

  #pointMode = PointMode.DEFAULT;

  constructor(eventsListElement, onPointChange, onModeChange, typesOfPoints) {
    this.#eventsListElement = eventsListElement;
    this.#onPointChange = onPointChange;
    this.#onModeChange = onModeChange;
    this.#types = typesOfPoints;
  }

  init(point, destination, offers) {
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;

    const prevPointElement = this.#pointElement;
    const prevPointEditElement = this.#pointEditElement;

    this.#pointElement = new PointView(
      this.#point,
      this.#destination,
      this.#offers,
      {
        onButtonClick: () => this.#replacePointToForm(),
        onFavoriteClick: () => this.#onFavoritClick()
      }
    );

    this.#pointEditElement = new EditPointView(
      this.#point,
      this.#destination,
      this.#offers,
      this.#types,
      {
        onButtonClick: () => {
          this.#pointEditElement.reset(this.#point);
          this.#replacePointToCard();
        },
        onFormSubmit: () => this.#replacePointToCard()
      });

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

  destroy() {
    remove(this.#pointElement);
    remove(this.#pointEditElement);
  }

  resetView() {
    if (this.#pointMode !== PointMode.DEFAULT) {
      this.#replacePointToCard();
    }
  }

  #replacePointToForm() {
    replace(this.#pointEditElement, this.#pointElement);
    this.#onModeChange();
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#pointMode = PointMode.EDITING;
  }

  #replacePointToCard() {
    replace(this.#pointElement, this.#pointEditElement);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#pointMode = PointMode.DEFAULT;
  }

  #onFavoritClick = () => {
    this.#onPointChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#pointEditElement.reset(this.#point);
      this.#replacePointToCard();
    }
  };
}
