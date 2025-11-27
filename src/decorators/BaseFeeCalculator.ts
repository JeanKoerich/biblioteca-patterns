import type { FeeCalculator } from "./FeeCalculator.js";
import type { LateFeeStrategy } from "../strategies/LateFeeStrategy.js";

export class BaseFeeCalculator implements FeeCalculator {
    constructor(private strategy: LateFeeStrategy) { }
    calc(lateDays: number): number {
        return this.strategy.calc(lateDays);
    }
}