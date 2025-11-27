import type { FeeCalculator } from './FeeCalculator.js';

export class AmnestyDaysDecorator implements FeeCalculator {
    constructor(private inner: FeeCalculator, private extraAmnestyDays: number) { }
    calc(lateDays: number): number {
        const adjusted = Math.max(0, lateDays - this.extraAmnestyDays);
        return this.inner.calc(adjusted);
    }
}