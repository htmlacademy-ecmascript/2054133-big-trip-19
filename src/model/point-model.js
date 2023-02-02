
import Observable from '../framework/observable';
import { TYPES_OF_POINT_EVENT, UpdatePoint } from '../utils/const';

export default class PointModel extends Observable {

  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  #points = [];
  #destinations = [];
  #offers = [];
  #types = [];


  async init() {
    this.#points = await this.#pointsApiService.points();
    this.#destinations = await this.#pointsApiService.destinations();
    this.#offers = await this.#pointsApiService.offers();

    this.#types = TYPES_OF_POINT_EVENT;

    this._notify(UpdatePoint.INIT);

  }

  // updatePoint(updateType, update) {
  //   if (!update.id) {
  //     throw new Error('Can\'t update unexisting point');
  //   }
  //   this.#pointsApiService.updatePoint(update);

  //   this.#points = this.#points.map((point) => point.id === update.id ? update : point);

  //   this._notify(updateType, update);
  // }

  async updatePoint(updateType, update) {
    if (!update.id) {
      throw new Error('Can\'t update unexisting point');
    }
    try {
      this.#pointsApiService.updatePoint(update);

      this.#points = this.#points.map((point) => point.id === update.id ? update : point);

      this._notify(updateType, update);
    }
    catch(err) {
      throw new Error('Can/t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      this.#pointsApiService.addPoint(update);

      this.#points.push(update);

      this._notify(updateType, update);
    }
    catch(err) {
      throw new Error('Can/t add point');
    }
  }

  async deletePoint(updateType, update) {
    if (!update.id) {
      throw new Error('Can\'t delete unexisting point');
    }
    try {
      this.#pointsApiService.deletePoint(update);

      this.#points = this.#points.filter((point) => point.id !== update.id);

      this._notify(updateType);
    }
    catch(err) {
      throw new Error('Can/t delete point');
    }
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
