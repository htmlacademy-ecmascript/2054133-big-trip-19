import { renderPoint, Destinations, Offers } from '../mock/data';

const POINTS_COUNT = 10;

export default class PointModel {
  events = Array.from({length: POINTS_COUNT}, renderPoint);
  destinations = Destinations;
  offers = Offers;

  getEvent() {
    return this.events;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
