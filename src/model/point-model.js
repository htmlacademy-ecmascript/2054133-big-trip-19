import { generatePoint, Destinations, Offers } from '../mock/data';

const POINTS_COUNT = 2;

export default class PointModel {
  #points = null;
  #destinations = null;
  #offers = null;

  init() {
    this.#points = Array.from({length: POINTS_COUNT}, generatePoint);
    this.#destinations = Destinations;
    this.#offers = Offers;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }
}
