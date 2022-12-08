import HeaderPresenter from './view/presenter/header-presenter.js';
import EventsPresenter from './view/presenter/events-presenter.js';

const mainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const headerPresenter = new HeaderPresenter({mainContainer: mainElement, filtersContainer: filtersElement});
const eventsPresenter = new EventsPresenter({eventsContainer: eventsElement});

headerPresenter.init();
eventsPresenter.init();
