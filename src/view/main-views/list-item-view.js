import {createElement} from '../../render.js';

function createTripListItemTemplate () {
  return (
    `<li class="trip-events__item">
  </li>`
  );
}

export default class TripListItem {
  getTemplate() {
    return createTripListItemTemplate();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
