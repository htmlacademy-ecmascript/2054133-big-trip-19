import { generatePoint, Destinations, Offers } from '../mock/data';
import { TYPES_OF_POINT } from '../utils/const';

const POINTS_COUNT = 3;

export default class PointModel {
  #points = null;
  #destinations = null;
  #offers = null;
  #types = null;

  init() {
    this.#points = Array.from({length: POINTS_COUNT}, generatePoint);
    this.#destinations = Destinations;
    this.#offers = Offers;
    this.#types = TYPES_OF_POINT;
  }

  get typesOfPoints() {
    return this.#types;
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
