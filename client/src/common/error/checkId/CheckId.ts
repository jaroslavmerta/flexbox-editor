import { CError } from "../cError/CError";

export class CheckId extends CError {
    constructor(message:string) {
      super(message);
      this.name = this.constructor.name;
    }
  }