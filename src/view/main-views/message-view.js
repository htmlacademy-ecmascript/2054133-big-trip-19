import {createElement} from '../../render.js';

function createEventsMessageTemplate () {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
}

export default class EventsMessage {
  getTemplate() {
    return createEventsMessageTemplate();
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
