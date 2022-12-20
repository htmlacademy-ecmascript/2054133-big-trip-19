import { createElement } from '../../render';

function createTripListItemTemplate () {
  return (
    `<li class="trip-events__item">
  </li>`
  );
}

export default class TripListItem {
  #element = null;

  get template() {
    return createTripListItemTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
