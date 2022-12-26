import AbstractView from '../../framework/view/abstract-view';

function createEventsMessageTemplate () {
  return (
    `<p class="trip-events__msg">
      Click New Event to create your first point
    </p>`
  );
}

export default class EventsMessage extends AbstractView {
  get template() {
    return createEventsMessageTemplate();
  }
}
