import { CError } from "../cError/CError";

export class LocStorageError extends CError {
    constructor(message:string) {
      super(message);
      this.name = this.constructor.name;
    }
  }