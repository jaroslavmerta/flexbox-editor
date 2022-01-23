import { LocStorageError } from "./LocStorageError";

export class ExistInLocStorageError extends LocStorageError {

    property: string;

    constructor(message:string, property:string) {
      super(message);
      this.name = this.constructor.name;
      this.property = property;
    }
  }