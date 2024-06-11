import { twMerge } from 'tailwind-merge';
import { isTruthy } from './isTruthy';

type Value = ValueArray | string | null | undefined | 0 | 0n | false;
type ValueArray = Value[];

export const cn = (...classes: Value[]): string =>
  twMerge(classes.filter(isTruthy));
