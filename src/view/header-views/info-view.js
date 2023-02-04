import AbstractView from '../../framework/view/abstract-view';
import { DateFormat, humanizeDate } from '../../utils/date';
import { sortDay } from '../../utils/sort';
import { getDestination } from '../../utils/utils';

const createInfoTemplate = (points, pointDestinations, pointsOffers, updatePoint) => {

  if (updatePoint) {
    points = points.map((point) => point.id === updatePoint.id ? updatePoint : point);
  }
  const filteredPoints = points.sort(sortDay);

  const createInfoDestinationsELement = () => {

    let citiesInfoElement = null;

    switch(filteredPoints.length) {
      case 0:
        citiesInfoElement = '<h1 class="trip-info__title"</h1>';
        break;
      case 1:
        citiesInfoElement = `<h1 class="trip-info__title">${getDestination(filteredPoints[0], pointDestinations).name}</h1>`;
        break;
      case 2:
        citiesInfoElement = `<h1 class="trip-info__title">${getDestination(filteredPoints[0], pointDestinations).name} &mdash; ${getDestination(filteredPoints[1], pointDestinations).name}</h1>`;
        break;
      case 3:
        citiesInfoElement = `<h1 class="trip-info__title">${getDestination(filteredPoints[0], pointDestinations).name} &mdash; ${getDestination(filteredPoints[1], pointDestinations).name} &mdash; ${getDestination(filteredPoints[2], pointDestinations).name}</h1>`;
        break;
      default:
        citiesInfoElement = `<h1 class="trip-info__title">${getDestination(filteredPoints[0], pointDestinations).name} &mdash; ... &mdash; ${getDestination(filteredPoints[filteredPoints.length - 1], pointDestinations).name}</h1>`;
    }
    return citiesInfoElement;
  };

  const createInfoDatesElement = () => {

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

  const createTotalCostElement = () => {

    let totalPrice = 0;

    filteredPoints.forEach((point) => {
      totalPrice += point.basePrice;

      const pointTypeOffer = pointsOffers.find((offer) => offer.type === point.type);
      const selectedOffers = pointTypeOffer.offers.filter((offer) => point.offers.includes(offer.id));

      selectedOffers.forEach((offer) => {
        totalPrice += offer.price;
      });
    });

    return `<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span></p>`;
  };

  // const createTotalCostElementV2 = () => {

  //   const getPointsSumPrice = () => {
  //     const priceElements = document.querySelectorAll('.event__price-value');
  //     let priceSum = 0;
  //     for (const priceElement of priceElements) {
  //       priceSum += Number(priceElement.textContent);
  //     }
  //     return priceSum;
  //   };

  //   const getPointsSumOffers = () => {
  //     const offerElements = document.querySelectorAll('.event__offer .event__offer-price');
  //     let offersSum = 0;
  //     for (const offerElement of offerElements) {
  //       offersSum += Number(offerElement.textContent);
  //     }
  //     return offersSum;
  //   };

  //   let costInfoElement = null;

  //   switch (filteredPoints.length) {
  //     case 0:
  //       costInfoElement = '<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span></p>';
  //       break;
  //     default:
  //       costInfoElement = `<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${getPointsSumPrice() + getPointsSumOffers()} </span></p>`;
  //   }
  //   return costInfoElement;
  // };

  const infoDestinationsElement = createInfoDestinationsELement();
  const infoDatesElement = createInfoDatesElement();
  const totalCostElement = createTotalCostElement();

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      ${infoDestinationsElement}
      ${infoDatesElement}
    </div>
    ${totalCostElement}
  </section>`;
};

export default class InfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;
  #updatePoint = null;

  constructor(points,destinations, offers, updatePoint) {
    super();

    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#updatePoint = updatePoint;
  }

  get template() {
    return createInfoTemplate(this.#points, this.#destinations, this.#offers, this.#updatePoint);
  }
}
