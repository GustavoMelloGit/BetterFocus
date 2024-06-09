import { randomBytes } from 'crypto';

type WithId<T> = T & {
  id: string;
};

export abstract class Entity<Props extends Object> {
  private readonly _props: WithId<Props>;

  private makeId(): string {
    return randomBytes(16).toString('hex');
  }

  constructor(props: Props) {
    this._props = {
      ...props,
      id:
        'id' in props && typeof props.id === 'string'
          ? props.id
          : this.makeId(),
    };
  }

  get props(): WithId<Props> {
    return this._props;
  }
}
