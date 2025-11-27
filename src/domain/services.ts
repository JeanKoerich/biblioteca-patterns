import type { Loan } from './types.js';
import { EventBus } from '../observers/EventBus.js';

export class LoanRepo {
    private loans: Loan[] = [];
    listActive() { return this.loans.filter(l => !l.returned); }
    create(l: Loan) { this.loans.push(l); }
    find(bookId: number, user: string) {
        return this.loans.find(l => l.bookId === bookId && l.user === user && !l.returned);
    }
    markReturned(loan: Loan) { loan.returned = true; }
}

export function notifyDueSoon(loans: Loan[], eventBus: EventBus, dueThreshold = 6) {
    loans.forEach(l => {
        if (!l.returned && l.daysWith >= dueThreshold) {
            eventBus.notify({ type: 'due-soon', payload: { bookId: l.bookId, user: l.user, daysWith: l.daysWith } });
        }
    });
}
