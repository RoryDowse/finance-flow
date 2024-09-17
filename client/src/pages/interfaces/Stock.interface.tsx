// create interface for API response (store in interfaces folder)
export interface DailyStockData {
    readonly "1. open": string | null;
    readonly "2. high": string | null;
    readonly "3. low": string | null;
    readonly "4. close": string | null;
    readonly "5. volume": string | null;
}

export interface TimeSeriesDaily {
    readonly [date: string]: DailyStockData | null;
}

export default interface StockData {
    readonly "Time Series (Daily)": TimeSeriesDaily | null;
}