/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as _ from 'lodash';
import { ResponseOption } from '../interfaces';
import { AppResponse } from '../common';

export class BaseService {
  public routes = {
    create: true,
    findOne: true,
    find: true,
    update: true,
    patch: true,
    remove: true,
  };

  public readonly modelName: string;
  public baseUrl = 'localhost:3000';
  public itemsPerPage = 10;
  public entity;

  private defaultConfig = {
    softDelete: false,
    uniques: [],
    returnDuplicate: false,
    fillables: [],
    updateFillables: [],
    hiddenFields: ['deleted'],
  };

  /**
   * @param {ResponseOption} option: required email for search
   * @return {Object} The formatted response
   */
  public async getResponse(option: ResponseOption) {
    const meta: any = AppResponse.getSuccessMeta();
    if (option.token) {
      meta.token = option.token;
    }

    Object.assign(meta, { statusCode: option.code });
    if (option.message) {
      meta.message = option.message;
    }

    if (option.pagination && !option.queryParser?.getAll) {
      option.pagination.totalCount = option.count;
      if (option.pagination.morePages(option.count)) {
        option.pagination.next = option.pagination.current + 1;
      }
      meta.pagination = option.pagination.done();
    }

    return AppResponse.format(meta, option.value);
  }
}
