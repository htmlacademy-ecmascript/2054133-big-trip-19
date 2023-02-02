import ApiService from '../framework/api-service';
import { Method } from '../utils/network';

export default class PointsApiService extends ApiService {
  #points = [];
  #destinations = [];
  #offers = [];

  async points() {
    try {
      const points = await this._load({url: 'points'}).then(ApiService.parseResponse);
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }
    return this.#points;
  }

  async destinations() {
    try {
      const destinations = await this._load({url: 'destinations'}).then(ApiService.parseResponse);
      this.#destinations = destinations.map((destination) => destination);
    } catch(err) {
      this.#destinations = [];
    }
    return this.#destinations;
  }

  async offers() {
    try {
      const offers = await this._load({url: 'offers'}).then(ApiService.parseResponse);
      this.#offers = offers.map((offer) => offer);
    } catch(err) {
      this.#offers = [];
    }
    return this.#offers;
  }

  async updatePoint(point) {
    return await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-type': 'application/json'})
    }).then(ApiService.parseResponse);
  }

  async addPoint(point) {
    return await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-type': 'application/json'})
    }).then(ApiService.parseResponse);
  }

  async deletePoint(point) {
    return await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE
    }).then(ApiService.parseResponse);
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

  #adaptToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': Number(point.basePrice),
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : point.dateFrom,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : point.dateTo,
      'is_favorite': point.isFavorite
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
