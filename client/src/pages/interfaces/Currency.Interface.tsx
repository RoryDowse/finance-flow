export interface Currency {
    readonly result: string;
    readonly time_last_update_utc: string;
    readonly conversion_rates: Record<string, number>;
}