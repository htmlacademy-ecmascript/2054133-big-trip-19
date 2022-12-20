import { createElement } from '../../render';

function createEventsMessageTemplate () {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
}

export default class EventsMessage {
  #element = null;

  get template() {
    return createEventsMessageTemplate();
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
