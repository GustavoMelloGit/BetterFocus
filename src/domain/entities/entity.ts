export class Entity<T> {
  private _props: T;

  constructor(props: T) {
    this._props = props;
  }

  protected get props(): T {
    return this._props;
  }
}
