import AbstractView from '../../framework/view/abstract-view';


function createTripListItemTemplate () {
  return (
    `<li class="trip-events__item">
  </li>`
  );
}

export default class TripListItem extends AbstractView {
  get template() {
    return createTripListItemTemplate();
  }
}
