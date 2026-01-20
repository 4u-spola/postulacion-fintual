import { PortfolioAllocationHistory } from "./portfolio.-allocation-history";
import { Stock } from "./stock";
import { StockAllocated } from "./stock-allocated";

export class Portfolio {
    private stockAllocated: readonly StockAllocated[];
    private readonly allocationHistory: PortfolioAllocationHistory[] = [];

    private readonly ownedStocks: { [key: string]: { quantity: number, stock: Stock } } = {};

    constructor() {
        this.stockAllocated = [];
        this.allocationHistory.push(new PortfolioAllocationHistory(new Date(), [], [], 'initial', this));
    }

    public getStockAllocated(): readonly StockAllocated[] {
        return [...this.stockAllocated];
    }

    public setStockAllocated(stockAllocated: StockAllocated[]): void {

        const total = stockAllocated.map(stockAllocated => stockAllocated.getQuantity())
            .reduce((acc, curr) => acc + curr, 0);

        if (total !== 100) {
            throw new Error('The sum of the quantities must be 100');
        }

        this.allocationHistory.push(new PortfolioAllocationHistory(new Date(), this.stockAllocated, stockAllocated, 'change', this));
        this.stockAllocated = stockAllocated;
    }

    public getAllocationHistory(): readonly PortfolioAllocationHistory[] {
        return [...this.allocationHistory];
    }

    public getOwnedStocks(): { [key: string]: { quantity: number, stock: Stock } } {
        return { ...this.ownedStocks };
    }

    public registerBuyTransaction(stock: Stock, quantity: number): void {
        if (!stock) {
            throw new Error('Stock is required');
        }
        if (!quantity || typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }

        if (this.ownedStocks[stock.getTicker()]) {
            this.ownedStocks[stock.getTicker()].quantity += quantity;
        } else {
            this.ownedStocks[stock.getTicker()] = { quantity, stock };
        }
    }

    public registerSellTransaction(stock: Stock, quantity: number): void {
        if (!stock) {
            throw new Error('Stock is required');
        }
        if (!quantity || typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
            throw new Error('Quantity must be a positive number');
        }

        const ownedStock = this.ownedStocks[stock.getTicker()];
        if (!ownedStock) {
            throw new Error('Stock is not owned');
        }

        if (ownedStock.quantity < quantity) {
            throw new Error('Quantity must be less than the owned quantity');
        }


        ownedStock.quantity -= quantity;

        if (ownedStock.quantity === 0) {
            delete this.ownedStocks[stock.getTicker()];
        }
    }
}