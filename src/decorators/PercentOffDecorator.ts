import type { FeeCalculator } from './FeeCalculator.js';

export class PercentOffDecorator implements FeeCalculator {
    constructor(private inner: FeeCalculator, private percentOff: number) { }
    calc(lateDays: number): number {
        const base = this.inner.calc(lateDays);
        return +(base * (1 - this.percentOff)).toFixed(2);
    }
}