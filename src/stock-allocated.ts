import { Stock } from "./stock";

export class StockAllocated {
    private readonly stock: Stock;
    private readonly quantity: number;

    constructor(stock: Stock, quantity: number) {
        this.validateParams(stock, quantity);

        this.stock = stock;
        this.quantity = quantity;
    }

    private validateParams(stock: Stock, quantity: number): void {
        if (!stock) {
            throw new Error('Stock is required');
        }
        if (!quantity || typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }
        if (quantity > 100) {
            throw new Error('Quantity must be lower than 100');
        }
    }

    public getStock(): Stock {
        return this.stock;
    }

    public getQuantity(): number {
        return this.quantity;
    }
}