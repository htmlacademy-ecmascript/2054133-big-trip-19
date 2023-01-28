import AbstractView from '../../framework/view/abstract-view';
import { NoPointsMessage } from '../../utils/const';

function createEventsMessageTemplate (currentSortType, pointsLength) {

  let textMessage = NoPointsMessage[currentSortType];

  if (!pointsLength) {
    textMessage = Object.values(NoPointsMessage)[0];
  }
  return `<p class="trip-events__msg">
    ${textMessage}
  </p>`;
}

export default class EventsMessage extends AbstractView {

  #currentSortType = null;
  #pointsLength = null;

  constructor(currentSortType, pointsLength) {
    super();
    this.#currentSortType = currentSortType;
    this.#pointsLength = pointsLength;
  }

  get template() {
    return createEventsMessageTemplate(this.#currentSortType, this.#pointsLength);
  }
}
