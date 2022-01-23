import { CError } from "../cError/CError";

export class ReadError extends CError {

    cause: CError;

    constructor(message:string, cause:CError) {
      super(message);
      this.cause = cause;
    }
  }