import type { Event, Observer } from './Observer.js';
import { Logger } from '../infra/Logger.js';

export class BlockObserver implements Observer {
    update(ev: Event): void {
        if (ev.type === 'blocked') {
            Logger.get().warn(`[Block] Usuário bloqueado: ${ev.payload.user}`);
        }
    }
}