import type { LateFeeStrategy } from './LateFeeStrategy.js';
export class TeacherStrategy implements LateFeeStrategy {
    graceDays() { return 5; }
    feePerDay() { return 1.0; }
    deadline() { return 7; }
    calc(lateDays: number) {
        const billable = Math.max(0, lateDays - this.graceDays());
        return +(billable * this.feePerDay()).toFixed(2);
    }
}
