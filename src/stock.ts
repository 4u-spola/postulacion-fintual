import { StockHistory } from "./stock-history";

export class Stock {
    private readonly ticker: string;
    private name: string;
    private price: number;

    private readonly history: StockHistory[] = [];

    constructor(ticker: string, name: string, price: number) {
        this.validateParams(ticker, name, price);

        this.ticker = ticker;
        this.name = name;
        this.price = price;

        this.history.push(new StockHistory(this, new Date(), price));
    }

    private validateParams(ticker: string, name: string, price: number): void {
        if (!ticker || ticker.length === 0) {
            throw new Error('Ticker is required');
        }
        if (!name || name.length === 0) {
            throw new Error('Name is required');
        }
        if (price <= 0 || isNaN(price)) {
            throw new Error('Price must be greater than 0');
        }
    }

    

    public getHistory(): StockHistory[] {
        return this.history;
    }


}
