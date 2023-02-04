import AbstractView from '../../framework/view/abstract-view';
import { DateFormat, humanizeDate } from '../../utils/date';
import { sortDay } from '../../utils/sort';
import { getDestination } from '../../utils/utils';

const createInfoTemplate = (points, pointDestination) => {

  const filteredPoints = points.sort(sortDay);

  const getInfoDestinations = () => {

    let citiesInfoElement = null;

    switch(filteredPoints.length) {
      case 0:
        citiesInfoElement = '<h1 class="trip-info__title"</h1>';
        break;
      case 1:
        citiesInfoElement = `<h1 class="trip-info__title">${getDestination(filteredPoints[0], pointDestination).name}</h1>`;
        break;
      case 2:
        citiesInfoElement = `<h1 class="trip-info__title">${getDestination(filteredPoints[0], pointDestination).name} &mdash; ${getDestination(filteredPoints[1], pointDestination).name}</h1>`;
        break;
      case 3:
        citiesInfoElement = `<h1 class="trip-info__title">${getDestination(filteredPoints[0], pointDestination).name} &mdash; ${getDestination(filteredPoints[1], pointDestination).name} &mdash; ${getDestination(filteredPoints[2], pointDestination).name}</h1>`;
        break;
      default:
        citiesInfoElement = `<h1 class="trip-info__title">${getDestination(filteredPoints[0], pointDestination).name} &mdash; ... &mdash; ${getDestination(filteredPoints[filteredPoints.length - 1], pointDestination).name}</h1>`;
    }
    return citiesInfoElement;
  };

  const getInfoDates = () => {

    let datesInfoElement = null;

    switch (filteredPoints.length) {
      case 0:
        datesInfoElement = '<p class="trip-info__dates"></p>';
        break;
      case 1:
        datesInfoElement = `<p class="trip-info__dates">${humanizeDate(filteredPoints[0].dateFrom, DateFormat.DATE)}</p>`;
        break;
      default:
        datesInfoElement = `<p class="trip-info__dates">${humanizeDate(filteredPoints[0].dateFrom, DateFormat.DATE)}&nbsp;&mdash;&nbsp;${humanizeDate(filteredPoints[filteredPoints.length - 1].dateTo, DateFormat.DATE)}</p>`;
    }
    return datesInfoElement;
  };

  const getTotalCost = () => {

    const getPointsSumPrice = () => {
      const prices = document.querySelectorAll('.event__price-value');
      let finalCost = 0;
      for (const price of prices) {
        finalCost += Number(price.textContent);
      }
      return finalCost;
    };

    const getPointsSumOffers = () => {
      const offers = document.querySelectorAll('.event__offer .event__offer-price');
      let finalCost = 0;
      for (const offer of offers) {
        finalCost += Number(offer.textContent);
      }
      return finalCost;
    };

    let costInfoElement = null;

    switch (filteredPoints.length) {
      case 0:
        costInfoElement = '<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span></p>';
        break;
      default:
        costInfoElement = `<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPointsSumPrice() + getPointsSumOffers()} </span></p>`;
    }
    return costInfoElement;
  };

  const infoDestinations = getInfoDestinations();
  const infoDates = getInfoDates();
  const totalCost = getTotalCost();

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${infoDestinations}
      ${infoDates}
    </div>
    ${totalCost}
  </section>`;
};

export default class InfoView extends AbstractView {
  #points = null;
  #destinations = null;

  constructor(points,destinations) {
    super();

    this.#points = points;
    this.#destinations = destinations;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#destinations);
  }
}
