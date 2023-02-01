
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

    try {
      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations.map((destination) => destination);
    } catch(err) {
      this.#destinations = [];
    }

    try {
      const offers = await this.#pointsApiService.offers;
      this.#offers = offers.map((offer) => offer);
    } catch(err) {
      this.#offers = [];
    }

    this.#types = TYPES_OF_POINT_EVENT;

    this._notify(UpdatePoint.INIT);

  }

  updatePoint(updateType, update) {
    if (!update.id) {
      throw new Error('Can\'t update unexisting point');
    }
    this.#pointsApiService.updatePoint(update);

    this.#points = this.#points.map((point) => point.id === update.id ? update : point);

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points.push(update);

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    if (!update.id) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = this.#points.filter((point) => point.id !== update.id);

    this._notify(updateType, update);
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
