import type { Event, Observer } from './Observer.js';

export class EventBus {
    private observers: Observer[] = [];
    register(o: Observer) { this.observers.push(o); }
    unregister(o: Observer) { this.observers = this.observers.filter(x => x !== o); }
    notify(ev: Event) { this.observers.forEach(o => o.update(ev)); }
}