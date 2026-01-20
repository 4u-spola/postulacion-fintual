import { StockHistory } from "./stock-history";

export class Stock {
    private readonly ticker: string;
    private readonly name: string;
    private readonly price: number;

    private readonly history: StockHistory[] = [];

    constructor(ticker: string, name: string, price: number) {
        this.ticker = ticker;
        this.name = name;
        this.price = price;

        this.history.push(new StockHistory(this, new Date(), price));
    }

    public getHistory(): StockHistory[] {
        return this.history;
    }

}
