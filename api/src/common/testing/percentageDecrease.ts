export function percentageDecrease(oldValue: number, newValue: number) {
    return ((newValue - oldValue) / oldValue) * 100;
}