type Reason = { field: string; message: string };

export class ValidationError extends Error {
  private _reason: Reason[] = [];
  layer: string = "domain";

  constructor(reason: Reason[]) {
    super("Validation error");
    this.reason = reason;
    this.name = "ValidationError";
  }

  get reason() {
    return this._reason;
  }

  set reason(reason: Reason[]) {
    this._reason = reason;
  }
}
