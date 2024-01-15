/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */
/**
 * The AppResponse class
 */

import { ResponseOption } from '@app/shared/interfaces';
import { HttpStatus } from '@nestjs/common';

export class AppResponse {
  /**
   * @param {Object} success the meta object
   * @return {Object} The success response object
   */
  static getSuccessMeta(success = true) {
    return { statusCode: HttpStatus.OK, success };
  }

  /**
   * @param {Object} meta the meta object
   * @param {Object} data success response object
   * @return {Object} The success response object
   */
  static format(meta: any, data = null) {
    const response: any = {};
    response.meta = meta;
    if (data) {
      response.data = data;
    }
    return response;
  }

  /**
   * @param {ResponseOption} option: required email for search
   * @return {Object} The formatted response
   */
  static async getResponse(option: ResponseOption) {
    try {
      const meta: any = AppResponse.getSuccessMeta();
      if (option.token) {
        meta.token = option.token;
      }

      Object.assign(meta, { statusCode: option.code });
      if (option.message) {
        meta.message = option.message;
      }
      return AppResponse.format(meta, option.value);
    } catch (e) {
      throw e;
    }
  }
}
