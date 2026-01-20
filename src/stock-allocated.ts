import { Stock } from "./stock";

export class StockAllocated {
    private readonly stock: Stock;
    private readonly quantity: number;

    constructor(stock: Stock, quantity: number) {
        this.stock = stock;
        this.quantity = quantity;
    }

    public getStock(): Stock {
        return this.stock;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}