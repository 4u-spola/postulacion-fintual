import { PortfolioAllocationHistory } from "./portfolio.-allocation-history";
import { Stock } from "./stock";
import { StockAllocated } from "./stock-allocated";

export class Portfolio {
    private stockAllocated: readonly StockAllocated[];
    private readonly allocationHistory: PortfolioAllocationHistory[] = [];
    
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

        this.stockAllocated = stockAllocated;
    }

    public getAllocationHistory(): readonly PortfolioAllocationHistory[] {
        return [...this.allocationHistory];
    }
}