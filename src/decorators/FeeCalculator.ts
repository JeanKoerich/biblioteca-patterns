export interface FeeCalculator {
    calc(lateDays: number): number;
}