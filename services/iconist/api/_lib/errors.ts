import { Vendor } from "./app";

export class NotFoundError extends Error {

  constructor(vendor: Vendor, public icon: string) {
    super(vendor);
  }

}
