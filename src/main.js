import PointModel from './model/point-model';
import HeaderPresenter from './presenter/header-presenter';
import EventsPresenter from './presenter/events-presenter';

const mainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const pointModel = new PointModel();
const headerPresenter = new HeaderPresenter(mainElement, filtersElement);
const eventsPresenter = new EventsPresenter(eventsElement, pointModel);

pointModel.init();
headerPresenter.init();
eventsPresenter.init();
