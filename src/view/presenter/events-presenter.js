import {render} from '../../render.js';
import EventsSortView from '../../view/main-views/sort-view.js';
import EventsListView from '../../view/main-views/list-view.js';
import PointView from '../../view/main-views/point.js';
import CreatePointView from '../../view/main-views/create-point-view.js';
import CreatePointOffersView from '../main-views/create-point-offers-view.js';
import CreatePointDestinationView from '../main-views/create-point-destination-view.js';
import EditPointView from '../../view/main-views/edit-point-view.js';

export default class EventsPresenter {
  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new EventsSortView(), this.eventsContainer);
    render(new EventsListView(), this.eventsContainer);
    const listElement = document.querySelector('.trip-events__list');
    render(new EditPointView(), listElement);
    for (let i = 0; i < 3; i++) {
      render(new PointView(), listElement);
    }
    render(new CreatePointView(), listElement);
    render(new CreatePointOffersView(), listElement);
    render(new CreatePointDestinationView(), listElement);
  }
}
