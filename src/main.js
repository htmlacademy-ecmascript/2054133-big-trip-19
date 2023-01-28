import FilterModel from './model/filter-model';
import PointModel from './model/point-model';
import AppPresenter from './presenter/app-presenter';

const mainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const pointModel = new PointModel();
const appPresenter = new AppPresenter(eventsElement, filtersElement, mainElement, pointModel, filterModel);

pointModel.init();
appPresenter.init();
