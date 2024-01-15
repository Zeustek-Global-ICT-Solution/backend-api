/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import * as _ from 'lodash';

/**
 * The QueryParser class
 */
export class QueryParser {
  private _all: any;

  /**
   * @constructor
   * @param {Object} query This is a query object of the request
   */
  constructor(public query: any) {
    this.initialize(query);
    const excluded = [
      'perPage',
      'page',
      'limit',
      'sort',
      'all',
      'includes',
      'category',
      'selection',
      'population',
      'geoLocation',
      'search',
      'regex',
      'nested',
      'period',
      'range',
      'status',
      'from',
      'to',
      'frequency',
      'listing',
    ];
    // omit special query string keys from query before passing down to the model for filtering
    this.query = _.omit(this.query, ...excluded);
    // Only get collection that has not been virtually deleted.
    _.extend(this.query, { deleted: false });
    Object.assign(this, this.query);
    // TODO: Show emma
  }

  private _sort: any;

  /**
   * when String i.e ?sort=name it is sorted by name ascending order
   * when Object ?sort[name]=desc {name: 'desc'} it is sorted by name descending order
   * when Object ?sort[name]=desc,sort[age]=asc {name: 'desc', age: 'asc'} it is sorted by name desc and age asc order
   *
   * @return {Object} get the sort property
   */
  get sort() {
    if (this._sort) {
      return [['createdAt', this._sort]];
    }
  }

  /**
   * @param {Number} value is the current page number
   */
  set sort(value) {
    this._sort = value;
  }

  private _selection: any;
  /**
   * @return {Object} get the selection property
   */
  get selection() {
    if (this._selection) {
      return this._selection;
    }
    return [];
  }

  /**
   * @param {Object} value is the population object
   */
  set selection(value) {
    this._selection = value;
    if (!_.isObject(value)) {
      try {
        this._selection = JSON.parse(String(value));
      } catch (e) {}
    }
  }

  private _page: any = null;

  /**
   * @return {Object} get the items to return in each page
   */
  get page() {
    return this._page;
  }

  /**
   * @param {Number} value is the current page number
   */
  set page(value) {
    this._page = value;
  }

  private _listing: any = null;

  /**
   * @return {Object} get the items to return in each page
   */
  get listing() {
    return this._listing;
  }

  /**
   * @param {Number} value is the current page number
   */
  set listing(value) {
    this._listing = value;
  }

  private _skip = 0;
  /**
   * @return {Object} get the no of items to skip
   */
  get skip() {
    return ((this._page <= 0 ? 1 : this._page) - 1) * this._perPage;
  }

  private _perPage: any = null;

  /**
   * @return {Object} get the items to return in each page
   */
  get perPage() {
    return this._perPage;
  }

  /**
   * @param {Number} value is the perPage number
   */
  set perPage(value) {
    this._perPage = value;
  }

  private _period: any = 'All';

  /**
   * @return {Object} get the items to return in each page
   */
  get period() {
    return this._period;
  }

  /**
   * @param {Number} value is the perPage number
   */
  set period(value) {
    this._period = value;
  }

  private _frequency: any = null;

  /**
   * @return {Object} get the items to return in each page
   */
  get frequency() {
    return this._frequency;
  }

  /**
   * @param {Number} value is the perPage number
   */
  set frequency(value) {
    this._frequency = value;
  }

  private _from: any;

  /**
   * @return {Object} get the items to return in each page
   */
  get from() {
    return this._from;
  }

  /**
   * @param {Number} value is the perPage number
   */
  set from(value) {
    this._from = value;
  }

  private _to: any;

  /**
   * @return {Object} get the items to return in each page
   */
  get to() {
    return this._to;
  }

  /**
   * @param {Number} value is the perPage number
   */
  set to(value) {
    this._to = value;
  }

  private _status: any;

  /**
   * @return {Object} get the items to return in each page
   */
  get status() {
    if (this._status) {
      return this._status;
    }
  }

  /**
   * @param {Number} value is the perPage number
   */
  set status(value) {
    this._status = value;
  }

  private _range: any;

  /**
   * @return {Object} get the population object for query
   */
  get range() {
    if (this._range) {
      return this._range;
    }
    return [];
  }

  /**
   * @param {Object} value is the population object
   */
  set range(value) {
    this._range = value;
    if (!_.isObject(value)) {
      try {
        this._range = JSON.parse(String(value));
        console.log(this._range, 'inside parser');
      } catch (e) {}
    }
  }

  private _category = null;

  /**
   * @return {Object} get the items to return in each page
   */
  get category() {
    return this._category;
  }

  /**
   * @param {Number} value is the perPage number
   */
  set category(value) {
    this._category = value;
  }

  private _population: any;

  /**
   * @return {Object} get the population object for query
   */
  get population() {
    if (this._population) {
      return this._population;
    }
    return [];
  }

  /**
   * @param {Object} value is the population object
   */
  set population(value) {
    this._population = value;
    if (!_.isObject(value)) {
      try {
        this._population = JSON.parse(String(value));
      } catch (e) {}
    }
  }
  private _geoLocation: any;

  /**
   * @return {Object} get the population object for query
   */
  get geoLocation() {
    if (this._geoLocation) {
      return this._geoLocation;
    }
    return [];
  }

  /**
   * @param {Object} value is the population object
   */
  set geoLocation(value) {
    this._geoLocation = value;
    if (!_.isObject(value)) {
      try {
        this._geoLocation = JSON.parse(String(value));
      } catch (e) {}
    }
  }

  private _search: any;

  /**
   * @return {Object} get the parsed query
   */
  get search() {
    return this._search;
  }

  /**
   * @return {Boolean} get the value for all data request
   */
  get getAll() {
    return this._all;
  }

  /**
   *  Initialise all the special object required for the find query
   *  @param {Object} query This is a query object of the request
   */
  initialize(query) {
    this._all = query.all;
    this._sort = query.sort;
    if (query.population) {
      this.population = query.population;
    }
    if (query.category) {
      this.category = query.category;
    }
    if (query.geoLocation) {
      this.geoLocation = query.geoLocation;
    }
    if (query.search) {
      this._search = query.search;
    }
    if (query.selection) {
      this.selection = query.selection;
    }
    if (query.page) {
      this._page = parseInt(query.page);
    }
    if (query.perPage) {
      this._perPage = parseInt(query.perPage);
    }
    if (query.period) {
      this._period = query.period;
    }
    if (query.range) {
      this._range = query.range;
    }
    if (query.status) {
      this._status = query.status;
    }
    if (query.from) {
      this._from = query.from;
    }
    if (query.to) {
      this._to = query.to;
    }
    if (query.frequency && query.frequency !== '') {
      this._frequency = query.frequency;
    }
    if (query.listing) {
      this._listing = query.listing;
    }
  }
}
