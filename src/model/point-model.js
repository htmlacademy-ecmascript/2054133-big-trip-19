
import Observable from '../framework/observable';
import { TYPES_OF_POINT_EVENT, UpdatePoint } from '../utils/const';

export default class PointModel extends Observable {

  #pointsApiService = null;

  #points = [];
  #destinations = [];
  #offers = [];
  #types = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
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

  async init() {
    this.#points = await this.#pointsApiService.points();
    this.#destinations = await this.#pointsApiService.destinations();
    this.#offers = await this.#pointsApiService.offers();

    this.#types = TYPES_OF_POINT_EVENT;

    this._notify(UpdatePoint.INIT);
  }

  async updatePoint(updateType, update) {
    if (!update.id) {
      throw new Error('Can\'t update unexisting point');
    }
    try {
      const response = await this.#pointsApiService.updatePoint(update);

      this.#points = this.#points.map((point) => point.id === response.id ? response : point);

      this._notify(updateType, response);
    }
    catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);

      this.#points.push(response);

      this._notify(updateType, response);
    }
    catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, update) {
    if (!update.id) {
      throw new Error('Can\'t delete unexisting point');
    }
    try {
      await this.#pointsApiService.deletePoint(update);

      this.#points = this.#points.filter((point) => point.id !== update.id);

      this._notify(updateType);
    }
    catch(err) {
      throw new Error('Can/t delete point');
    }
  }
}
