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

    let result = '<h1 class="trip-info__title">';

    if (filteredPoints.length <= 3) {
      filteredPoints.forEach((point, index) => {
        if (index < 1) {
          result += `${getDestination(point, pointDestinations).name}`;
        }
        if (index > 0) {
          result += ' &mdash; ';
          result += `${getDestination(point, pointDestinations).name}`;
        }
      });
    }
    if (filteredPoints.length > 3) {
      result += `${getDestination(filteredPoints[0], pointDestinations).name} &mdash; ... &mdash; ${getDestination(filteredPoints[filteredPoints.length - 1], pointDestinations).name}`;
    }

    result += '</h1>';
    return result;
  };

  const createInfoDatesElement = () => {

    let result = '<p class="trip-info__dates">';

    if (filteredPoints.length > 0) {
      result += `${humanizeDate(filteredPoints[0].dateFrom, DateFormat.DATE)}&nbsp;&mdash;&nbsp;${humanizeDate(filteredPoints[filteredPoints.length - 1].dateTo, DateFormat.DATE)}`;
    }

    result += '</p>';
    return result;
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
