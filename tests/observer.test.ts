import { describe, it, expect, vi } from 'vitest';
import { EventBus } from '../src/observers/EventBus.js';
import type { Observer, Event } from '../src/observers/Observer.js';

describe('Observer: notificação due-soon', () => {
    it('notifica múltiplos observers', () => {
        const bus = new EventBus();
        const calls: Event[] = [];
        const o1: Observer = { update: (ev) => calls.push(ev) };
        const o2: Observer = { update: (ev) => calls.push(ev) };
        bus.register(o1); bus.register(o2);

        bus.notify({ type: 'due-soon', payload: { bookId: 1 } });
        expect(calls.length).toBe(2);
        expect(calls[0].type).toBe('due-soon');
    });
});