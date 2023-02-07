import FilterModel from './model/filter-model';
import PointModel from './model/point-model';
import AppPresenter from './presenter/app-presenter';
import PointsApiService from './presenter/points-api-service';
import { AUTHORIZATION, END_POINT } from './utils/network';

const mainElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventsElement = document.querySelector('.trip-events');

const filterModel = new FilterModel();
const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const appPresenter = new AppPresenter(eventsElement, filtersElement, mainElement, pointModel, filterModel);

pointModel.init().finally(() => {
  appPresenter.renderfilter();
});
appPresenter.init();
