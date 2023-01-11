import { remove, render, replace } from '../framework/render';
import PointView from '../view/main-views/point-view';
import EditPointView from '../view/main-views/edit-point-view';
import { isEscapeKey } from '../utils/utils';
export default class PointPresenter {

  #eventsListElement = null;
  #onPointChange = null;
  #pointElement = null;
  #pointEditElement = null;
  #point = null;

  constructor(eventsListElement, onPointChange) {
    this.#eventsListElement = eventsListElement;
    this.#onPointChange = onPointChange;
  }

  init(point, destination, offers) {
    this.#point = point;
    const prevPointElement = this.#pointElement;
    const prevPointEditElement = this.#pointEditElement;

    this.#pointElement = new PointView(
      this.#point,
      destination,
      offers,
      {
        onButtonClick: () => {
          this.#replacePointToForm();
          document.addEventListener('keydown', this.#onEscKeydown);
        }
      },
      {
        onFavoriteClick: () => {
          this.#onFavoritClick();
        }
      }
    );

    this.#pointEditElement = new EditPointView(
      this.#point,
      destination,
      offers,
      {
        onButtonClick: () => {
          this.#replacePointToCard();
          document.removeEventListener('keydown', this.#onEscKeydown);
        },
        onFormSubmit() {
          this.#replacePointToCard();
          document.removeEventListener('keydown', this.#onEscKeydown);
        }
      });

    if (prevPointElement === null || prevPointEditElement === null) {
      render(this.#pointElement, this.#eventsListElement.element);
      return;
    }

    if (this.#eventsListElement.element.contains(prevPointElement.element)) {
      replace(this.#pointElement, prevPointElement);
    }

    if (this.#eventsListElement.element.contains(prevPointEditElement.element)) {
      replace(this.#pointEditElement, prevPointEditElement);
    }

    remove(prevPointElement);
    remove(prevPointEditElement);
  }

  destroy() {
    remove(this.#pointElement);
    remove(this.#pointEditElement);
  }

  #onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      this.#replacePointToCard();
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditElement, this.#pointElement);
  }

  #replacePointToCard() {
    replace(this.#pointElement, this.#pointEditElement);
  }

  #onFavoritClick = () => {
    this.#onPointChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
