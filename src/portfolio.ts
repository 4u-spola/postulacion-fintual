import { Stock } from "./stock";
import { StockAllocated } from "./stock-allocated";

export class Portfolio {
    private stockAllocated: readonly StockAllocated[];

    constructor() {
        this.stockAllocated = [];
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

        this.stockAllocated = stockAllocated;
    }
}