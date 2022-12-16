import { generatePoint, Destinations, Offers } from '../mock/data';

const POINTS_COUNT = 10;

export default class PointModel {
  init() {
    this.events = Array.from({length: POINTS_COUNT}, generatePoint);
    this.destinations = Destinations;
    this.offers = Offers;
  }

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
