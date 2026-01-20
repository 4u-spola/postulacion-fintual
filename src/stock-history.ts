import { Stock } from "./stock";

export class StockHistory {
    private readonly stock: Stock;
    private readonly date: Date;
    private readonly price: number;
    private readonly old_price?: number;

    constructor(stock: Stock, date: Date, price: number, old_price?: number) {
        this.stock = stock;
        this.date = date;
        this.price = price;
        this.old_price = old_price;
    }
}