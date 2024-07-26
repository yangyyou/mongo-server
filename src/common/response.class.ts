export class ResponseDto<T> {
  readonly code: number;

  readonly message: string | string[];

  data: T;

  constructor(code: number, message: string | string[], data: T = null) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
