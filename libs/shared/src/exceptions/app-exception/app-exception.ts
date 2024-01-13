/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';

export class AppException {
  constructor(
    readonly code: number,
    readonly message: any,
    readonly messages?: string
  ) {}

  static NOT_FOUND = (message) => {
    return new AppException(HttpStatus.NOT_FOUND, message);
  };

  static UNAUTHORIZED = (message) => {
    return new AppException(HttpStatus.UNAUTHORIZED, message);
  };

  static INTERNAL_SERVER = (message) => {
    return new AppException(HttpStatus.INTERNAL_SERVER_ERROR, message);
  };

  static CONFLICT = (message) => {
    return new AppException(HttpStatus.CONFLICT, message);
  };

  static INVALID_INPUT = (message) => {
    return new AppException(HttpStatus.BAD_REQUEST, message);
  };

  getStatus() {
    return this.code;
  }

  getResponse() {
    const response: any = {
      code: this.code || 500,
      message: this.message,
    };
    if (this.messages) {
      response.messages = this.messages;
    }
    return response;
  }
}
