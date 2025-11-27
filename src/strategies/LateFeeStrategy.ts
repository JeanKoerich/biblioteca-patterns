export interface LateFeeStrategy {
    graceDays(): number;
    feePerDay(): number;
    deadline(): number;
    calc(lateDays: number): number;
}
