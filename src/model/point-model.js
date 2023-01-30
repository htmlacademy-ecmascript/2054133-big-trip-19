
import Observable from '../framework/observable';
import { generatePoint, Destinations, Offers } from '../mock/data';
import { TYPES_OF_POINT_EVENT } from '../utils/const';

const POINTS_COUNT = 1;

export default class PointModel extends Observable {
  #points = null;
  #destinations = null;
  #offers = null;
  #types = null;

  init() {
    this.#points = Array.from({length: POINTS_COUNT}, generatePoint);
    this.#destinations = Destinations;
    this.#offers = Offers;
    this.#types = TYPES_OF_POINT_EVENT;
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

  updatePoint(updateType, update) {
    // const index = this.#points.findIndex((task) => task.id === update.id);

    // if (index === -1) {
    //   throw new Error('Can\'t update unexisting point');
    // }

    // this.#points = [
    //   ...this.#points.slice(0, index),
    //   update,
    //   ...this.#points.slice(index + 1),
    // ];

    if (!update) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = this.#points.map((point) => point.id === update.id ? update : point);

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    // this.#points = [update, this.#points];

    this.#points.push(update);

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    // const index = this.#points.findIndex((task) => task.id === update.id);

    // if (index === -1) {
    //   throw new Error('Can\'t update unexisting point');
    // }

    // this.#points = [
    //   ...this.#points.slice(0, index),
    //   ...this.#points.slice(index + 1),
    // ];

    if (!update) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType, update);
  }
}
