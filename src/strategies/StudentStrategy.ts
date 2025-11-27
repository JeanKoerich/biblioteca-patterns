import type { LateFeeStrategy } from './LateFeeStrategy.js';
export class StudentStrategy implements LateFeeStrategy {
    graceDays() { return 0; }
    feePerDay() { return 1.5; }
    deadline() { return 7; }
    calc(lateDays: number) {
        const billable = Math.max(0, lateDays - this.graceDays());
        return +(billable * this.feePerDay()).toFixed(2);
    }
}
