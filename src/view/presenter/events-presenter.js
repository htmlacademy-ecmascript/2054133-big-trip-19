import {render} from '../../render.js';
import EventsSort from '../../view/main-views/sort-view.js';
import EventsList from '../../view/main-views/list-view.js';
import Point from '../../view/main-views/point.js';
import CreatePoint from '../../view/main-views/create-point-view.js';
import CreatePointOffers from '../main-views/create-point-offers-view.js';
import CreatePointDestination from '../main-views/create-point-destination-view.js';
import EditPoint from '../../view/main-views/edit-point-view.js';

export default class EventsPresenter {
  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new EventsSort(), this.eventsContainer);
    render(new EventsList(), this.eventsContainer);
    const listElement = document.querySelector('.trip-events__list');
    render(new EditPoint(), listElement);
    for (let i = 0; i < 3; i++) {
      render(new Point(), listElement);
    }
    render(new CreatePoint(), listElement);
    render(new CreatePointOffers(), listElement);
    render(new CreatePointDestination(), listElement);
  }
}
