import { EventEmitter } from 'events';

export type EventMap = Record<string, unknown>

type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

type Emitter<T extends EventMap> = {
    on: <K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) => void;
    off: <K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) => void;
    removeListener: <K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) => void;
    emit: <K extends EventKey<T>>(eventName: K, params: T[K]) => void;
};

export function createEmitter<T extends EventMap>(): Emitter<T> {
    return new EventEmitter();
}