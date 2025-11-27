import type { Event, Observer } from './Observer.js';
import { Logger } from '../infra/Logger.js';

export class DueSoonObserver implements Observer {
    update(ev: Event): void {
        if (ev.type === 'due-soon') {
            Logger.get().info(`[DueSoon] Lembrete: ${ev.payload.user} com livro ${ev.payload.bookId} (${ev.payload.daysWith} dias).`);
        }
    }
}