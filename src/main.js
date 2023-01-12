import PointModel from './model/point-model';
import EventsPresenter from './presenter/app-presenter';

const mainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointModel = new PointModel();
const eventsPresenter = new EventsPresenter(eventsElement, mainElement, filtersElement, pointModel);

pointModel.init();
eventsPresenter.init();
