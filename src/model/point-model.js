
import Observable from '../framework/observable';
import { TYPES_OF_POINT_EVENT, UpdatePoint } from '../utils/const';

export default class PointModel extends Observable {

  #pointsApiService = null;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;

    // this.#pointsApiService.destinations.then((points) => console.log(points.map((point) => point)));
  }

  #points = [];
  #destinations = [];
  #offers = [];
  #types = [];

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }

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

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_from'],
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
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
