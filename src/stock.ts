export class Stock {
    private readonly ticker: string;
    private readonly name: string;
    private readonly price: number;

    constructor(ticker: string, name: string, price: number) {
        this.ticker = ticker;
        this.name = name;
        this.price = price;
    }
}
